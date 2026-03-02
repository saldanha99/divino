import Link from "next/link";
import { ChevronRight, Droplets, Truck, Cone, Building2, Hammer, CheckCircle2 } from "lucide-react";
import SmartQuoteButton from "@/components/marketing/SmartQuoteButton";
import EmbeddedLeadForm from "@/components/marketing/EmbeddedLeadForm";
import { FeaturesSectionWithCardGradient, FeatureCard } from "@/components/ui/feature-section-with-card-gradient";

const services = [
    {
        title: "Drenagem Urbana, Rodoviária e Ferroviária",
        description: "Executamos obras de drenagem para prefeituras, construtoras e loteadores, garantindo o correto escoamento das águas pluviais e a durabilidade das vias. Realizamos estudos hidrológicos e hidráulicos, galerias pluviais, dispositivos de dissipação de energia e controle de erosões.",
        icon: <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center transition-transform"><Droplets className="w-7 h-7" /></div>,
        href: "/servicos/drenagem",
        image: "/images/retroescavadeira-sjc.jpg"
    },
    {
        title: "Obras de Água e Esgoto",
        description: "Executamos obras de abastecimento de água e esgotamento sanitário para loteamentos, obras públicas e empreendimentos privados. Implantação de redes coletoras, adutoras, interceptores, emissários e ligações prediais.",
        icon: <div className="w-14 h-14 bg-cyan-50 text-cyan-600 rounded-2xl flex items-center justify-center transition-transform"><Droplets className="w-7 h-7" /></div>,
        href: "/servicos/agua-esgoto",
        image: "/images/esgoto.jpg"
    },
    {
        title: "Terraplenagem e Obras de Terra",
        description: "Serviços completos de terraplenagem para loteamentos, pavimentação urbana, obras rodoviárias e áreas industriais. Cortes, aterros, escavações mecanizadas, transporte de material e estabilização de solos.",
        icon: <div className="w-14 h-14 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center transition-transform"><Truck className="w-7 h-7" /></div>,
        href: "/servicos/terraplenagem",
        image: "/images/terraplanagem.jpg"
    },
    {
        title: "Pavimentação Asfáltica e Urbana",
        description: "Pavimentação urbana, rodoviária e de pátios industriais. Executamos desde a base até o revestimento final em CBUQ ou pavimentos intertravados, recapeamentos e manutenção viária.",
        icon: <div className="w-14 h-14 bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center transition-transform"><Cone className="w-7 h-7" /></div>,
        href: "/servicos/pavimentacao",
        image: "/images/pavimentacao.jpeg"
    },
    {
        title: "Obras Viárias e Urbanas Completas",
        description: "Infraestrutura viária completa integrando terraplenagem, drenagem e pavimentação. Implantação de guias, sarjetas, calçadas acessíveis e sinalização urbana.",
        icon: <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center transition-transform"><Building2 className="w-7 h-7" /></div>,
        href: "/servicos/obras-viarias",
        image: "/images/obras viarias.webp"
    },
    {
        title: "Demolição Mecanizada e Limpeza",
        description: "Demolição controlada de estruturas civis com remoção total de entulhos, destinação licenciada de resíduos e limpeza mecanizada de terrenos.",
        icon: <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center transition-transform"><Hammer className="w-7 h-7" /></div>,
        href: "/servicos/demolicao",
        image: "/images/demolicao.jpeg"
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
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
                        Engenharia e logística pesada para obras de infraestrutura que transformam o cenário urbano e rodoviário.
                    </p>
                </div>
            </section>

            {/* SERVICES CARDS */}
            <section className="py-20 px-4">
                <div className="container-custom max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {services.map((item, index) => (
                            <Link key={index} href={item.href} className="flex h-full group">
                                <FeatureCard
                                    title={item.title}
                                    description={item.description}
                                    image={item.image}
                                    icon={item.icon}
                                    className="h-full"
                                >
                                    <div className="flex items-center gap-2 text-brand-dark font-bold text-sm uppercase tracking-wide mt-auto group-hover:text-black transition-colors">
                                        Saiba Mais <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </FeatureCard>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* EMBEDDED LEAD FORM + LOGO */}
            <section className="py-24 px-4 bg-[#F2F2F7]">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <EmbeddedLeadForm />
                        <div className="hidden lg:flex items-center justify-center">
                            <img
                                src="https://blog.divinoterraplanagem.com.br/wp-content/uploads/2026/02/logo-divino-sjc.png"
                                alt="Divino Terraplanagem - São José dos Campos"
                                className="w-full max-w-lg object-contain rounded-3xl opacity-80"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="pb-20 px-4">
                <div className="container-custom bg-white rounded-[32px] p-12 text-center border border-gray-200 shadow-xl overflow-hidden relative">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Seu projeto é diferenciado?</h2>
                        <p className="text-gray-500 mb-8 max-w-xl mx-auto">
                            Oferecemos consultoria técnica para viabilizar obras complexas de drenagem, saneamento e pavimentação.
                        </p>
                        <div className="flex justify-center gap-4">
                            <SmartQuoteButton
                                service="Geral"
                                className="px-10 py-5 bg-brand-yellow text-black font-bold text-lg rounded-full hover:bg-black hover:text-white transition-all shadow-xl shadow-yellow-500/20"
                            >
                                Solicitar Proposta Técnica
                            </SmartQuoteButton>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
