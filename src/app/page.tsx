import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ChevronRight, Play, CheckCircle2, MapPin, Truck, Hammer, Droplets, HardHat, Cone, Building2, Factory, Landmark, ArrowRight, Shield } from "lucide-react";
import SmartQuoteButton from "@/components/marketing/SmartQuoteButton";
import TestimonialsSection from "@/components/ui/testimonial-v2";
import { FocusRail, type FocusRailItem } from "@/components/ui/focus-rail";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { FeaturesSectionWithCardGradient, FeatureCard } from "@/components/ui/feature-section-with-card-gradient";
import EmbeddedLeadForm from "@/components/marketing/EmbeddedLeadForm";

const WHY_CHOOSE_US_ITEMS: FocusRailItem[] = [
    {
        id: "execucao",
        title: "Execução Completa",
        description: "Da terraplenagem à pavimentação final, garantindo qualidade em todas as etapas da obra.",
        imageSrc: "https://blog.divinoterraplanagem.com.br/wp-content/uploads/2026/02/20250410_085841-scaled.jpg",
        meta: "Infraestrutura"
    },
    {
        id: "frota",
        title: "Frota Própria",
        description: "Máquinas e equipamentos modernos para atender obras de qualquer porte.",
        imageSrc: "https://blog.divinoterraplanagem.com.br/wp-content/uploads/2026/02/20230906_100705-scaled.jpg",
        meta: "Equipamentos"
    },
    {
        id: "equipe",
        title: "Equipe Qualificada",
        description: "Engenheiros, topógrafos e operadores experientes em obras públicas e privadas.",
        imageSrc: "https://blog.divinoterraplanagem.com.br/wp-content/uploads/2026/02/20220715_091228-scaled.jpg",
        meta: "Time"
    },
    {
        id: "prazo",
        title: "Prazo e Segurança",
        description: "Compromisso inegociável com cronogramas e normas de segurança do trabalho.",
        imageSrc: "https://blog.divinoterraplanagem.com.br/wp-content/uploads/2026/02/IMG_9740-scaled.jpg",
        meta: "Confiabilidade"
    }
];

