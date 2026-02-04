import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
    title: 'Aluguel de Escavadeira em SJC - Entrega Imediata | Divino Locações',
    description: 'Precisa de máquinas pesadas agora? Atendimento urgente em São José dos Campos e região. Fale no WhatsApp!',
};

export default function UrgencyLP() {
    return (
        <div className="min-h-screen bg-white text-gray-900 pb-20 font-sans">
            {/* Sticky Mobile CTA */}
            <div className="fixed bottom-0 left-0 w-full z-50 bg-green-600 p-4 md:hidden text-center shadow-[0_-5px_20px_rgba(0,0,0,0.2)]">
                <Link
                    href="https://wa.me/5512999999999?text=Preciso%20de%20uma%20escavadeira%20urgente"
                    className="font-bold text-white text-lg uppercase tracking-wide flex items-center justify-center gap-2"
                >
                    <span>💬</span> Chamar no WhatsApp
                </Link>
            </div>

            {/* Hero Section */}
            <header className="relative bg-brand-dark text-white pt-24 pb-32 px-4 overflow-hidden">
                {/* Abstract shapes/gradient background */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gray-800 to-transparent opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent"></div>

                <div className="container-custom max-w-4xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 bg-red-600 border border-red-500 text-white px-4 py-1.5 font-bold rounded-full mb-8 text-sm animate-pulse shadow-lg shadow-red-900/50">
                        <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
                        DISPONIBILIDADE IMEDIATA
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight">
                        Precisa de <span className="text-brand-yellow">Escavadeira</span> ou <span className="text-brand-yellow">Retro</span> em SJC?
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-10 font-light max-w-2xl mx-auto">
                        Máquinas revisadas, com operador e combustível. <br /><span className="text-white font-semibold">Chegamos na sua obra em até 4 horas.</span>
                    </p>
                    <Link
                        href="https://wa.me/5512999999999"
                        className="inline-flex items-center justify-center bg-brand-confirm text-white font-bold text-xl px-10 py-5 rounded-full shadow-[0_0_30px_rgba(46,204,113,0.4)] transform hover:scale-105 transition-all hover:bg-green-500 border border-green-400"
                    >
                        QUERO ORÇAMENTO RÁPIDO ⚡
                    </Link>
                    <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400">
                        <span>🔒 Sem compromisso</span>
                        <span>•</span>
                        <span>⏱️ Resposta em 2 min</span>
                    </div>
                </div>
            </header>

            {/* Fleet Gallery */}
            <section className="py-20 -mt-10 relative z-20">
                <div className="container-custom mx-auto">
                    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
                        <h2 className="text-3xl font-bold text-center mb-12 text-brand-dark">Nossa Frota Disponível</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Card 1 */}
                            <div className="group bg-gray-50 p-6 rounded-2xl border border-gray-200 hover:border-brand-yellow transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                <div className="h-48 bg-white rounded-xl mb-6 flex items-center justify-center text-gray-300 shadow-inner overflow-hidden">
                                    <div className="text-6xl group-hover:scale-110 transition-transform duration-500">🚜</div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Escavadeira Hidráulica</h3>
                                <p className="text-gray-500 text-sm mb-4">Komatsu PC 210</p>
                                <div className="flex items-center gap-2 text-brand-confirm font-bold text-sm bg-green-100 py-2 px-3 rounded-lg w-fit">
                                    <span className="w-2 h-2 bg-brand-confirm rounded-full"></span> Disponível Hoje
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="group bg-gray-50 p-6 rounded-2xl border border-gray-200 hover:border-brand-yellow transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                <div className="h-48 bg-white rounded-xl mb-6 flex items-center justify-center text-gray-300 shadow-inner overflow-hidden">
                                    <div className="text-6xl group-hover:scale-110 transition-transform duration-500">🚜</div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Retroescavadeira</h3>
                                <p className="text-gray-500 text-sm mb-4">JCB 3CX 4x4</p>
                                <div className="flex items-center gap-2 text-brand-confirm font-bold text-sm bg-green-100 py-2 px-3 rounded-lg w-fit">
                                    <span className="w-2 h-2 bg-brand-confirm rounded-full"></span> Disponível Hoje
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="group bg-gray-50 p-6 rounded-2xl border border-gray-200 hover:border-brand-yellow transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                <div className="h-48 bg-white rounded-xl mb-6 flex items-center justify-center text-gray-300 shadow-inner overflow-hidden">
                                    <div className="text-6xl group-hover:scale-110 transition-transform duration-500">🚜</div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Rolo Compactador</h3>
                                <p className="text-gray-500 text-sm mb-4">Liso ou Pé de Carneiro</p>
                                <div className="flex items-center gap-2 text-brand-confirm font-bold text-sm bg-green-100 py-2 px-3 rounded-lg w-fit">
                                    <span className="w-2 h-2 bg-brand-confirm rounded-full"></span> Disponível Hoje
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="pb-20">
                <div className="container-custom max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex gap-6 p-6 rounded-2xl hover:bg-gray-50 transition-colors">
                        <div className="text-brand-yellow text-5xl font-black opacity-80">01</div>
                        <div>
                            <h3 className="font-bold text-2xl mb-3 text-brand-dark">Sem Burocracia</h3>
                            <p className="text-gray-600 leading-relaxed">Cadastro simplificado para empresas e autônomos. Aprovamos seu crédito na hora via WhatsApp.</p>
                        </div>
                    </div>
                    <div className="flex gap-6 p-6 rounded-2xl hover:bg-gray-50 transition-colors">
                        <div className="text-brand-yellow text-5xl font-black opacity-80">02</div>
                        <div>
                            <h3 className="font-bold text-2xl mb-3 text-brand-dark">Manutenção Inclusa</h3>
                            <p className="text-gray-600 leading-relaxed">Você foca na obra, nós cuidamos da máquina. Se parar, trocamos imediatamente sem custo extra.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
