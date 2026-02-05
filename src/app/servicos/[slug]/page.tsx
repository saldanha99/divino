import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ChevronRight, Phone } from "lucide-react";
import { PrismaClient } from "@prisma/client";
import SmartQuoteButton from "@/components/marketing/SmartQuoteButton";

const prisma = new PrismaClient(); // In a real app, use a singleton

// ISR: Revalidate every hour
export const revalidate = 3600;

export async function generateStaticParams() {
    // Ideally fetch all slugs from DB
    // const services = await prisma.service.findMany({ select: { slug: true } });
    // return services.map((service) => ({ slug: service.slug }));
    return []; // for now, dynamic
}

async function getService(slug: string) {
    // Mock data for initial pivot if DB is empty
    const mockServices: any = {
        "terraplenagem": {
            name: "Terraplenagem e Nivelamento",
            description: "Serviço completo de corte, aterro e nivelamento de terrenos para construção civil.",
            features: ["Topografia inclusa", "Equipamentos de alta precisão", "Compactação de solo"],
            image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070"
        },
        "demolicao": {
            name: "Demolição Mecanizada",
            description: "Demolição controlada de estruturas com remoção total de entulhos.",
            features: ["Seguro de responsabilidade civil", "Laudo técnico de vistoria vizinha", "Caçambas próprias"],
            image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2089"
        },
        "limpeza-de-terreno": {
            name: "Limpeza de Terreno e Destoca",
            description: "Preparação inicial do lote com remoção de vegetação e destoca de raízes.",
            features: ["Roçada mecânica", "Destinação correta (verde)", "Nivelamento prévio"],
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070"
        },
        "drenagem": {
            name: "Drenagem Urbana e Rodoviária",
            description: "Execução de sistemas de drenagem pluvial, galerias, bueiros e dissipadores.",
            features: ["Dimensionamento hidráulico", "Galerias de concreto", "Dissipadores de energia"],
            image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069"
        },
        "agua-esgoto": {
            name: "Água e Esgoto",
            description: "Implantação e manutenção de redes de água potável e coleta de esgoto.",
            features: ["Redes adutoras", "Ligações prediais", "Caixas de inspeção"],
            image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80"
        },
        "pavimentacao": {
            name: "Pavimentação Asfáltica",
            description: "Pavimentação de vias urbanas, rodovias e pátios industriais.",
            features: ["Aplicação de CBUQ", "Pavimento intertravado", "Sinalização viária"],
            image: "https://images.unsplash.com/photo-1590483005691-f80750bc148b?q=80&w=2670"
        },
        "obras-viarias": {
            name: "Obras Viárias Completas",
            description: "Urbanização integrada com guias, sarjetas e infraestrutura completa.",
            features: ["Guias e sarjetas (extrusadas)", "Calçadas acessíveis", "Ciclovias"],
            image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2089"
        }
    };

    return mockServices[slug] || null;

    // Use DB once ready
    /*
    return await prisma.service.findUnique({
        where: { slug }
    });
    */
}

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const service = await getService(slug);

    if (!service) return { title: 'Serviço não encontrado' };

    return {
        title: `${service.name} em São José dos Campos | Divino Locações`,
        description: `Especialistas em ${service.name}. ${service.description} Solicite orçamento agora.`,
    };
}

