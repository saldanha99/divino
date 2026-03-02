'use client';
import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import SmartLeadModal from './SmartLeadModal';

export default function DetailedQuoteCTA() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full my-12">
            <div className="bg-[#1C1C1E] rounded-3xl p-8 md:p-12 text-center md:text-left relative overflow-hidden shadow-2xl border border-gray-800">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-xl">
                        <h3 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
                            Precisa de um orçamento <br />
                            <span className="text-brand-yellow">detalhado?</span>
                        </h3>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Envie a topografia ou metragem do seu terreno e receba uma proposta técnica em até 24h.
                        </p>
                    </div>

                    <button
                        onClick={() => setIsOpen(true)}
                        className="bg-brand-yellow hover:bg-white text-brand-dark px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 hover:scale-105 transition-all shadow-lg hover:shadow-brand-yellow/20 whitespace-nowrap"
                    >
                        <MessageCircle className="w-6 h-6" />
                        Falar no WhatsApp
                    </button>
                </div>
            </div>

            <SmartLeadModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                initialService="Geral"
            />
        </div>
    );
}

