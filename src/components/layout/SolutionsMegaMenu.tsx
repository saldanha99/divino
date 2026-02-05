"use client";

import React from 'react';
import Link from 'next/link';
import { Droplets, Truck, Cone, Building2, Hammer, ArrowRight } from 'lucide-react';

const solutions = [
    {
        title: "Drenagem",
        description: "Soluções para escoamento pluvial urbano e rodoviário.",
        icon: Droplets,
        href: "/servicos/drenagem",
        color: "bg-blue-500"
    },
    {
        title: "Água e Esgoto",
        description: "Redes de abastecimento e saneamento básico.",
        icon: Droplets, // Using distinct icon if available, or reused contextually
        href: "/servicos/agua-esgoto",
        color: "bg-cyan-500"
    },
    {
        title: "Terraplenagem",
        description: "Nivelamento, cortes e aterros com precisão.",
        icon: Truck,
        href: "/servicos/terraplenagem",
        color: "bg-yellow-500"
    },
    {
        title: "Pavimentação",
        description: "Asfalto e pisos intertravados de alta durabilidade.",
        icon: Cone,
        href: "/servicos/pavimentacao",
        color: "bg-gray-600"
    },
    {
        title: "Obras Viárias",
        description: "Infraestrutura completa para vias urbanas.",
        icon: Building2,
        href: "/servicos/obras-viarias",
        color: "bg-orange-500"
    },
    {
        title: "Demolição",
        description: "Demolição mecanizada e segura.",
        icon: Hammer,
        href: "/servicos/demolicao",
        color: "bg-red-500"
    }
];

export default function SolutionsMegaMenu() {
    return (
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-[800px] mt-4 p-4 rounded-3xl glass-ios border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.15)] animate-fade-in-up origin-top z-50 overflow-hidden">
            <div className="bg-white/50 backdrop-blur-3xl absolute inset-0 -z-10"></div>

            <div className="grid grid-cols-2 gap-4">
                {solutions.map((item, index) => (
                    <Link
                        key={index}
                        href={item.href}
                        className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-white/60 transition-all duration-200"
                    >
                        <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center text-white shadow-lg shadow-black/5 group-hover:scale-110 transition-transform duration-300`}>
                            <item.icon size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-lg group-hover:text-brand-dark transition-colors flex items-center gap-2">
                                {item.title}
                                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-gray-400" />
                            </h3>
                            <p className="text-sm text-gray-500 font-medium leading-relaxed mt-1">
                                {item.description}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200/50 flex justify-between items-center px-4">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Infraestrutura Completa</span>
                <Link href="/servicos" className="text-sm font-bold text-brand-dark hover:underline">
                    Ver todos os serviços →
                </Link>
            </div>
        </div>
    );
}
