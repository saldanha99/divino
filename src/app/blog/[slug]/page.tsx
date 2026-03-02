import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import DetailedQuoteCTA from "@/components/marketing/DetailedQuoteCTA";
import SmartQuoteButton from "@/components/marketing/SmartQuoteButton";
import React from 'react';
import Image from 'next/image';

// Force static (SQLite not available at Vercel runtime)
export const dynamic = 'force-static';

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

    // Split content by paragraphs to inject CTAs
    // Regex matches closing </p> tag
    const paragraphs = post.content.split('</p>');

    return (
        <div className="container-custom py-12">
            <article className="mx-auto bg-white p-6 md:p-12 rounded-[32px] shadow-sm border border-gray-100 max-w-4xl">
                <header className="mb-10 text-center">
                    <span className="inline-block px-3 py-1 bg-brand-yellow/20 text-brand-dark rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                        Blog Divino
                    </span>
                    <h1 className="text-gray-900 mb-4 text-3xl md:text-5xl font-black leading-tight tracking-tight">{post.title}</h1>
                    <div className="flex items-center justify-center gap-4 text-gray-500 text-sm">
                        <span className="flex items-center gap-1">
                            📅 {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                            ⏱️ 5 min de leitura
                        </span>
                    </div>
                </header>

                {post.coverImage && (
                    <div className="mb-12 rounded-3xl overflow-hidden h-[300px] md:h-[500px] bg-gray-100 relative shadow-lg">
                        {post.coverImage.endsWith('.webm') ? (
                            <video
                                src={post.coverImage}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <img
                                src={post.coverImage}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>
                )}

                <div className="text-gray-700 leading-relaxed text-lg prose prose-lg prose-headings:text-gray-900 prose-headings:font-bold prose-p:mb-6 prose-a:text-brand-yellow-vivid hover:prose-a:text-brand-dark prose-img:rounded-3xl prose-img:shadow-lg max-w-none">
                    {paragraphs.map((para, index) => {
                        // Don't render empty paragraphs
                        if (!para.trim()) return null;

                        const isLast = index === paragraphs.length - 1;
                        // Re-add </p> if removed by split, unless it's the very end and didn't have one
                        const htmlContent = para + (isLast ? '' : '</p>');

                        return (
                            <React.Fragment key={index}>
                                <div dangerouslySetInnerHTML={{ __html: htmlContent }} />

                                {/* CTA 1: After 2nd Paragraph - Simple Button */}
                                {index === 2 && (
                                    <div className="my-10 bg-gray-50 rounded-2xl p-8 text-center border border-gray-100">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">Gostou da dica?</h3>
                                        <p className="text-gray-600 mb-6">Precisa de máquinas pesadas para sua obra? Fale com nosso especialista agora.</p>
                                        <SmartQuoteButton
                                            className="bg-brand-dark text-white hover:bg-black px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                                        >
                                            Solicitar Orçamento
                                        </SmartQuoteButton>
                                    </div>
                                )}

                                {/* CTA 2: After 5th Paragraph - Big Visual Card */}
                                {index === 5 && (
                                    <div className="my-12 relative w-full rounded-3xl overflow-hidden h-96 flex items-center justify-center group shadow-2xl">
                                        {/* Background Image */}
                                        <div className="absolute inset-0 transform group-hover:scale-105 transition-transform duration-700">
                                            <div className="absolute inset-0 bg-[url('https://blog.divinoterraplanagem.com.br/wp-content/uploads/2026/02/terraplanagem-SJC.png')] bg-cover bg-center"></div>
                                        </div>

                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/40"></div>

                                        {/* Content */}
                                        <div className="relative z-10 text-center px-6 max-w-2xl">
                                            <h3 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                                                Sua obra não <br /> pode parar.
                                            </h3>
                                            <p className="text-gray-200 mb-8 text-lg md:text-xl font-medium">
                                                Frota própria, manutenção em dia e operadores qualificados.
                                            </p>
                                            <SmartQuoteButton
                                                service="Blog - Big Banner"
                                                className="bg-brand-yellow text-brand-dark px-10 py-4 rounded-full font-black text-lg hover:bg-white hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,193,7,0.4)]"
                                            >
                                                ALUGAR MÁQUINAS AGORA
                                            </SmartQuoteButton>
                                        </div>
                                    </div>
                                )}

                                {/* CTA 3: Detailed Quote (Replacing AdCard) */}
                                {index === 8 && (
                                    <div className="my-8">
                                        <DetailedQuoteCTA />
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </article>

            {/* Bottom Navigation / Related (Placeholder) */}
            <div className="mt-12 text-center">
                <SmartQuoteButton variant="ghost" className="text-gray-500 hover:text-gray-900 font-medium">
                    ← Voltar para o Blog
                </SmartQuoteButton>
            </div>

            {/* Schema Markup */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org/",
                        "@type": "BlogPosting",
                        "headline": post.title,
                        "datePublished": post.publishedAt.toISOString(),
                        "description": post.excerpt,
                        "image": post.coverImage ? [post.coverImage] : []
                    })
                }}
            />
        </div>
    );
}
