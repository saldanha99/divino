"use client";
import React, { useState, useRef } from 'react';
import { MoreHorizontal, MessageCircle, MapPin, Calendar, GripVertical, ArrowRight, ArrowLeft } from 'lucide-react';
import { type Lead, LeadStatus } from '@prisma/client';
import { updateLeadStatus } from '@/actions/leads';

interface KanbanBoardProps {
    initialLeads: Lead[];
}

const COLUMNS: { id: LeadStatus; title: string; color: string; emoji: string }[] = [
    { id: 'NEW', title: 'Novos Leads', color: 'bg-blue-500', emoji: '🆕' },
    { id: 'QUOTING', title: 'Em Orçamento', color: 'bg-yellow-500', emoji: '💬' },
    { id: 'APPROVED', title: 'Aprovados', color: 'bg-green-500', emoji: '✅' },
    { id: 'EXECUTING', title: 'Em Execução', color: 'bg-purple-500', emoji: '🚧' },
    { id: 'COMPLETED', title: 'Concluídos', color: 'bg-emerald-600', emoji: '🏁' },
    { id: 'LOST', title: 'Perdidos', color: 'bg-red-400', emoji: '❌' },
];

const COLUMN_INDEX: Record<LeadStatus, number> = {
    NEW: 0,
    QUOTING: 1,
    APPROVED: 2,
    EXECUTING: 3,
    COMPLETED: 4,
    LOST: 5,
};

