import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/Button';

export const metadata = {
    title: 'Transporte de Máquinas Pesadas - Cotação Online | Divino Locações',
    description: 'Transporte de escavadeiras, tratores e cargas indivisíveis para todo Brasil. Prancha e Carreta Extensiva. Cote agora.',
};

export default function TransportLP() {
    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">

                {/* Left Column: Value Proposition */}
                <div className="relative bg-brand-dark p-8 lg:p-20 text-white flex flex-col justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=2075&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/95 to-transparent"></div>

                    <div className="relative z-10 max-w-xl mx-auto lg:mx-0">
                        <div className="inline-flex items-center gap-2 mb-8 bg-white/10 backdrop-blur rounded-full px-4 py-1 border border-white/10">
                            <span className="text-brand-yellow">★</span>
                            <span className="text-sm font-medium">Líder em Logística Pesada</span>
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-black mb-8 leading-tight">
                            Transporte de <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-200">Cargas Pesadas</span> para todo Brasil
                        </h1>
                        <ul className="space-y-6 mb-12 text-lg text-gray-300">
                            <li className="flex items-start gap-4">
                                <div className="w-6 h-6 rounded-full bg-brand-confirm flex items-center justify-center text-xs font-bold text-white mt-1">✓</div>
                                <span>Pranchas Retas e Rebaixadas (3 a 6 eixos)</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="w-6 h-6 rounded-full bg-brand-confirm flex items-center justify-center text-xs font-bold text-white mt-1">✓</div>
                                <span>Licenças Especiais (AET) DNIT e DER inclusas</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="w-6 h-6 rounded-full bg-brand-confirm flex items-center justify-center text-xs font-bold text-white mt-1">✓</div>
                                <span>Seguro de Carga RCTR-C (Apólice R$ 5MM)</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="w-6 h-6 rounded-full bg-brand-confirm flex items-center justify-center text-xs font-bold text-white mt-1">✓</div>
                                <span>Rastreamento via Satélite com Link para Cliente</span>
                            </li>
                        </ul>

                        <div className="hidden lg:flex items-center gap-6 p-6 bg-white/5 rounded-2xl backdrop-blur border border-white/10">
                            <div className="w-12 h-12 rounded-full bg-brand-yellow flex items-center justify-center text-2xl">📞</div>
                            <div>
                                <p className="font-mono text-sm text-brand-yellow mb-1 font-bold tracking-wider">PLANTÃO 24H</p>
                                <p className="text-3xl font-bold">(12) 3939-0000</p>
                                <p className="opacity-60 text-sm">comercial@divinolocacoes.com.br</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Quote Form */}
                <div className="p-8 lg:p-16 flex flex-col justify-center bg-gray-50">
                    <div className="max-w-lg mx-auto w-full bg-white p-8 lg:p-10 rounded-3xl shadow-premium border border-gray-100">
                        <h2 className="text-3xl font-bold mb-2 text-gray-900">Solicitar Cotação</h2>
                        <p className="text-gray-500 mb-8">Preencha os dados da carga para receber o orçamento oficial em PDF.</p>

                        <form className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Empresa / Nome</label>
                                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-yellow focus:border-transparent outline-none transition-all hover:bg-white" required />
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Cidade Origem</label>
                                    <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-yellow transition-all" placeholder="Ex: SJC - SP" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Cidade Destino</label>
                                    <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-yellow transition-all" placeholder="Ex: obras - MG" required />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Detalhes da Carga</label>
                                <textarea
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 h-32 outline-none resize-none focus:ring-2 focus:ring-brand-yellow transition-all"
                                    placeholder="Ex: Escavadeira CAT 320, 22 toneladas. Dimensões: ..."
                                ></textarea>
                            </div>

                            <div className="pt-4">
                                <Button size="lg" className="w-full text-lg py-4 shadow-lg shadow-brand-dark/20 bg-brand-dark text-white hover:bg-black">
                                    RECEBER COTAÇÃO PDF 📄
                                </Button>
                            </div>
                            <p className="text-xs text-center text-gray-400 mt-6 flex items-center justify-center gap-2">
                                <span>🔒 Seus dados estão seguros</span>
                            </p>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}
