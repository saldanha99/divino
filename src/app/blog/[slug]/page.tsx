import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { AutoInterlinker } from '@/components/seo/AutoInterlinker';
import AdBanner from "@/components/blog/AdBanner";
import SmartQuoteButton from "@/components/marketing/SmartQuoteButton";
import React from 'react';

// ISR Revalidation Time
export const revalidate = 3600;

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const posts = await prisma.blogPost.findMany({
        select: { slug: true },
    });

    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await prisma.blogPost.findUnique({
        where: { slug },
    });

    if (!post) return {};

    return {
        title: `${post.title} | Blog Divino Locações`,
        description: post.excerpt || `Leia sobre ${post.title}`,
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await prisma.blogPost.findUnique({
        where: { slug },
    });

    if (!post) {
        notFound();
    }

    return (
        <div className="container-custom py-12">
            <article className="prose lg:prose-xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <header className="mb-8">
                    <h1 className="text-brand-dark mb-2 text-4xl font-bold">{post.title}</h1>
                    <p className="text-gray-500 text-sm">
                        Publicado em {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
                    </p>
                </header>

                {post.coverImage && (
                    <div className="mb-8 rounded-xl overflow-hidden h-64 md:h-96 bg-gray-200 relative">
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                <div className="text-gray-700 leading-relaxed prose prose-lg prose-headings:text-brand-dark prose-a:text-brand-yellow hover:prose-a:text-brand-dark transition-colors max-w-none">
                    {(() => {
                        const chunks1 = post.content.split('{{AD_BANNER}}');
                        return chunks1.map((chunk1, i) => {
                            const chunks2 = chunk1.split('{{CTA_BUTTON}}');
                            return (
                                <React.Fragment key={i}>
                                    {chunks2.map((chunk2, j) => (
                                        <React.Fragment key={j}>
                                            <div dangerouslySetInnerHTML={{ __html: chunk2 }} />
                                            {j < chunks2.length - 1 && (
                                                <div className="my-12 relative w-full rounded-3xl overflow-hidden h-80 flex items-center justify-center group">
                                                    {/* Tractor Background */}
                                                    <div className="absolute inset-0 transform group-hover:scale-105 transition-transform duration-700">
                                                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1599818826543-9836376d859d?q=80&w=2069')] bg-cover bg-center"></div>
                                                    </div>

                                                    {/* Black Overlay 50% */}
                                                    <div className="absolute inset-0 bg-black/60"></div>

                                                    {/* Content */}
                                                    <div className="relative z-10 text-center px-6 max-w-2xl">
                                                        <h3 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
                                                            Sua obra não pode parar. <br />
                                                            <span className="text-brand-yellow">Conte com a Divino.</span>
                                                        </h3>
                                                        <p className="text-gray-300 mb-8 text-lg">
                                                            Frota própria e manutenção preventiva para garantir o cronograma.
                                                        </p>
                                                        <SmartQuoteButton
                                                            service="Blog"
                                                            className="bg-brand-yellow text-black px-10 py-5 rounded-full font-bold text-xl hover:bg-white hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,193,7,0.3)]"
                                                        >
                                                            Solicitar Orçamento Rápido
                                                        </SmartQuoteButton>
                                                    </div>
                                                </div>
                                            )}
                                        </React.Fragment>
                                    ))}
                                    {i < chunks1.length - 1 && (
                                        <div className="my-8">
                                            <AdBanner type="card" />
                                        </div>
                                    )}
                                </React.Fragment>
                            );
                        });
                    })()}
                </div>
            </article>

            {/* Schema Markup for Article */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org/",
                        "@type": "BlogPosting",
                        "headline": post.title,
                        "datePublished": post.publishedAt.toISOString(),
                        "description": post.excerpt
                    })
                }}
            />
        </div>
    );
}
