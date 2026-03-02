import { Button } from "@/components/ui/Button";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export const metadata = {
    title: 'Fale Conosco | Divino Locações',
    description: 'Entre em contato para cotações de locação de máquinas, terraplenagem e transporte.',
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[#F2F2F7] pt-24 pb-20 px-4">
            <div className="container-custom">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* Info Section */}
                    <div>
                        <span className="inline-block px-4 py-1.5 rounded-full bg-brand-yellow/10 text-brand-dark font-bold text-xs uppercase tracking-wider mb-6">
                            Contato
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 tracking-tight">
                            Vamos iniciar seu <br />
                            <span className="text-brand-yellow-vivid">próximo projeto?</span>
                        </h1>
                        <p className="text-lg text-gray-500 mb-10 leading-relaxed">
                            Nossa equipe está pronta para atender sua demanda com agilidade. Resposta em até 30 minutos em horário comercial.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-6 p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                    <MessageCircle size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 font-medium">WhatsApp (Comercial)</p>
                                    <p className="text-lg font-bold text-gray-900">(12) 98106-4529</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 font-medium">E-mail</p>
                                    <p className="text-lg font-bold text-gray-900">contato@divinolocacoes.com.br</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 font-medium">Sede Operacional</p>
                                    <p className="text-lg font-bold text-gray-900">R. Cel. Gonçalves, 110 - Eugênio de Melo, SJC</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="bg-white p-8 md:p-10 rounded-[40px] shadow-xl border border-gray-100 sticky top-24">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900">Envie uma mensagem</h2>
                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Nome</label>
                                    <input className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-yellow/50 transition-all" placeholder="Seu nome" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Telefone</label>
                                    <input className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-yellow/50 transition-all" placeholder="(00) 00000-0000" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">E-mail Corporativo</label>
                                <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-yellow/50 transition-all" placeholder="nome@empresa.com" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Assunto</label>
                                <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-yellow/50 transition-all">
                                    <option>Orçamento de Máquina</option>
                                    <option>Serviço de Terraplenagem</option>
                                    <option>Transporte Pesado</option>
                                    <option>Outro</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Mensagem</label>
                                <textarea className="w-full h-32 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-yellow/50 transition-all resize-none" placeholder="Descreva sua necessidade..." />
                            </div>

                            <Button className="w-full h-14 text-lg bg-brand-dark text-white rounded-xl hover:bg-black shadow-lg mt-4">
                                Enviar Solicitação
                            </Button>
                            <p className="text-xs text-center text-gray-400 mt-4">Ao enviar, você concorda com nossa Política de Privacidade.</p>
                        </form>
                    </div>

                </div>
            </div>
        </main>
    );
}
