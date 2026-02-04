import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Check, MapPin, Ruler, Truck, Shovel, HardHat, FileCheck } from "lucide-react";

export const metadata = {
    title: 'Terraplenagem em São José dos Campos | Aterro, Demolição e Limpeza',
    description: 'Empresa especializada em Terraplenagem, Demolição e Nivelamento de Terrenos em SJC e Vale do Paraíba. Maquinário próprio e engenharia especializada.',
    keywords: ['Terraplenagem SJC', 'Limpeza de Terreno', 'Demolição', 'Aterro e Desaterro', 'Nivelamento de Terreno', 'Escavação'],
};

export default function TerraplenagemPage() {
    return (
        <main className="min-h-screen bg-[#F2F2F7] pt-20">

            {/* HERO SECTION - ENGINEERING FOCUS */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-black rounded-b-[40px] shadow-2xl mx-4 mt-4">
                <div className="absolute inset-0 z-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-50"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1599818826543-9836376d859d?q=80&w=2069')" }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60"></div>
                </div>

                <div className="container-custom relative z-10 text-center text-white px-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-ios-dark text-brand-yellow font-bold text-xs uppercase tracking-widest mb-6 border border-white/10">
                        Obras de Infraestrutura
                    </div>

                    <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight drop-shadow-xl loading-tight">
                        Terraplenagem de <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-500">Alta Performance</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
                        Do estudo topográfico à entrega do platô pronto. Executamos limpeza, corte, aterro e compactação com maquinário próprio e equipe técnica.
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <Link href="https://wa.me/5512999999999?text=Gostaria de um orçamento para Terraplenagem">
                            <Button className="rounded-full bg-brand-yellow text-black hover:bg-white transition-all px-10 py-6 text-lg font-bold shadow-[0_0_40px_rgba(255,193,7,0.4)]">
                                Solicitar Visita Técnica
                            </Button>
                        </Link>
                        <Link href="#servicos">
                            <Button className="rounded-full glass-ios-dark text-white hover:bg-white/10 transition-all px-10 py-6 text-lg font-medium border border-white/20">
                                Conhecer Serviços
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* SERVICES GRID - SEO KEYWORDS */}
            <section id="servicos" className="py-24 px-4 container-custom">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Soluções Completas em Solo</h2>
                    <p className="text-gray-500 text-lg">Atuamos em todas as etapas da preparação do seu terreno.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: "Limpeza de Terreno", desc: "Remoção de vegetação, entulho e destoca de raízes com descarte certificado (CTR).", icon: <Shovel className="w-8 h-8 text-white" /> },
                        { title: "Corte e Aterro", desc: "Movimentação de terra para atingir as cotas de nível do projeto arquitetônico.", icon: <Truck className="w-8 h-8 text-white" /> },
                        { title: "Demolição Mecanizada", desc: "Demolição de estruturas antigas com separação e reciclagem de resíduos.", icon: <HardHat className="w-8 h-8 text-white" /> },
                        { title: "Compactação de Solo", desc: "Controle tecnológico de compactação para garantir a estabilidade do aterro.", icon: <Ruler className="w-8 h-8 text-white" /> },
                        { title: "Drenagem", desc: "Execução de valetas, canaletas e sistemas de drenagem pluvial.", icon: <Check className="w-8 h-8 text-white" /> },
                        { title: "Pavimentação", desc: "Preparação de sub-base e base para pavimentação asfáltica ou intertravado.", icon: <MapPin className="w-8 h-8 text-white" /> },
                    ].map((service, i) => (
                        <div key={i} className="bg-white p-8 rounded-[32px] shadow-lg border border-gray-100 hover:border-brand-yellow/50 transition-colors group">
                            <div className="w-16 h-16 bg-brand-dark rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-yellow-vivid transition-colors">{service.title}</h3>
                            <p className="text-gray-500 leading-relaxed text-sm">{service.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* TECHNICAL DIFFERENTIALS */}
            <section className="py-20 bg-white">
                <div className="container-custom px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative h-[500px] rounded-[40px] overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589939705384-51851b7a7f0f?q=80&w=2070')] bg-cover bg-center"></div>
                        <div className="absolute inset-0 bg-black/40"></div>

                        <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur p-6 rounded-3xl shadow-lg">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
                                    <FileCheck size={24} />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">Certificações Ambientais</p>
                                    <p className="text-xs text-gray-500">CADRI / IBAMA / CETESB</p>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm">
                                Toda terra retirada é destinada a bota-foras legalizados, com emissão de CTR (Controle de Transporte de Resíduos). Sua obra 100% legalizada.
                            </p>
                        </div>
                    </div>

                    <div>
                        <span className="text-brand-yellow-vivid font-bold tracking-widest text-sm uppercase mb-4 block">Por que contratar a Divino?</span>
                        <h2 className="text-4xl font-black text-gray-900 mb-6">Não vendemos horas de máquina. Vendemos <span className="underline decoration-brand-yellow decoration-4 underline-offset-4">resultado</span>.</h2>
                        <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                            Diferente da locação comum, na empreitada de terraplenagem nós assumimos a responsabilidade técnica. Você recebe o terreno pronto para construir, no prazo e na cota certa.
                        </p>

                        <ul className="space-y-4 mb-10">
                            {[
                                "Visita técnica gratuita para avaliação",
                                "Acompanhamento topográfico da execução",
                                "Maquinário dimensionado para o volume exato",
                                "Operadores treinados para leitura de projeto"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-800 font-medium bg-gray-50 p-3 rounded-xl">
                                    <div className="w-6 h-6 bg-brand-yellow rounded-full flex items-center justify-center text-xs font-black">✓</div>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <Link href="https://wa.me/5512999999999">
                            <Button className="w-full md:w-auto h-14 px-8 rounded-full bg-brand-dark text-white text-lg hover:bg-black shadow-lg">
                                Chamar Engenheiro no WhatsApp
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* SEO INFO STRIP */}
            <section className="py-16 px-4 bg-[#F2F2F7]">
                <div className="container-custom text-center max-w-4xl">
                    <h3 className="text-lg font-bold text-gray-400 uppercase mb-6">Regiões de Atendimento em Terraplenagem</h3>
                    <div className="flex flex-wrap justify-center gap-3">
                        {['São José dos Campos', 'Jacareí', 'Caçapava', 'Taubaté', 'Pindamonhangaba', 'Guararema', 'Santa Branca', 'Monteiro Lobato'].map((city, i) => (
                            <span key={i} className="px-4 py-2 bg-white rounded-full text-gray-600 text-sm font-medium border border-gray-200 shadow-sm hover:border-brand-yellow hover:text-brand-dark transition-colors cursor-default">
                                {city}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

        </main>
    );
}
