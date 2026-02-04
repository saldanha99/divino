import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ChevronRight, Star, Shield, Play, CheckCircle2, MapPin, Hammer, Truck } from "lucide-react";
import SmartQuoteButton from "@/components/marketing/SmartQuoteButton";

export default function Home() {
    return (
        <main className="min-h-screen bg-[#F2F2F7]">
            {/* Modal state is now handled inside SmartQuoteButton */}

            {/* HERO SECTION - SERVICE FIRST */}
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black pb-20">
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <div className="absolute inset-0 bg-black/40 z-10"></div> {/* Overlay for contrast */}
                    <div className="absolute -top-[20%] -left-[20%] w-[140%] h-[140%] pointer-events-none select-none">
                        <iframe
                            className="w-full h-full object-cover opacity-60 scale-125"
                            src="https://www.youtube.com/embed/X2Sn7xE4GrA?autoplay=1&mute=1&controls=0&loop=1&playlist=X2Sn7xE4GrA&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            title="Terraplenagem Background"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] opacity-80"></div>
                </div>

                <div className="container-custom relative z-10 text-center px-4 pt-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-ios-dark text-brand-yellow font-medium text-sm mb-8 animate-fade-in border border-white/10 shadow-[0_0_20px_rgba(255,193,7,0.2)]">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                        </span>
                        Terraplenagem • Demolição • Limpeza em SJC e Região
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 text-white leading-[1.1] drop-shadow-2xl">
                        Engenharia de Solos <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-600">& Obras Pesadas</span>
                    </h1>

                    <p className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
                        Do bota-fora ao nivelamento final. Somos uma empreiteira completa com frota própria para
                        <strong className="text-white font-semibold"> Terraplenagem, Demolição e Preparação de Terrenos</strong>.
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                        <SmartQuoteButton
                            service="Terraplenagem"
                            className="group relative px-8 py-4 bg-brand-yellow text-black font-bold rounded-full text-lg shadow-[0_0_40px_rgba(255,193,7,0.4)] hover:scale-105 hover:bg-white transition-all duration-300 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Orçamento de Terraplenagem <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </SmartQuoteButton>

                        <SmartQuoteButton
                            service="Demolicao"
                            className="px-8 py-4 glass-ios-dark text-white font-medium rounded-full text-lg hover:bg-white/10 transition-all border border-white/20 flex items-center gap-2"
                        >
                            <Hammer className="w-4 h-4" /> Demolição Mecanizada
                        </SmartQuoteButton>
                    </div>
                </div>
            </section>

            {/* SOLUTIONS GRID (SERVICE FIRST) - REPLACES MACHINES */}
            <section className="py-24 px-4 bg-white">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Soluções para sua Obra</h2>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto">Executamos todas as etapas de preparação do seu terreno com maquinário próprio e equipe especializada.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Service 1: Terraplenagem */}
                        <div className="group relative rounded-[32px] overflow-hidden h-[500px] border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity"></div>

                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                <div className="w-12 h-12 bg-brand-yellow rounded-xl flex items-center justify-center mb-6 text-black">
                                    <Truck className="w-6 h-6" />
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-3">Terraplenagem</h3>
                                <p className="text-gray-300 mb-6 line-clamp-3">Nivelamento, corte e aterro com precisão topográfica. Ideal para condomínios, platôs industriais e loteamentos.</p>
                                <Link href="/servicos/terraplenagem">
                                    <span className="flex items-center gap-2 text-brand-yellow font-bold uppercase tracking-wider text-sm hover:translate-x-2 transition-transform cursor-pointer">
                                        Ver Detalhes <ChevronRight className="w-4 h-4" />
                                    </span>
                                </Link>
                            </div>
                        </div>

                        {/* Service 2: Demolição */}
                        <div className="group relative rounded-[32px] overflow-hidden h-[500px] border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2089')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity"></div>

                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 text-black">
                                    <Hammer className="w-6 h-6" />
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-3">Demolição</h3>
                                <p className="text-gray-300 mb-6 line-clamp-3">Demolição mecanizada de estruturas de concreto, galpões e residências. Remoção completa de entulho (bota-fora).</p>
                                <Link href="/servicos/demolicao">
                                    <span className="flex items-center gap-2 text-white font-bold uppercase tracking-wider text-sm hover:translate-x-2 transition-transform cursor-pointer">
                                        Ver Detalhes <ChevronRight className="w-4 h-4" />
                                    </span>
                                </Link>
                            </div>
                        </div>

                        {/* Service 3: Limpeza de Terreno */}
                        <div className="group relative rounded-[32px] overflow-hidden h-[500px] border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity"></div>

                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 text-black">
                                    <CheckCircle2 className="w-6 h-6" />
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-3">Limpeza de Terreno</h3>
                                <p className="text-gray-300 mb-6 line-clamp-3">Limpeza mecanizada de lotes, destoca de árvores e remoção de vegetação para início de obras.</p>
                                <Link href="/servicos/limpeza-de-terreno">
                                    <span className="flex items-center gap-2 text-white font-bold uppercase tracking-wider text-sm hover:translate-x-2 transition-transform cursor-pointer">
                                        Ver Detalhes <ChevronRight className="w-4 h-4" />
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* STATS / TRUST SECTION */}
            <section className="bg-brand-dark py-20 border-y border-white/10">
                <div className="container-custom px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-4xl md:text-5xl font-black text-brand-yellow mb-2">15+</div>
                        <p className="text-gray-400 font-medium">Anos de Experiência</p>
                    </div>
                    <div>
                        <div className="text-4xl md:text-5xl font-black text-brand-yellow mb-2">500+</div>
                        <p className="text-gray-400 font-medium">Obras Realizadas</p>
                    </div>
                    <div>
                        <div className="text-4xl md:text-5xl font-black text-brand-yellow mb-2">100%</div>
                        <p className="text-gray-400 font-medium">Prazo Cumprido</p>
                    </div>
                    <div>
                        <div className="text-4xl md:text-5xl font-black text-brand-yellow mb-2">24h</div>
                        <p className="text-gray-400 font-medium">Atendimento Emergencial</p>
                    </div>
                </div>
            </section>

            {/* VSL SECTION (VIDEO SALES LETTER) - CONTEXTUALIZED */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="container-custom px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-block px-4 py-2 bg-gray-100 rounded-lg text-gray-600 font-bold text-sm mb-6">
                                POR QUE A DIVINO?
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Não alugue apenas uma máquina. <br /> <span className="text-brand-yellow-vivid">Contrate a solução inteira.</span></h2>
                            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                                Muitos clientes perdem dinheiro alugando equipamentos errados ou operando de forma ineficiente.
                                Nossos engenheiros analisam seu solo e indicam exatamente o processo ideal de terraplenagem, economizando dias de trabalho.
                            </p>
                            <ul className="space-y-4 mb-10">
                                {['Visita técnica gratuita em SJC', 'Topografia e planejamento de corte', 'Destinação correta de resíduos (Bota-fora)'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-700">
                                        <div className="w-6 h-6 rounded-full bg-brand-yellow flex items-center justify-center shadow-sm">
                                            <CheckCircle2 size={14} className="text-black" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Link href="/contato">
                                <button className="px-8 py-4 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-all shadow-xl">
                                    Agendar Visita Técnica
                                </button>
                            </Link>
                        </div>

                        {/* Video Placeholder */}
                        <div className="relative aspect-video bg-gray-100 rounded-3xl border border-gray-200 shadow-2xl overflow-hidden group cursor-pointer group hover:scale-[1.02] transition-transform">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069')] bg-cover bg-center opacity-90 group-hover:opacity-100 transition-opacity"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 shadow-[0_0_30px_rgba(255,255,255,0.4)] group-hover:scale-110 transition-transform">
                                    <Play size={32} fill="white" className="text-white ml-2" />
                                </div>
                            </div>
                            <div className="absolute bottom-6 left-6 right-6">
                                <p className="text-white font-bold text-lg drop-shadow-md">Diário de Obra #42: Terraplenagem Urbanova</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* LOCATIONS SEO BOOST */}
            <section className="py-20 bg-[#F2F2F7]">
                <div className="container-custom px-4">
                    <div className="bg-white rounded-[40px] p-12 shadow-sm border border-gray-200">
                        <div className="flex flex-col md:flex-row gap-12 items-center">
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
                            <div className="flex-1 w-full relative h-[300px] rounded-3xl overflow-hidden bg-gray-100">
                                {/* Ideally a Map Component here, using image for now */}
                                <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png')] bg-cover bg-center opacity-50 grayscale"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <button className="bg-white px-6 py-3 rounded-xl shadow-lg font-bold text-sm text-gray-900 hover:scale-110 transition-transform">
                                        Ver Mapa de Obras
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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
