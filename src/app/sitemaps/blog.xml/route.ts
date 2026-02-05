import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://divinolocacoes.com.br';

    const posts = await prisma.blogPost.findMany({
        select: { slug: true, updatedAt: true },
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${posts
            .map((post) => `
          <url>
            <loc>${baseUrl}/blog/${post.slug}</loc>
            <lastmod>${post.updatedAt.toISOString()}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.7</priority>
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
