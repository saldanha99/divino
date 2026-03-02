'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight } from "lucide-react";
import SmartLeadModal from '@/components/marketing/SmartLeadModal';

type Machine = {
    id: string;
    name: string;
    category: string;
    images: string;
    description: string;
    slug: string;
};

type Props = {
    initialMachines: Machine[];
};

const CATEGORIES = ['Todas', 'Escavadeiras', 'Retroescavadeiras', 'Compactação', 'Transporte', 'Tratores', 'Nivelamento', 'Carregadeiras', 'Acessórios'];

export default function FleetGrid({ initialMachines }: Props) {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedMachine, setSelectedMachine] = useState('');

    const handleCardClick = (machineName: string) => {
        setSelectedMachine('Locacao');
        setModalOpen(true);
    };

    return (
        <div className="container-custom px-4 -mt-20 relative z-20">

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {initialMachines.map((item) => (
                    <div key={item.id} className="group bg-white rounded-[2rem] overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
                        {/* Image — Next.js optimized */}
                        <div className="relative h-64 overflow-hidden bg-gray-100">
                            <Image
                                src={item.images || '/images/placeholder.jpg'}
                                alt={item.name}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>

                            <div className="absolute top-4 left-4 z-10">
                                <span className="bg-brand-yellow text-black px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-sm">
                                    {item.category}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col">
                            <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-brand-dark transition-colors">
                                {item.name}
                            </h3>
                            <p className="text-gray-500 text-sm mb-6 flex-1 line-clamp-3">
                                {item.description}
                            </p>

                            <div className="border-t border-gray-100 pt-6 flex items-center justify-between gap-4">
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Valor da Locação</span>
                                    <span className="font-bold text-gray-900">Sob Consulta</span>
                                </div>
                                <button
                                    onClick={() => handleCardClick(item.name)}
                                    className="w-12 h-12 rounded-full bg-black text-white hover:bg-brand-yellow hover:text-black transition-all shadow-lg group-hover:scale-110 flex items-center justify-center"
                                >
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {initialMachines.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-gray-400 text-lg">Nenhum equipamento encontrado nesta categoria.</p>
                </div>
            )}

            {/* Lead Capture Modal */}
            <SmartLeadModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                initialService={selectedMachine}
            />
        </div>
    );
}