export default async function ServicePage({ params }: Props) {
    const { slug } = await params;
    const service = await getService(slug);

    if (!service) {
        return notFound();
    }

    return (
        <main className="min-h-screen bg-white">
            {/* HERO */}
            <section className="relative h-[6vh] min-h-[500px] flex items-center justify-center bg-black">
                <div className="absolute inset-0 overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-60"
                        style={{ backgroundImage: `url('${service.image || "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80"}')` }}
                    ></div>
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>

                <div className="container-custom relative z-10 px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-lg">
                        {service.name}
                    </h1>
                    <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8 font-light">
                        {service.description}
                    </p>
                    <div className="flex justify-center">
                        <SmartQuoteButton
                            service={slug}
                            className="bg-brand-yellow text-black px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2"
                        >
                            <Phone className="w-5 h-5" /> Orçar pelo WhatsApp
                        </SmartQuoteButton>
                    </div>
                </div>
            </section>

            {/* CONTENT */}
            <section className="py-20 px-4">
                <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Como funciona o serviço?</h2>
                        <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                            Nossa equipe técnica realiza uma avaliação presencial para determinar o melhor método de execução.
                            Garantimos o cumprimento dos prazos e a segurança da operação.
                        </p>

                        <div className="space-y-4">
                            {service.features?.map((feature: string, i: number) => (
                                <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="bg-brand-dark p-2 rounded-full">
                                        <CheckCircle2 className="w-5 h-5 text-brand-yellow" />
                                    </div>
                                    <span className="font-medium text-gray-800">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-100 rounded-3xl p-8 border border-gray-200">
                        <h3 className="font-bold text-xl mb-6">Cidades Atendidas</h3>
                        <div className="flex flex-wrap gap-2 text-sm">
                            {['São José dos Campos', 'Jacareí', 'Caçapava', 'Taubaté', 'Pindamonhangaba', 'Campos do Jordão'].map(city => (
                                <span key={city} className="bg-white px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600">
                                    {city}
                                </span>
                            ))}
                        </div>
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <p className="font-medium mb-4">Precisa de outra máquina?</p>
                            <Link href="/">
                                <span className="text-brand-dark underline font-bold hover:text-brand-yellow">Ver todo o catálogo</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROCESS STEPS */}
            <section className="py-20 bg-gray-50 border-y border-gray-200">
                <div className="container-custom px-4 text-center">
                    <span className="text-brand-dark font-bold tracking-widest uppercase text-sm mb-4 block">Processo Transparente</span>
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-16">Como trabalhamos na sua obra</h2>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { step: "01", title: "Orçamento", desc: "Avaliação inicial e proposta comercial detalhada." },
                            { step: "02", title: "Planejamento", desc: "Cronograma e alocação de maquinário específico." },
                            { step: "03", title: "Execução", desc: "Operação com equipe técnica e acompanhamento." },
                            { step: "04", title: "Entrega", desc: "Finalização, limpeza e relatório de conclusão." }
                        ].map((item, i) => (
                            <div key={i} className="relative group">
                                <div className="w-16 h-16 mx-auto bg-white rounded-2xl shadow-lg flex items-center justify-center text-xl font-black text-brand-yellow mb-6 border border-gray-100 group-hover:scale-110 transition-transform">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-500 text-sm">{item.desc}</p>
                                {/* Connector Line (Desktop) */}
                                {i < 3 && <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-200 -z-10 transform translate-x-8"></div>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section className="py-20 px-4 bg-white">
                <div className="container-custom max-w-4xl">
                    <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Perguntas Frequentes</h2>
                    <div className="space-y-4">
                        {[
                            { q: "A Divino fornece operador?", a: "Sim! Todas as nossas locações incluem operador qualificado e combustível (opcional), garantindo produtividade máxima." },
                            { q: "Atendem obras pequenas?", a: "Com certeza. Atendemos desde limpeza de lotes residenciais até grandes obras de infraestrutura." },
                            { q: "Qual o prazo de mobilização?", a: "Normalmente conseguimos mobilizar o equipamento em até 24h a 48h após o fechamento do contrato." },
                            { q: "Tem quantidade mínima de horas?", a: "Trabalhamos com diárias ou pacotes de horas (mínimo de 10h para algumas máquinas). Consulte condições." }
                        ].map((faq, i) => (
                            <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-brand-yellow/30 transition-colors">
                                <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                    <span className="text-brand-yellow text-xl">?</span> {faq.q}
                                </h4>
                                <p className="text-gray-600 text-sm pl-6">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
