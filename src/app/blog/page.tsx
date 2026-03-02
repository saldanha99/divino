import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DetailedQuoteCTA from "@/components/marketing/DetailedQuoteCTA";
import AutoPopup from "@/components/blog/AutoPopup";
import Image from "next/image";

export const metadata = {
    title: 'Blog Divino | Notícias e Dicas de Construção Civil',
    description: 'Conteúdos sobre terraplenagem, máquinas pesadas e gestão de obras.',
};

// Force static (SQLite not available at Vercel runtime)
export const dynamic = 'force-static';

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
            <DetailedQuoteCTA />

            <div className="container-custom px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <Link href={`/blog/${post.slug}`} key={post.slug} className="group h-full">
                            <article className="bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col border border-gray-100">
                                <div className="h-56 overflow-hidden relative bg-gray-200">
                                    {post.coverImage ? (
                                        post.coverImage.endsWith('.webm') ? (
                                            <video
                                                src={post.coverImage}
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <img
                                                src={post.coverImage}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        )
                                    ) : (
                                        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-300">
                                            <span className="text-4xl">🏗️</span>
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm z-10">
                                        Artigo
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <span className="text-xs text-brand-yellow-vivid font-bold mb-2 block">{new Date(post.publishedAt).toLocaleDateString('pt-BR')}</span>
                                    <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-brand-blue line-clamp-2">{post.title}</h2>
                                    <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-1">{post.excerpt}</p>
                                    <div className="text-brand-dark font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all mt-auto pt-4 border-t border-gray-50">
                                        Ler artigo →
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Bottom Ad */}
            <DetailedQuoteCTA />
        </main>
    );
}
