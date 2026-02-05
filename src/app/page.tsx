import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ChevronRight, Play, CheckCircle2, MapPin, Truck, Hammer, Droplets, HardHat, Cone, Building2, Factory, Landmark, ArrowRight, Shield } from "lucide-react";
import SmartQuoteButton from "@/components/marketing/SmartQuoteButton";
import TestimonialsSection from "@/components/ui/testimonial-v2";
import { FocusRail, type FocusRailItem } from "@/components/ui/focus-rail";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { FeaturesSectionWithCardGradient, FeatureCard } from "@/components/ui/feature-section-with-card-gradient";

const WHY_CHOOSE_US_ITEMS: FocusRailItem[] = [
    {
        id: "execucao",
        title: "Execução Completa",
        description: "Da terraplenagem à pavimentação final, garantindo qualidade em todas as etapas da obra.",
        imageSrc: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070",
        meta: "Infraestrutura Integrada"
    },
    {
        id: "tecnico",
        title: "Atendimento Técnico",
        description: "Suporte especializado para atender rigorosamente as normas de obras públicas e privadas.",
        imageSrc: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2089",
        meta: "Engenharia Especializada"
    },
    {
        id: "frota",
        title: "Frota Própria",
        description: "Maquinário moderno e manutenção preventiva em dia para evitar paradas na sua obra.",
        imageSrc: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80",
        meta: "Alta Performance"
    },
    {
        id: "prazo",
        title: "Prazo e Segurança",
        description: "Compromisso inegociável com cronogramas e normas de segurança do trabalho.",
        imageSrc: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069",
        meta: "Confiabilidade"
    }
];

