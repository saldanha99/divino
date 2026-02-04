"use client";
import React, { useState } from 'react';
import { MoreHorizontal, Plus } from 'lucide-react';

interface Lead {
    id: string;
    title: string;
    company: string;
    value: string;
    tag: string;
}

const initialData = {
    new: {
        title: 'Novos Leads',
        color: 'bg-blue-500',
        items: [
            { id: '1', title: 'Terraplenagem Obra Sul', company: 'Construtora Vale', value: 'R$ 12.000', tag: 'Alta Prioridade' },
            { id: '2', title: 'Locação Retro', company: 'Mario Terra', value: 'R$ 3.500', tag: 'WhatsApp' },
        ]
    },
    quoting: {
        title: 'Em Orçamento',
        color: 'bg-yellow-500',
        items: [
            { id: '3', title: 'Frota Mensal', company: 'Engenharia ABC', value: 'R$ 45.000', tag: 'Corporativo' },
        ]
    },
    approved: {
        title: 'Fechado/Aprovado',
        color: 'bg-green-500',
        items: [
            { id: '4', title: 'Rolo Compactador', company: 'Via Oeste', value: 'R$ 8.000', tag: 'Recorrente' },
        ]
    },
};

export default function KanbanBoard() {
    const [columns, setColumns] = useState(initialData);

    return (
        <div className="flex gap-6 overflow-x-auto pb-8">
            {Object.entries(columns).map(([columnId, column]) => (
                <div key={columnId} className="min-w-[320px] flex-1">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <span className={`w-3 h-3 rounded-full ${column.color}`}></span>
                            <h3 className="font-bold text-gray-700">{column.title}</h3>
                            <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full font-medium">{column.items.length}</span>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="space-y-3">
                        {column.items.map((item) => (
                            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing group">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 border border-gray-100 px-2 py-0.5 rounded">{item.tag}</span>
                                    <button className="text-gray-300 hover:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                </div>
                                <h4 className="font-bold text-brand-dark mb-1">{item.title}</h4>
                                <p className="text-sm text-gray-500 mb-4">{item.company}</p>

                                <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                                    <span className="font-bold text-gray-900">{item.value}</span>
                                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                                        {item.company.charAt(0)}
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 font-medium hover:border-brand-yellow hover:text-brand-yellow transition-colors text-sm">
                            + Adicionar Card
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
