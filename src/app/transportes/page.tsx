import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Truck, MapPin, ShieldCheck, Clock, Check, AlertTriangle, FileText } from "lucide-react";

export const metadata = {
    title: 'Transporte de Máquinas Pesadas | Divino Locações',
    description: 'Logística pesada para todo Brasil. Pranchas retas e rebaixadas para transporte de escavadeiras, tratores e cargas indivisíveis.',
};

export default function TransportPage() {
    return (
        <main className="min-h-screen bg-[#F2F2F7] pt-20">

            {/* HERO SECTION */}
            <section className="relative h-[65vh] flex items-center justify-center overflow-hidden bg-black rounded-b-[40px] shadow-2xl mx-4 mt-4">
                <div className="absolute inset-0 z-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-40"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=2075')" }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60"></div>
                </div>

                <div className="container-custom relative z-10 text-center text-white px-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-ios-dark text-brand-yellow font-bold text-xs uppercase tracking-widest mb-6 border border-white/10">
                        Logística Pesada & Cargas Indivisíveis
                    </div>

                    <h1 className="text-4xl md:text-7xl font-black mb-8 tracking-tight drop-shadow-xl loading-tight">
                        Transporte Seguro para <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-500">Todo o Brasil</span>
                    </h1>

                    <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-gray-300 mb-10">
                        <span className="flex items-center gap-2"><Check className="text-green-500" size={16} /> Pranchas Rebaixadas</span>
                        <span className="flex items-center gap-2"><Check className="text-green-500" size={16} /> Seguro RCTR-C</span>
                        <span className="flex items-center gap-2"><Check className="text-green-500" size={16} /> Licenças AET</span>
                    </div>

                    <Link href="/lp/transporte-pesado">
                        <Button className="rounded-full bg-brand-yellow text-black hover:bg-white transition-all px-10 py-6 text-lg font-bold shadow-[0_0_40px_rgba(255,193,7,0.4)]">
                            Cotar Transporte Agora
                        </Button>
                    </Link>
                </div>
            </section>

            {/* PROCESS SECTION (HOW IT WORKS) */}
            <section className="py-24 px-4">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Como funciona nosso transporte?</h2>
                        <p className="text-gray-500 text-lg">Processo simplificado e seguro de ponta a ponta.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                        {/* Line Connector (Desktop only) */}
                        <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-gray-200 z-0"></div>

                        {[
                            { step: "01", title: "Cotação", desc: "Análise de medidas e peso da carga." },
                            { step: "02", title: "Logística", desc: "Definição de rota e emissão de AET." },
                            { step: "03", title: "Coleta", desc: "Embarque técnico e amarração certificada." },
                            { step: "04", title: "Entrega", desc: "Monitoramento em tempo real até o destino." },
                        ].map((item, i) => (
                            <div key={i} className="relative z-10 bg-[#F2F2F7] md:bg-transparent">
                                <div className="w-24 h-24 mx-auto bg-white rounded-full border-4 border-white shadow-xl flex items-center justify-center text-3xl font-black text-brand-yellow mb-6">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold text-center text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-center text-gray-500 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* RISK MITIGATION (PAIN POINTS) */}
            <section className="py-20 bg-white">
                <div className="container-custom px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-block bg-red-100 text-red-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">Atenção aos Riscos</div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">Não arrisque sua máquina com amadores</h2>
                            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                                Transporte de carga indivisível exige legislação específica. Multas e apreensões podem custar mais que o valor do frete, além de atrasar sua obra.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Multas por excesso de peso ou dimensão",
                                    "Risco de tombamento por amarração incorreta",
                                    "Apreensão do veículo e da carga pela PRF"
                                ].map((wish, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                                        <AlertTriangle className="text-red-500" size={20} />
                                        {wish}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative h-[400px] rounded-[40px] overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1000')] bg-cover bg-center"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-10">
                                <div className="text-white">
                                    <p className="font-bold text-2xl mb-2">Garantia Divino</p>
                                    <p className="text-gray-300 text-sm">Nossa frota é 100% regularizada com ANTT e seguros ativos.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ SPECIFIC */}
            <section className="py-20 px-4">
                <div className="container-custom max-w-3xl">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Dúvidas Frequentes sobre Transporte</h2>

                    <div className="space-y-4">
                        {[
                            { q: "O que é considerado Carga Indivisível?", a: "São cargas unitárias com peso ou dimensões excedentes aos limites regulamentares, que não podem ser fracionadas sem custo indevido ou risco de dano (ex: escavadeiras, blocos de rocha)." },
                            { q: "Vocês emitem AET (Autorização Especial)?", a: "Sim! Cuidamos de todo o processo burocrático junto ao DNIT e DER para emissão das licenças necessárias para o trajeto." },
                            { q: "Qual o valor do seguro de carga?", a: "O seguro RCTR-C (Responsabilidade Civil) já está incluso em nossos orçamentos, cobrindo, colisões, tombamentos e incêndios." },
                        ].map((item, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200/50">
                                <h3 className="flex items-center gap-3 font-bold text-gray-900 text-lg mb-2">
                                    <FileText size={20} className="text-brand-yellow" />
                                    {item.q}
                                </h3>
                                <p className="text-gray-500 pl-8 leading-relaxed">{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </main>
    );
}
