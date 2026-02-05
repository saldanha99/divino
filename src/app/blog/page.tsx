import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AdBanner from "@/components/blog/AdBanner";
import AutoPopup from "@/components/blog/AutoPopup";
import Image from "next/image";

export const metadata = {
    title: 'Blog Divino | Notícias e Dicas de Construção Civil',
    description: 'Conteúdos sobre terraplenagem, máquinas pesadas e gestão de obras.',
};

// Revalidate every hour
export const revalidate = 3600;

export default async function BlogPage() {
    // Fetch posts from DB
    const posts = await prisma.blogPost.findMany({
        orderBy: { publishedAt: 'desc' },
        take: 20
    });

    return (
        <main className="min-h-screen bg-[#F2F2F7] pt-24 pb-20">
            {/* Auto Popup */}
            <AutoPopup />

            <div className="container-custom px-4 text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Conteúdo <span className="text-gray-400">Industrial</span></h1>
                <p className="text-gray-500 max-w-xl mx-auto">Notícias, dicas técnicas e guias sobre o mercado de construção pesada.</p>
            </div>

            {/* Top Ad */}
            <AdBanner type="horizontal" />

            <div className="container-custom px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, index) => {
                        // Insert Ad Card every 6th position (index 5, 11...)
                        // But map output must be handled carefully. 
                        // Simplified: just render post. If we want ad inside grid, we need to manipulate the array or render condition.
                        // Let's render normal posts and insert ads between rows or as cards.

                        // Strategy: If index === 3, insert an extra Ad Card in the grid? 
                        // React keys might get tricky if we inject. 
                        // Cleaner: Add specialized ad slot if (index + 1) % 7 === 0?

                        return (
                            <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
                                <article className="bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                                    <div className="h-56 overflow-hidden relative bg-gray-200">
                                        {post.coverImage && (
                                            <div
                                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                                style={{ backgroundImage: `url('${post.coverImage}')` }}
                                            />
                                        )}
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
                                            Artigo
                                        </div>
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <span className="text-xs text-brand-yellow-vivid font-bold mb-2 block">{new Date(post.publishedAt).toLocaleDateString('pt-BR')}</span>
                                        <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-brand-blue">{post.title}</h2>
                                        <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-1">{post.excerpt}</p>
                                        <div className="text-brand-dark font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                            Ler artigo →
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        );
                    })}

                    {/* Inline Ad as the last card if we have odd number or just because */}
                    <Link href="#" className="group cursor-default">
                        <AdBanner type="card" />
                    </Link>
                </div>
            </div>

            {/* Bottom Ad */}
            <AdBanner type="horizontal" />
        </main>
    );
}