export default function KanbanBoard({ initialLeads = [] }: KanbanBoardProps) {
    const [leads, setLeads] = useState<Lead[]>(initialLeads);
    const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null);
    const [dragOverColumn, setDragOverColumn] = useState<LeadStatus | null>(null);
    const [isUpdating, setIsUpdating] = useState<string | null>(null);

    const getLeadsByStatus = (status: LeadStatus) => {
        return leads.filter(lead => lead.status === status);
    };

    const handleStatusUpdate = async (leadId: string, newStatus: LeadStatus) => {
        const lead = leads.find(l => l.id === leadId);
        if (!lead || lead.status === newStatus) return;

        setIsUpdating(leadId);

        // Optimistic update
        setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));

        try {
            const result = await updateLeadStatus(leadId, newStatus);
            if (!result.success) {
                // Rollback on failure
                setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: lead.status } : l));
            }
        } catch (error) {
            // Rollback
            setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: lead.status } : l));
            console.error('Failed to update lead status:', error);
        } finally {
            setIsUpdating(null);
        }
    };

    // --- HTML5 Drag & Drop Handlers ---
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, leadId: string) => {
        setDraggedLeadId(leadId);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', leadId);
        const target = e.currentTarget;
        setTimeout(() => {
            target.style.opacity = '0.4';
        }, 0);
    };

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        setDraggedLeadId(null);
        setDragOverColumn(null);
        e.currentTarget.style.opacity = '1';
    };

    const handleDragOver = (e: React.DragEvent, columnId: LeadStatus) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setDragOverColumn(columnId);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        // Only clear if we're leaving the column entirely
        const relatedTarget = e.relatedTarget as HTMLElement;
        if (!e.currentTarget.contains(relatedTarget)) {
            setDragOverColumn(null);
        }
    };

    const handleDrop = (e: React.DragEvent, columnId: LeadStatus) => {
        e.preventDefault();
        const leadId = e.dataTransfer.getData('text/plain');
        if (leadId) {
            handleStatusUpdate(leadId, columnId);
        }
        setDraggedLeadId(null);
        setDragOverColumn(null);
    };

    // Get next and previous column for mobile buttons
    const getNextStatus = (current: LeadStatus): LeadStatus | null => {
        const idx = COLUMN_INDEX[current];
        // Skip to LOST is handled by separate button, normal advance skips LOST
        if (idx < 4) return COLUMNS[idx + 1].id;
        return null;
    };

    const getPrevStatus = (current: LeadStatus): LeadStatus | null => {
        const idx = COLUMN_INDEX[current];
        if (idx > 0 && current !== 'LOST') return COLUMNS[idx - 1].id;
        if (current === 'LOST') return 'NEW';
        return null;
    };

    return (
        <div className="flex gap-4 overflow-x-auto pb-8 lg:grid lg:grid-cols-6 lg:gap-2 lg:overflow-visible lg:pb-0 h-[calc(100vh-200px)] scrollbar-thin">
            {COLUMNS.map((column) => {
                const columnLeads = getLeadsByStatus(column.id);
                const isDragTarget = dragOverColumn === column.id;

                return (
                    <div
                        key={column.id}
                        className={`min-w-[280px] lg:min-w-0 flex-1 flex flex-col h-full rounded-2xl p-3 transition-all duration-200 ${isDragTarget
                            ? 'bg-brand-yellow/10 ring-2 ring-brand-yellow/50 scale-[1.01]'
                            : 'bg-gray-100/50'
                            }`}
                        onDragOver={(e) => handleDragOver(e, column.id)}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, column.id)}
                    >
                        {/* Column Header */}
                        <div className="flex items-center justify-between mb-3 px-2">
                            <div className="flex items-center gap-2">
                                <span className={`w-3 h-3 rounded-full ${column.color}`}></span>
                                <h3 className="font-bold text-gray-700 text-sm">{column.title}</h3>
                                <span className="bg-white text-gray-500 text-xs px-2 py-0.5 rounded-full font-bold shadow-sm">
                                    {columnLeads.length}
                                </span>
                            </div>
                            <span className="text-sm">{column.emoji}</span>
                        </div>

                        {/* Cards */}
                        <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                            {columnLeads.map((lead) => {
                                const nextStatus = getNextStatus(lead.status);
                                const prevStatus = getPrevStatus(lead.status);
                                const updating = isUpdating === lead.id;

                                return (
                                    <div
                                        key={lead.id}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, lead.id)}
                                        onDragEnd={handleDragEnd}
                                        className={`bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-grab active:cursor-grabbing group relative ${draggedLeadId === lead.id ? 'opacity-40 scale-95' : ''
                                            } ${updating ? 'animate-pulse' : ''}`}
                                    >
                                        {/* Drag Handle */}
                                        <div className="absolute top-3 right-3 opacity-30 group-hover:opacity-100 transition-opacity">
                                            <GripVertical className="w-4 h-4 text-gray-400" />
                                        </div>

                                        {/* Service Tag */}
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-dark bg-brand-yellow/20 px-2 py-0.5 rounded">
                                                {lead.serviceType || 'Geral'}
                                            </span>
                                        </div>

                                        {/* Name & Location */}
                                        <h4 className="font-bold text-gray-900 mb-1 text-sm pr-6">{lead.name}</h4>
                                        <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                                            <MapPin className="w-3 h-3" /> {lead.city || 'Não informado'}
                                        </p>

                                        {/* Urgency Badge */}
                                        {lead.urgency && (
                                            <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 ${lead.urgency === 'Imediato'
                                                ? 'bg-red-100 text-red-600'
                                                : 'bg-blue-100 text-blue-600'
                                                }`}>
                                                {lead.urgency}
                                            </span>
                                        )}

                                        {/* Footer */}
                                        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                                            <span className="text-xs font-medium text-gray-400 flex items-center gap-1">
                                                <Calendar className="w-3 h-3" /> {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
                                            </span>

                                            <a
                                                href={`https://wa.me/${lead.contact?.replace(/\D/g, '')}`}
                                                target="_blank"
                                                className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center text-green-600 hover:scale-110 transition-transform"
                                                title="Chamar no WhatsApp"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <MessageCircle className="w-3.5 h-3.5" />
                                            </a>
                                        </div>

                                        {/* Move Buttons (Mobile Fallback) */}
                                        <div className="mt-2 flex gap-1 justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                                            {prevStatus && (
                                                <button
                                                    onClick={() => handleStatusUpdate(lead.id, prevStatus)}
                                                    className="flex items-center gap-1 text-[10px] font-bold text-gray-400 hover:text-brand-dark px-2 py-1 rounded-lg hover:bg-gray-50 transition-colors"
                                                    disabled={updating}
                                                >
                                                    <ArrowLeft className="w-3 h-3" /> Voltar
                                                </button>
                                            )}
                                            <div className="flex gap-1">
                                                {nextStatus && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(lead.id, nextStatus)}
                                                        className="flex items-center gap-1 text-[10px] font-bold text-gray-400 hover:text-green-600 px-2 py-1 rounded-lg hover:bg-green-50 transition-colors"
                                                        disabled={updating}
                                                    >
                                                        Avançar <ArrowRight className="w-3 h-3" />
                                                    </button>
                                                )}
                                                {column.id !== 'LOST' && column.id !== 'COMPLETED' && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(lead.id, 'LOST')}
                                                        className="flex items-center gap-1 text-[10px] font-bold text-gray-400 hover:text-red-500 px-2 py-1 rounded-lg hover:bg-red-50 transition-colors"
                                                        disabled={updating}
                                                    >
                                                        ❌
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Empty State */}
                            {columnLeads.length === 0 && (
                                <div className={`flex items-center justify-center h-24 border-2 border-dashed rounded-xl text-sm text-gray-400 font-medium transition-colors ${isDragTarget ? 'border-brand-yellow bg-brand-yellow/5 text-brand-dark' : 'border-gray-200'
                                    }`}>
                                    {isDragTarget ? 'Soltar aqui' : 'Nenhum lead'}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
