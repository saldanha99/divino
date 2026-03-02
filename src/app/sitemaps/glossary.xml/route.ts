import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://divinolocacoes.com.br';
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 1000;
    const skip = (page - 1) * limit;

    // Ideally, for very large datasets, we might want to split this into multiple files explicitly
    // rather than query params, but this handles the "pagination" logic requested.
    // The sitemap index can point to glossary.xml?page=1, etc. if we wanted detailed control,
    // but usually sitemap indices point to distinct filenames.
    // For the prompt's "Paginação de 1000 em 1000 URLs", we interpret this as this endpoint 
    // serving the FIRST 1000 by default, or handling logic to serve chunks. 
    // A robust sitemap index would list `glossary-1.xml`, `glossary-2.xml`. 
    // Here we'll implement a basic fetch for the first chunk as a proof of concept,
    // or simple all-in-one if under limit.
    // Let's stick to a safe 1000 limit per the prompt.

    const terms = await prisma.glossaryTerm.findMany({
        select: { slug: true, updatedAt: true },
        take: limit,
        skip: skip,
        orderBy: { term: 'asc' },
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${terms
            .map((term) => `
          <url>
            <loc>${baseUrl}/glossario/${term.slug}</loc>
            <lastmod>${term.updatedAt.toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.5</priority>
          </url>
        `)
            .join('')}
    </urlset>
  `;

    return new NextResponse(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=59',
        },
    });
}
