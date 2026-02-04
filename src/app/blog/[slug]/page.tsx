import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { AutoInterlinker } from '@/components/seo/AutoInterlinker';

// ISR Revalidation Time
export const revalidate = 3600;

interface Props {
    params: {
        slug: string;
    };
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
    const post = await prisma.blogPost.findUnique({
        where: { slug: params.slug },
    });

    if (!post) return {};

    return {
        title: `${post.title} | Blog Divino Locações`,
        description: post.excerpt || `Leia sobre ${post.title}`,
    };
}

export default async function BlogPostPage({ params }: Props) {
    const post = await prisma.blogPost.findUnique({
        where: { slug: params.slug },
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
                    <div className="mb-8 rounded-xl overflow-hidden h-64 bg-gray-200">
                        {/* Image Placeholder */}
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                            [Imagem de Capa: {post.coverImage}]
                        </div>
                    </div>
                )}

                <div className="text-gray-700 leading-relaxed">
                    {/* Inject content with auto-links */}
                    <AutoInterlinker content={post.content} />
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