export default function Home() {
    return (
        <main className="min-h-screen bg-[#F2F2F7]">
            {/* HER - Updated Content */}
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black pb-20">
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <div className="absolute inset-0 bg-black/50 z-10"></div>
                    <div className="absolute -top-[20%] -left-[20%] w-[140%] h-[140%] pointer-events-none select-none">
                        <iframe
                            className="w-full h-full object-cover opacity-60 scale-125"
                            src="https://www.youtube.com/embed/X2Sn7xE4GrA?autoplay=1&mute=1&controls=0&loop=1&playlist=X2Sn7xE4GrA&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            title="Terraplenagem Background"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                </div>

                <div className="container-custom relative z-10 text-center px-4 pt-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-ios-dark text-brand-yellow font-medium text-sm mb-8 animate-fade-in border border-white/10 shadow-[0_0_20px_rgba(255,193,7,0.2)]">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                        </span>
                        Atendimento para Prefeituras, Construtoras e Loteadores
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-8 text-white leading-[1.1] drop-shadow-2xl max-w-5xl mx-auto">
                        Terraplanagem, Drenagem e <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-600">Pavimentação Asfáltica</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
                        Executamos serviços completos de infraestrutura urbana e rodoviária com alto padrão técnico, segurança e cumprimento de prazos.
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                        <SmartQuoteButton
                            service="Geral"
                            className="group relative px-8 py-4 bg-brand-yellow text-black font-bold rounded-full text-lg shadow-[0_0_40px_rgba(255,193,7,0.4)] hover:scale-105 hover:bg-white transition-all duration-300 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Solicitar Orçamento <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </SmartQuoteButton>

                        <Link href="/contato">
                            <button className="px-8 py-4 glass-ios-dark text-white font-medium rounded-full text-lg hover:bg-white/10 transition-all border border-white/20 flex items-center gap-2">
                                Falar no WhatsApp
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* COMPANY OVERVIEW & AUDIENCE */}
            <section className="py-24 px-4 bg-white relative overflow-hidden">
                <AnimatedGridPattern
                    numSquares={30}
                    maxOpacity={0.1}
                    duration={3}
                    repeatDelay={1}
                    className={cn(
                        "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
                        "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
                    )}
                />
                <div className="container-custom relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                                Especialistas em Infraestrutura Urbana e Rodoviária
                            </h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                Somos uma empresa especializada em obras de infraestrutura, atendendo prefeituras municipais, construtoras, loteadores e empreendimentos privados.
                            </p>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Executamos serviços completos de drenagem, terraplenagem, pavimentação, obras viárias, água e esgoto. Atuamos em obras públicas e privadas, oferecendo soluções eficientes para vias urbanas, estradas vicinais, loteamentos, condomínios, áreas industriais e empreendimentos logísticos.
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: "Prefeituras Municipais", icon: Landmark },
                                    { label: "Construtoras", icon: HardHat },
                                    { label: "Loteadores", icon: MapPin },
                                    { label: "Indústrias", icon: Factory },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <item.icon className="w-6 h-6 text-brand-yellow-vivid" />
                                        <span className="font-bold text-gray-800 text-sm">{item.label}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-4 mt-8">
                                <Link href="https://wa.me/5512999999999">
                                    <Button className="bg-brand-yellow text-black hover:bg-black hover:text-white transition-colors duration-300 font-bold rounded-full px-6 py-6 h-auto text-base shadow-lg hover:shadow-xl">
                                        <span className="flex items-center gap-2">
                                            Falar com um Especialista <ChevronRight className="w-4 h-4" />
                                        </span>
                                    </Button>
                                </Link>
                                <Link href="/obras">
                                    <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-black font-medium rounded-full px-6 py-6 h-auto text-base">
                                        Ver Portfólio de Obras
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="relative h-[500px] rounded-[32px] overflow-hidden shadow-2xl bg-black">
                            <iframe
                                className="w-full h-full object-cover"
                                src="https://www.youtube.com/embed/X2Sn7xE4GrA?autoplay=0&mute=0&controls=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                title="VLS Divino Obras"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICES DETAILED GRID */}
            <section className="py-24 px-4 bg-[#F2F2F7]">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <span className="text-brand-dark font-bold tracking-wider uppercase text-sm">Nossos Serviços</span>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-2 mb-6">Soluções Completas de Engenharia</h2>
                        <p className="text-xl text-gray-500 max-w-3xl mx-auto">
                            Do projeto à execução, entregamos obras de infraestrutura com excelência técnica.
                        </p>
                    </div>

                    <div className="mt-8">
                        <FeaturesSectionWithCardGradient className="py-0 lg:py-0">
                            {/* Service 1: Drenagem */}
                            <FeatureCard
                                title="Drenagem Urbana e Rodoviária"
                                description="Garantimos o correto escoamento das águas pluviais e a durabilidade das vias. Realizamos estudos hidrológicos, galerias pluviais, bocas de lobo, bueiros tubulares e celulares."
                                icon={<div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"><Droplets className="w-7 h-7" /></div>}
                            >
                                <ul className="space-y-2 mt-4">
                                    {['Galerias Pluviais', 'Dissipadores de Energia', 'Controle de Erosões'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                                            <CheckCircle2 className="w-4 h-4 text-green-500" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </FeatureCard>

                            {/* Service 2: Água e Esgoto */}
                            <FeatureCard
                                title="Obras de Água e Esgoto"
                                description="Implantação e ampliação de redes de abastecimento e esgotamento sanitário. Redes coletoras, adutoras, interceptores, emissários e ligações prediais."
                                icon={<div className="w-14 h-14 bg-cyan-50 text-cyan-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"><Droplets className="w-7 h-7" /></div>}
                            >
                                <ul className="space-y-2 mt-4">
                                    {['Redes Coletoras', 'Adutoras e Emissários', 'Poços de Visita'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                                            <CheckCircle2 className="w-4 h-4 text-green-500" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </FeatureCard>

                            {/* Service 3: Terraplenagem */}
                            <FeatureCard
                                title="Terraplenagem"
                                description="Cortes e aterros, escavações mecanizadas, regularização de plataformas e tratamento de solos. Serviços com controle tecnológico rigoroso."
                                icon={<div className="w-14 h-14 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"><Truck className="w-7 h-7" /></div>}
                            >
                                <ul className="space-y-2 mt-4">
                                    {['Cortes e Aterros', 'Estabilização de Solos', 'Proteção de Taludes'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                                            <CheckCircle2 className="w-4 h-4 text-green-500" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </FeatureCard>

                            {/* Service 4: Pavimentação */}
                            <FeatureCard
                                title="Pavimentação Asfáltica"
                                description="Pavimentação em CBUQ, PMF, bloquetes e concreto para vias urbanas e estradas. Execução de bases, sub-bases, imprimação e recapeamentos."
                                icon={<div className="w-14 h-14 bg-gray-100 text-gray-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"><Cone className="w-7 h-7" /></div>}
                            >
                                <ul className="space-y-2 mt-4">
                                    {['CBUQ e TSD', 'Pavimentação Intertravada', 'Recapeamento'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                                            <CheckCircle2 className="w-4 h-4 text-green-500" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </FeatureCard>

                            {/* Service 5: Obras Viárias (Span 2) */}
                            <FeatureCard
                                title="Obras Viárias e Urbanas Completas"
                                description="Integração total de terraplenagem, drenagem e pavimentação. Execução de meios-fios, sarjetas, calçadas, ciclovias e obras de arte correntes."
                                className="md:col-span-2"
                                icon={<div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"><Building2 className="w-7 h-7" /></div>}
                            >
                                <div className="flex flex-col md:flex-row gap-8 items-start mt-4">
                                    <div className="flex-1">
                                        <div className="grid grid-cols-2 gap-2">
                                            {['Estradas Vicinais', 'Vias Urbanas', 'Passeios Acessíveis', 'Ciclovias'].map((item, i) => (
                                                <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                                                    <CheckCircle2 className="w-4 h-4 text-green-500" /> {item}
                                                </li>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="hidden md:block w-1/3 h-32 rounded-2xl bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070')] bg-cover bg-center"></div>
                                </div>
                            </FeatureCard>
                        </FeaturesSectionWithCardGradient>
                    </div>

                    <div className="mt-16 text-center">
                        <Link href="/contato">
                            <Button className="bg-black text-white hover:bg-brand-yellow hover:text-black transition-all duration-300 font-bold rounded-full px-10 py-7 h-auto text-lg shadow-2xl hover:shadow-[0_0_30px_rgba(255,193,7,0.4)] group">
                                <span className="flex items-center gap-3">
                                    Solicitar Orçamento de Infraestrutura <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Button>
                        </Link>
                        <p className="mt-4 text-gray-400 text-sm">Atendemos em todo o Vale do Paraíba e Litoral Norte</p>
                    </div>
                </div>
            </section>

            {/* DIFFERENTIALS SECTION - FOCUS RAIL */}
            <section className="bg-black py-20 overflow-hidden">
                <div className="container-custom relative z-10 px-4 mb-12 text-center">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
                        Por que escolher a Divino?
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Nossos pilares de excelência garantem a segurança e o sucesso da sua obra.
                    </p>
                </div>

                <div className="w-full">
                    <FocusRail items={WHY_CHOOSE_US_ITEMS} initialIndex={0} loop={true} autoPlay={false} />
                </div>

                <div className="mt-12 text-center relative z-10">
                    <Link href="/frota">
                        <Button variant="outline" className="border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 font-medium rounded-full px-8 py-6 h-auto text-base backdrop-blur-sm">
                            Conheça Nossa Frota e Equipamentos
                        </Button>
                    </Link>
                </div>
            </section>

            {/* LOCATIONS SEO BOOST */}
            <section className="py-20 bg-white">
                <div className="container-custom px-4">
                    <div className="flex flex-col md:flex-row gap-12 items-center bg-[#F2F2F7] rounded-[40px] p-12">
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Atuação Regional no Vale</h2>
                            <p className="text-gray-500 mb-8">Nossa logística permite mobilização rápida de equipamentos para as principais cidades do Vale do Paraíba.</p>

                            <div className="grid grid-cols-2 gap-4">
                                {['São José dos Campos', 'Jacareí', 'Caçapava', 'Taubaté', 'Pindamonhangaba', 'Guararema'].map(city => (
                                    <Link key={city} href={`/atuacao/${city.toLowerCase().replace(/ /g, '-')}`} className="flex items-center gap-2 text-gray-600 hover:text-brand-dark transition-colors group">
                                        <MapPin className="w-4 h-4 text-brand-yellow group-hover:scale-125 transition-transform" />
                                        {city}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 w-full relative h-[300px] rounded-3xl overflow-hidden bg-gray-200">
                            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png')] bg-cover bg-center opacity-50 grayscale"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <button className="bg-white px-6 py-3 rounded-xl shadow-lg font-bold text-sm text-gray-900 hover:scale-110 transition-transform">
                                    Ver Mapa de Obras
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* TESTIMONIALS */}
            <TestimonialsSection />

            {/* FINAL CTA */}
            <section className="py-20 px-4">
                <div className="container-custom bg-gradient-to-r from-brand-dark to-black rounded-[40px] p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden ring-4 ring-brand-yellow/20">
                    <div className="relative z-10 max-w-xl">
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Precisa de um orçamento detalhado?</h2>
                        <p className="text-gray-400 font-medium text-lg">Envie a topografia ou metragem do seu terreno e receba uma proposta em até 24h.</p>
                    </div>
                    <Link href="https://wa.me/5512999999999" className="relative z-10 mt-8 md:mt-0">
                        <button className="px-10 py-5 bg-brand-yellow text-black font-bold text-lg rounded-full hover:scale-105 transition-transform shadow-xl">
                            Falar no WhatsApp
                        </button>
                    </Link>
                </div>
            </section>

        </main>
    );
}

