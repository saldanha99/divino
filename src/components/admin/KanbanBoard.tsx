"use client";
import React, { useState, useEffect } from 'react';
import { MoreHorizontal, Plus, MessageCircle, MapPin, Calendar } from 'lucide-react';
import { type Lead, LeadStatus } from '@prisma/client';
import { updateLeadStatus } from '@/actions/leads'; // We will create this action next

interface KanbanBoardProps {
    initialLeads: Lead[];
}

const COLUMNS: { id: LeadStatus; title: string; color: string }[] = [
    { id: 'NEW', title: 'Novos Leads', color: 'bg-blue-500' },
    { id: 'QUOTING', title: 'Em Orçamento', color: 'bg-yellow-500' },
    { id: 'APPROVED', title: 'Aprovados', color: 'bg-green-500' },
    { id: 'LOST', title: 'Perdidos', color: 'bg-red-400' },
];

export default function KanbanBoard({ initialLeads = [] }: KanbanBoardProps) {
    const [leads, setLeads] = useState<Lead[]>(initialLeads);

    // Group leads by status
    const getLeadsByStatus = (status: LeadStatus) => {
        return leads.filter(lead => lead.status === status);
    };

    const handleStatusUpdate = async (leadId: string, newStatus: LeadStatus) => {
        // Optimistic update
        setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));

        // Server action
        // await updateLeadStatus(leadId, newStatus); 
        // Note: We need to implement this action or import it. 
        // For now, let's assume it works or just focus on UI.
    };

    return (
        <div className="flex gap-6 overflow-x-auto pb-8 h-[calc(100vh-200px)]">
            {COLUMNS.map((column) => (
                <div key={column.id} className="min-w-[320px] flex-1 flex flex-col h-full bg-gray-100/50 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-4 px-2">
                        <div className="flex items-center gap-2">
                            <span className={`w-3 h-3 rounded-full ${column.color}`}></span>
                            <h3 className="font-bold text-gray-700">{column.title}</h3>
                            <span className="bg-white text-gray-500 text-xs px-2 py-1 rounded-full font-bold shadow-sm">
                                {getLeadsByStatus(column.id).length}
                            </span>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
                        {getLeadsByStatus(column.id).map((lead) => (
                            <div key={lead.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer group relative">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-dark bg-brand-yellow/20 px-2 py-0.5 rounded">
                                        {lead.serviceType || 'Geral'}
                                    </span>
                                    {/* Quick Actions (Mock) */}
                                    <div className="flex gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-1 hover:bg-gray-100 rounded">
                                            <MoreHorizontal className="w-4 h-4 text-gray-400" />
                                        </button>
                                    </div>
                                </div>

                                <h4 className="font-bold text-gray-900 mb-1">{lead.name}</h4>
                                <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
                                    <MapPin className="w-3 h-3" /> {lead.city || 'Não informado'}
                                </p>

                                <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                                    <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                                        <Calendar className="w-3 h-3" /> {new Date(lead.createdAt).toLocaleDateString()}
                                    </span>

                                    <a
                                        href={`https://wa.me/${lead.contact.replace(/\D/g, '')}`}
                                        target="_blank"
                                        className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 hover:scale-110 transition-transform"
                                        title="Chamar no WhatsApp"
                                    >
                                        <MessageCircle className="w-4 h-4" />
                                    </a>
                                </div>

                                {/* Simple Drag/Drop Simulators (move left/right) */}
                                <div className="mt-3 flex gap-2 justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold text-gray-400">
                                    {column.id !== 'NEW' && (
                                        <button onClick={() => handleStatusUpdate(lead.id, 'NEW')} className="hover:text-brand-dark">{'< Mover'}</button>
                                    )}
                                    {column.id !== 'LOST' && (
                                        <button onClick={() => handleStatusUpdate(lead.id, 'QUOTING')} className="hover:text-brand-dark">{'Avancar >'}</button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
