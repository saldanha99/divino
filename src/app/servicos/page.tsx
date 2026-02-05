import Link from "next/link";
import { ChevronRight, Droplets, Truck, Cone, Building2, Hammer } from "lucide-react";
import SmartQuoteButton from "@/components/marketing/SmartQuoteButton";

const services = [
    {
        title: "Drenagem Urbana e Rodoviária",
        description: "Soluções completas para escoamento pluvial, galerias, dissipadores e controle de erosões.",
        icon: Droplets,
        href: "/servicos/drenagem",
        color: "bg-blue-500",
        image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069"
    },
    {
        title: "Água e Esgoto",
        description: "Implantação de redes de abastecimento, coletores de esgoto e saneamento básico.",
        icon: Droplets, // Contextually reused
        href: "/servicos/agua-esgoto",
        color: "bg-cyan-500",
        image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80"
    },
    {
        title: "Terraplenagem",
        description: "Cortes, aterros, nivelamento e preparação de terrenos com maquinário pesado.",
        icon: Truck,
        href: "/servicos/terraplenagem",
        color: "bg-yellow-500",
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070"
    },
    {
        title: "Pavimentação",
        description: "Asfalto (CBUQ), pavimentação rígida e pisos intertravados para vias e pátios.",
        icon: Cone,
        href: "/servicos/pavimentacao",
        color: "bg-gray-600",
        image: "https://images.unsplash.com/photo-1590483005691-f80750bc148b?q=80&w=2670"
    },
    {
        title: "Obras Viárias",
        description: "Infraestrutura viária completa: guias, sarjetas, calçadas e sinalização.",
        icon: Building2,
        href: "/servicos/obras-viarias",
        color: "bg-orange-500",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2089"
    },
    {
        title: "Demolição",
        description: "Demolição mecanizada de estruturas com remoção e destinação de resíduos.",
        icon: Hammer,
        href: "/servicos/demolicao",
        color: "bg-red-500",
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070"
    }
];

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-[#F2F2F7]">
            {/* HERO */}
            <section className="bg-black pt-32 pb-20 px-4 text-center">
                <div className="container-custom">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
                        Nossas <span className="text-brand-yellow">Soluções</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Conheça nosso portfólio completo de serviços de infraestrutura para obras públicas e privadas.
                    </p>
                </div>
            </section>

            {/* GRID */}
            <section className="py-20 px-4">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((item, index) => (
                            <Link href={item.href} key={index} className="group bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col">
                                <div className="h-48 bg-gray-200 relative overflow-hidden">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                        style={{ backgroundImage: `url('${item.image}')` }}
                                    ></div>
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                                    <div className={`absolute bottom-4 left-4 w-12 h-12 rounded-xl ${item.color} flex items-center justify-center text-white shadow-lg`}>
                                        <item.icon size={24} />
                                    </div>
                                </div>
                                <div className="p-8 flex-1 flex flex-col">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-dark transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-500 mb-6 flex-1">
                                        {item.description}
                                    </p>
                                    <div className="flex items-center gap-2 text-brand-dark font-bold text-sm uppercase tracking-wide mt-auto">
                                        Saiba Mais <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="pb-20 px-4">
                <div className="container-custom bg-white rounded-[32px] p-12 text-center border border-gray-200 shadow-xl">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Projeto Especial?</h2>
                    <p className="text-gray-500 mb-8 max-w-xl mx-auto">
                        Se você precisa de uma solução personalizada que não está listada acima, entre em contato com nossa engenharia.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href="/contato">
                            <button className="px-8 py-4 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-all">
                                Falar com Engenheiro
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
