
const BASE_URL = 'https://divinolocacoes.com.br';

export async function GET() {
    // In a real scenario, fetch these from DB
    const services = ['terraplenagem', 'demolicao', 'limpeza-de-terreno', 'locacao-retroescavadeira', 'locacao-escavadeira'];
    const cities = ['sao-jose-dos-campos', 'jacarei', 'cacapava', 'taubate', 'pindamonhangaba', 'guararema', 'santa-branca', 'monteiro-lobato'];

    let urls = '';

    // 1. Service Pages
    services.forEach(service => {
        urls += `
       <url>
           <loc>${BASE_URL}/servicos/${service}</loc>
           <lastmod>${new Date().toISOString()}</lastmod>
           <changefreq>weekly</changefreq>
           <priority>0.9</priority>
       </url>
     `;
    });

    // 2. City Pages
    cities.forEach(city => {
        urls += `
        <url>
            <loc>${BASE_URL}/atuacao/${city}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
        </url>
      `;
    });

    // 3. Service + City Combinations (The heavy hitters)
    // Note: Since we don't have dedicated pages for [service]/[city] yet, we point to the most relevant one or query params
    // optimizing for future implementation: /servicos/[slug]/[city]

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${urls}
   </urlset>
  `;

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
