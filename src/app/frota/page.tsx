import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import EmbeddedLeadForm from "@/components/marketing/EmbeddedLeadForm";
import { prisma } from "@/lib/prisma";
import FleetGrid from "@/components/frota/FleetGrid";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import SmartQuoteButton from "@/components/marketing/SmartQuoteButton";
import { cn } from "@/lib/utils";

// Force static generation (SQLite not available at Vercel runtime)
export const dynamic = 'force-static';

export const metadata = {
    title: 'Nossa Frota | Divino Locações',
    description: 'Confira nossa frota completa de escavadeiras, retroescavadeiras e caminhões disponíveis para locação em SJC e região.',
};

export default async function FleetPage() {
    const fleetData = await prisma.machine.findMany({
        where: { status: "AVAILABLE" }
    });

    return (
        <main className="min-h-screen bg-[#F2F2F7]">

            {/* HERO SECTION */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/frota-hero.jpg"
                        alt="Frota Divino Terraplanagem"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Overlay Gradient (Requested) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-black/20 z-10"></div>

                {/* Bottom Fade to Page Background */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#F2F2F7] to-transparent z-20"></div>

                <div className="container-custom relative z-20 text-center px-4 pt-20">
                    <span className="inline-block py-1 px-3 rounded-full bg-brand-yellow/90 backdrop-blur text-black text-xs font-black uppercase tracking-widest mb-6 animate-fade-in">
                        Frota Própria e Revisada
                    </span>
                    <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-2xl">
                        Alta Performance <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-600">no Canteiro de Obras</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-lg">
                        Escavadeiras, Retroescavadeiras e Caminhões prontos para locação imediata em SJC e Região.
                    </p>
                </div>
            </section>

            {/* FLEET GRID (Client Component) */}
            <section className="relative pb-16">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <AnimatedGridPattern
                        numSquares={30}
                        maxOpacity={0.08}
                        duration={3}
                        repeatDelay={1}
                        className={cn(
                            "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
                            "inset-x-0 inset-y-[-20%] h-[140%] skew-y-6 text-brand-dark/30",
                        )}
                    />
                </div>
                <FleetGrid initialMachines={fleetData} />
            </section>

            {/* EMBEDDED LEAD FORM + LOGO */}
            <section className="py-24 px-4 bg-[#F2F2F7]">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <EmbeddedLeadForm />
                        <div className="hidden lg:flex items-center justify-center">
                            <Image
                                src="https://blog.divinoterraplanagem.com.br/wp-content/uploads/2026/02/logo-divino-sjc.png"
                                alt="Divino Terraplanagem - São José dos Campos"
                                width={512}
                                height={512}
                                className="w-full max-w-lg object-contain rounded-3xl opacity-80 mix-blend-multiply"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container-custom px-4 pb-20">
                <div className="bg-brand-dark rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-800/50 to-black/80"></div>

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Não achou o equipamento?</h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-light">
                            Temos uma vasta rede de parceiros em todo o Vale do Paraíba. Encontraremos a máquina ideal para sua necessidade específica.
                        </p>
                        <SmartQuoteButton
                            service="Locacao"
                            className="px-10 py-5 bg-brand-yellow text-black font-bold text-lg rounded-full hover:bg-white hover:scale-105 transition-all shadow-xl shadow-yellow-500/20"
                        >
                            Falar com Consultor Especialista
                        </SmartQuoteButton>
                    </div>
                </div>
            </section>

        </main>
    );
}
