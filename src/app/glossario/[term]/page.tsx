import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// Force static (SQLite not available at Vercel runtime)
export const dynamic = 'force-static';

interface Props {
    params: Promise<{
        term: string;
    }>;
}

// 1. Generate Static Params for build time
export async function generateStaticParams() {
    const terms = await prisma.glossaryTerm.findMany({
        select: { slug: true },
    });

    return terms.map((term) => ({
        term: term.slug,
    }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const termData = await prisma.glossaryTerm.findUnique({
        where: { slug: params.term },
    });

    if (!termData) return {};

    return {
        title: `${termData.term} em Terraplenagem: O que é? | Divino Locações`,
        description: `Descubra o significado de ${termData.term} no contexto de terraplenagem e obras. Definição completa no glossário da Divino Locações.`,
    };
}

export default async function GlossaryPage(props: Props) {
    const params = await props.params;
    const termData = await prisma.glossaryTerm.findUnique({
        where: { slug: params.term },
    });

    if (!termData) {
        notFound();
    }

    return (
        <div className="container-custom py-12">
            <article className="prose lg:prose-xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h1 className="text-brand-dark mb-4">{termData.term}</h1>
                <div className="text-gray-600 leading-relaxed">
                    <p>{termData.definition}</p>
                </div>
                {termData.relatedTerm && (
                    <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">Veja também</h3>
                        <p className="font-medium text-brand-dark">{termData.relatedTerm}</p>
                    </div>
                )}
            </article>

            {/* Schema Markup for DefinedTerm */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org/",
                        "@type": "DefinedTerm",
                        "name": termData.term,
                        "description": termData.definition,
                        "inDefinedTermSet": "https://divinolocacoes.com.br/glossario"
                    })
                }}
            />
        </div>
    );
}
