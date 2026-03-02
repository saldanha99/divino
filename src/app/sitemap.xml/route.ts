import { NextResponse } from 'next/server';

export async function GET() {
  // TODO: Move to env variable
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://divinolocacoes.com.br';

  const sitemaps = [
    '/sitemaps/pages.xml',
    '/sitemaps/services.xml',
    '/sitemaps/blog.xml',
    '/sitemaps/glossary.xml',
    '/sitemaps/services-locations.xml',
  ];

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemaps
      .map((url) => `
          <sitemap>
            <loc>${baseUrl}${url}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
          </sitemap>
        `)
      .join('')}
    </sitemapindex>
  `;

  return new NextResponse(sitemapIndex, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=59',
    },
  });
}