export default function Home() {
    return (
        <main className="min-h-screen bg-[#F2F2F7]">
            {/* HERO - Updated Content */}
            <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black pb-20">
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <div className="absolute inset-0 bg-black/50 z-10"></div>

                    <div className="absolute inset-0 z-0 overflow-hidden">
                        <video
                            className="w-full h-full object-cover opacity-60 pointer-events-none"
                            autoPlay
                            muted
                            loop
                            playsInline
                            poster="/images/blog/img2.jpg"
                        >
                            <source src="/images/video hero.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10"></div>
                </div>

                <div className="container-custom relative z-10 text-center px-4 pt-20">
                    <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-full glass-ios-dark text-brand-yellow font-medium text-xs md:text-sm mb-6 md:mb-8 animate-fade-in border border-white/10 shadow-[0_0_20px_rgba(255,193,7,0.2)]">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                        </span>
                        Atendimento para Prefeituras, Construtoras e Loteadores
                    </div>

                    <h1 className="text-3xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 md:mb-8 text-white leading-[1.1] drop-shadow-2xl max-w-5xl mx-auto">
                        Terraplanagem, Drenagem e <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-600">Pavimentação Asfáltica</span>
                    </h1>

                    <p className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 md:mb-12 font-light leading-relaxed px-2">
                        Executamos serviços completos de infraestrutura urbana e rodoviária com alto padrão técnico, segurança e cumprimento de prazos.
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                        <SmartQuoteButton
                            service="Geral"
                            className="group relative px-6 md:px-8 py-4 bg-brand-yellow text-black font-bold rounded-full text-base md:text-lg shadow-[0_0_40px_rgba(255,193,7,0.4)] hover:scale-105 hover:bg-white transition-all duration-300 overflow-hidden w-full md:w-auto"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Solicitar Orçamento <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </SmartQuoteButton>

                        <Link href="/contato">
                            <button className="px-6 md:px-8 py-4 glass-ios-dark text-white font-medium rounded-full text-base md:text-lg hover:bg-white/10 transition-all border border-white/20 flex items-center justify-center gap-2 w-full md:w-auto">
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
                                    { label: "Construtoras e Incorporadoras", icon: HardHat },
                                    { label: "Loteadores", icon: MapPin },
                                    { label: "Indústrias e Logística", icon: Factory },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <item.icon className="w-6 h-6 text-brand-yellow-vivid" />
                                        <span className="font-bold text-gray-800 text-sm">{item.label}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-4 mt-8">
                                <SmartQuoteButton
                                    service="Geral"
                                    className="bg-brand-yellow text-black hover:bg-black hover:text-white transition-colors duration-300 font-bold rounded-full px-6 py-6 h-auto text-base shadow-lg hover:shadow-xl"
                                >
                                    <span className="flex items-center gap-2">
                                        Falar com um Especialista <ChevronRight className="w-4 h-4" />
                                    </span>
                                </SmartQuoteButton>
                                <Link href="/obras">
                                    <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-black font-medium rounded-full px-6 py-6 h-auto text-base">
                                        Ver Portfólio de Obras
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="relative h-[500px] rounded-[32px] overflow-hidden shadow-2xl bg-black">
                            <Image
                                src="https://blog.divinoterraplanagem.com.br/wp-content/uploads/2026/02/20250410_085841-scaled.jpg"
                                alt="Infraestrutura Urbana e Rodoviária"
                                fill
                                className="object-cover"
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
                                title="Drenagem Urbana, Rodoviária e Ferroviária"
                                description="Executamos obras de drenagem para prefeituras, construtoras e loteadores, garantindo o correto escoamento das águas pluviais e a durabilidade das vias. Realizamos estudos hidrológicos e hidráulicos, galerias pluviais, bocas de lobo, poços de visita, bueiros tubulares e celulares, drenagem longitudinal e transversal, subdrenos e dispositivos de dissipação de energia."
                                image="/images/retroescavadeira-sjc.jpg"
                                icon={<div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"><Droplets className="w-7 h-7" /></div>}
                            >
                                <ul className="space-y-2 mt-4">
                                    {['Galerias Pluviais e Bocas de Lobo', 'Dissipadores de Energia', 'Drenagem Paliativa e Emergencial', 'Controle de Erosões', 'Recuperação de Estradas Vicinais'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                                            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </FeatureCard>

                            {/* Service 2: Água e Esgoto */}
                            <FeatureCard
                                title="Obras de Água e Esgoto"
                                description="Executamos obras de abastecimento de água e esgotamento sanitário para loteamentos, obras públicas e empreendimentos privados. Implantação e ampliação de redes de água, redes coletoras, adutoras, interceptores, emissários, ligações prediais e caixas de inspeção."
                                image="/images/esgoto.jpg"
                                icon={<div className="w-14 h-14 bg-cyan-50 text-cyan-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"><Droplets className="w-7 h-7" /></div>}
                            >
                                <ul className="space-y-2 mt-4">
                                    {['Redes Coletoras de Esgoto', 'Adutoras e Emissários', 'Poços de Visita e Caixas de Inspeção', 'Substituição e Readequação de Redes'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                                            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </FeatureCard>

                            {/* Service 3: Terraplenagem */}
                            <FeatureCard
                                title="Terraplenagem e Obras de Terra"
                                description="Executamos serviços completos de terraplenagem para loteamentos, pavimentação urbana, obras rodoviárias e áreas industriais. Cortes e aterros, escavações mecanizadas, regularização de plataformas, aterros compactados por camadas, transporte de material, tratamento e estabilização de solos."
                                image="/images/terraplanagem.jpg"
                                icon={<div className="w-14 h-14 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"><Truck className="w-7 h-7" /></div>}
                            >
                                <ul className="space-y-2 mt-4">
                                    {['Cortes e Aterros Compactados', 'Estabilização de Solos', 'Proteção de Taludes', 'Transporte de Material', 'Controle Tecnológico'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                                            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </FeatureCard>

                            {/* Service 4: Pavimentação */}
                            <FeatureCard
                                title="Pavimentação Asfáltica e Urbana"
                                description="Realizamos serviços completos de pavimentação, desde a base até o revestimento final em CBUQ ou pavimentos intertravados. Preparação de subleito, sub-base e base, imprimação, pintura de ligação, fornecimento e aplicação de massa asfáltica, pavimentação em blocos de concreto (paver) e guias/sarjetas."
                                image="/images/pavimentacao.jpeg"
                                icon={<div className="w-14 h-14 bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"><Cone className="w-7 h-7" /></div>}
                            >
                                <ul className="space-y-2 mt-4">
                                    {['CBUQ, PMF, TSD e TST', 'Pavimentação Intertravada e Rígida', 'Recapeamento e Reforço Estrutural', 'Manutenção Viária'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                                            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </FeatureCard>

                            {/* Service 5: Obras Viárias (Span 2) */}
                            <FeatureCard
                                title="Obras Viárias e Urbanas Completas"
                                description="Executamos obras viárias e urbanas completas, integrando terraplenagem, drenagem, pavimentação, água e esgoto. Implantação e recuperação de estradas vicinais, vias urbanas, meios-fios, sarjetas, calçadas, passeios acessíveis, ciclovias, adequação de acessos e obras de arte correntes."
                                className="md:col-span-2"
                                image="/images/obras viarias.webp"
                                icon={<div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"><Building2 className="w-7 h-7" /></div>}
                            >
                                <div className="flex flex-col md:flex-row gap-8 items-start mt-4">
                                    <div className="flex-1">
                                        <div className="grid grid-cols-2 gap-2">
                                            {['Estradas Vicinais', 'Vias Urbanas', 'Passeios Acessíveis', 'Ciclovias', 'Meios-fios e Sarjetas', 'Travessias e Acessos'].map((item, i) => (
                                                <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                                                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> {item}
                                                </li>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="hidden md:block w-1/3 h-32 rounded-2xl bg-[url('https://blog.divinoterraplanagem.com.br/wp-content/uploads/2026/02/20250410_085841-scaled.jpg')] bg-cover bg-center"></div>
                                </div>
                            </FeatureCard>
                        </FeaturesSectionWithCardGradient>
                    </div>

                    <div className="mt-16 text-center">
                        <SmartQuoteButton
                            service="Geral"
                            className="bg-black text-white hover:bg-brand-yellow hover:text-black transition-all duration-300 font-bold rounded-full px-10 py-7 h-auto text-lg shadow-2xl hover:shadow-[0_0_30px_rgba(255,193,7,0.4)] group"
                        >
                            <span className="flex items-center gap-3">
                                Solicitar Orçamento de Infraestrutura <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </SmartQuoteButton>
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
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-10">
                        Nossos pilares de excelência garantem a segurança e o sucesso da sua obra.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                        {[
                            'Execução completa de obras de infraestrutura',
                            'Especialização em drenagem, água, esgoto e pavimentação',
                            'Experiência em obras urbanas, rodoviárias e vicinais',
                            'Atendimento técnico para obras públicas e privadas',
                            'Compromisso com prazo, qualidade e segurança',
                            'Frota própria e equipe qualificada',
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-left">
                                <CheckCircle2 className="w-5 h-5 text-brand-yellow shrink-0" />
                                <span className="text-sm text-gray-300 font-medium">{item}</span>
                            </div>
                        ))}
                    </div>
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

            {/* EMBEDDED LEAD FORM + IMAGE */}
            <section className="py-24 px-4 bg-[#F2F2F7]">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <EmbeddedLeadForm />
                        <div className="hidden lg:flex items-center justify-center relative w-full h-[400px]">
                            <Image
                                src="https://blog.divinoterraplanagem.com.br/wp-content/uploads/2026/02/logo-divino-sjc.png"
                                alt="Divino Terraplanagem - São José dos Campos"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* LOCATIONS SEO BOOST */}
            <section className="py-20 bg-white">
                <div className="container-custom px-4">
                    <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center bg-[#F2F2F7] rounded-3xl md:rounded-[40px] p-6 md:p-12">
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
                        <div className="flex-1 w-full relative h-[300px] rounded-3xl overflow-hidden">
                            <Image
                                src="https://blog.divinoterraplanagem.com.br/wp-content/uploads/2026/02/terraplanagem-SJC.png"
                                alt="Terraplanagem em São José dos Campos"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>


            {/* TESTIMONIALS */}
            <TestimonialsSection />

            {/* FINAL CTA */}
            <section className="py-20 px-4">
                <div className="container-custom rounded-[40px] overflow-hidden shadow-2xl ring-4 ring-brand-yellow/20 relative min-h-[350px] flex items-center">
                    <Image
                        src="https://blog.divinoterraplanagem.com.br/wp-content/uploads/2026/02/terraplanagem-SJC.png"
                        alt="Terraplanagem em São José dos Campos"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>
                    <div className="relative z-10 p-8 md:p-12 max-w-xl">
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Precisa de um orçamento detalhado?</h2>
                        <p className="text-gray-300 font-medium text-lg mb-8">Envie a topografia ou metragem do seu terreno e receba uma proposta em até 24h.</p>
                        <SmartQuoteButton
                            service="Geral"
                            className="px-10 py-5 bg-brand-yellow text-black font-bold text-lg rounded-full hover:scale-105 transition-transform shadow-xl"
                        >
                            Falar no WhatsApp
                        </SmartQuoteButton>
                    </div>
                </div>
            </section>

        </main>
    );
}

