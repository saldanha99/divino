import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://divinolocacoes.com.br';

    const machines = await prisma.machine.findMany({
        select: { slug: true, updatedAt: true },
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${machines
            .map((machine) => `
          <url>
            <loc>${baseUrl}/locacao/${machine.slug}</loc>
            <lastmod>${machine.updatedAt.toISOString()}</lastmod>
            <changefreq>daily</changefreq>
            <priority>0.9</priority>
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
