import Link from "next/link";

// Mock Data
const posts = [
    {
        slug: "manutencao-preventiva-escavadeiras",
        title: "5 Dicas de Manutenção Preventiva para Escavadeiras",
        excerpt: "Garanta a longevidade do seu equipamento com essas práticas essenciais de cuidado diário.",
        date: "27 Jan 2024",
        category: "Dicas Técnicas",
        image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=1000"
    },
    {
        slug: "terraplenagem-passo-a-passo",
        title: "Terraplenagem: O Guia Completo para Iniciantes",
        excerpt: "Entenda as etapas fundamentais de um processo de terraplenagem bem executado.",
        date: "20 Jan 2024",
        category: "Guia",
        image: "https://images.unsplash.com/photo-1547628642-53697e884144?q=80&w=1000"
    },
    {
        slug: "locacao-vs-compra",
        title: "Locação ou Compra: O que vale mais a pena?",
        excerpt: "Uma análise financeira detalhada para ajudar sua construtora a tomar a melhor decisão.",
        date: "15 Jan 2024",
        category: "Gestão",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000"
    },
];

export const metadata = {
    title: 'Blog Divino | Notícias e Dicas de Construção Civil',
    description: 'Conteúdos sobre terraplenagem, máquinas pesadas e gestão de obras.',
};

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-[#F2F2F7] pt-24 pb-20">

            <div className="container-custom px-4 text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Conteúdo <span className="text-gray-400">Industrial</span></h1>
                <p className="text-gray-500 max-w-xl mx-auto">Notícias, dicas técnicas e guias sobre o mercado de construção pesada.</p>
            </div>

            <div className="container-custom px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
                            <article className="bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                                <div className="h-56 overflow-hidden relative">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                        style={{ backgroundImage: `url('${post.image}')` }}
                                    ></div>
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
                                        {post.category}
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <span className="text-xs text-brand-yellow-vivid font-bold mb-2 block">{post.date}</span>
                                    <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-brand-blue">{post.title}</h2>
                                    <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-1">{post.excerpt}</p>
                                    <div className="text-brand-dark font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                        Ler artigo →
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
