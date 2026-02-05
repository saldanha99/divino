import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, ArrowRight, Check } from "lucide-react";
import SmartQuoteButton from "@/components/marketing/SmartQuoteButton";

type Props = {
    params: Promise<{ city: string }>
}

function formatCityName(slug: string) {
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export async function generateMetadata({ params }: Props) {
    const { city } = await params;
    const properName = formatCityName(city);

    return {
        title: `Terraplenagem e Obras em ${properName} | Divino Locações`,
        description: `Buscando empresa de terraplenagem e locação de máquinas em ${properName}? Atendimento rápido, frota própria e orçamento no local.`,
    };
}

export default async function LocationPage({ params }: Props) {
    const { city } = await params;
    const properName = formatCityName(city);

    // In a real app, validate against DB of supported cities to avoid spam
    // const exists = await prisma.location.findFirst({ where: { slug: city } });
    // if (!exists) return notFound();

    return (
        <main className="min-h-screen bg-gray-50">
            {/* HERO */}
            <section className="bg-brand-dark py-20 text-white">
                <div className="container-custom px-4 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6 text-brand-yellow">
                        <MapPin className="w-4 h-4" />
                        Atendendo {properName} e Região
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-6">
                        Locação de Máquinas e <br />
                        Terraplenagem em <span className="text-brand-yellow">{properName}</span>
                    </h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
                        Chegamos na sua obra em tempo recorde. Base operacional estratégica para atender {properName} com menor custo de mobilização.
                    </p>
                    <div className="flex justify-center">
                        <SmartQuoteButton
                            className="bg-brand-yellow text-black px-8 py-4 rounded-xl font-bold hover:bg-white transition-colors"
                        >
                            Pedir Orçamento para {properName}
                        </SmartQuoteButton>
                    </div>
                </div>
            </section>

            {/* SERVICES */}
            <section className="py-20 px-4">
                <div className="container-custom">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Serviços Disponíveis em {properName}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {['Terraplenagem', 'Demolição', 'Limpeza de Lote', 'Locação de Retroescavadeira', 'Locação de Rolo Compactador', 'Escavação'].map((svc, i) => (
                            <Link key={i} href="/servicos/terraplenagem"> {/* Link to generic for now */}
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-brand-yellow/50 hover:shadow-md transition-all group">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="font-bold text-lg text-gray-800">{svc}</h3>
                                        <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-brand-yellow" />
                                    </div>
                                    <p className="text-sm text-gray-500">Equipes prontas para {properName}.</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHY US */}
            <section className="bg-white py-20 px-4 border-t border-gray-100">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto bg-gray-50 rounded-3xl p-8 md:p-12">
                        <h3 className="text-2xl font-bold mb-6 text-center">Por que contratar a Divino em {properName}?</h3>
                        <div className="space-y-4">
                            {[
                                `Conhecimento técnico do solo de ${properName}`,
                                'Isenção de taxa de deslocamento (promoção sazonal)',
                                'Parceria com aterros legalizados na região'
                            ].map((item, i) => (
                                <div key={i} className="flex gap-3">
                                    <div className="mt-1 bg-green-100 p-1 rounded-full h-fit">
                                        <Check className="w-4 h-4 text-green-600" />
                                    </div>
                                    <p className="text-gray-700 font-medium">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
