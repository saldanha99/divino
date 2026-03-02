'use client';

import React, { useState } from 'react';
import { CheckCircle2, Loader2, User, Smartphone, MapPin, Clock, Truck } from 'lucide-react';
import { createSmartLead } from '@/actions/leads';

const SERVICE_OPTIONS = [
    'Terraplenagem',
    'Drenagem',
    'Pavimentação',
    'Obras Viárias',
    'Água e Esgoto',
    'Demolição',
    'Locação de Máquinas',
    'Outro',
];

const URGENCY_OPTIONS = [
    { label: 'Urgente (até 7 dias)', value: 'urgente' },
    { label: 'Próximas semanas', value: 'semanas' },
    { label: 'Próximos meses', value: 'meses' },
    { label: 'Apenas cotando', value: 'cotando' },
];

export default function EmbeddedLeadForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        whatsapp: '',
        serviceType: '',
        city: '',
        urgency: '',
    });

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);

        let formatted = value;
        if (value.length > 2) formatted = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        if (value.length > 7) formatted = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;

        setFormData({ ...formData, whatsapp: formatted });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.whatsapp || !formData.serviceType) return;
        setLoading(true);

        const rawPhone = formData.whatsapp.replace(/\D/g, '');
        const finalPhone = rawPhone.startsWith('55') ? rawPhone : `55${rawPhone}`;

        const payload = { ...formData, whatsapp: finalPhone };
        const result = await createSmartLead(payload);

        if (result.success) {
            setSuccess(true);
            setTimeout(() => {
                const message = `Olá! Meu nome é ${formData.name}. Gostaria de um orçamento para *${formData.serviceType}* em *${formData.city}* (${formData.urgency}).`;
                const url = `https://wa.me/5512981064529?text=${encodeURIComponent(message)}`;
                window.open(url, '_blank');
            }, 1500);
        } else {
            alert('Erro ao enviar. Tente novamente.');
        }
        setLoading(false);
    };

    if (success) {
        return (
            <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100 flex flex-col items-center justify-center text-center min-h-[400px]">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Recebemos seu contato!</h3>
                <p className="text-gray-500">Um especialista entrará em contato pelo WhatsApp em breve.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 space-y-5">
            <div>
                <h3 className="text-2xl font-black text-gray-900 mb-1">Solicite seu Orçamento</h3>
                <p className="text-gray-500 text-sm">Preencha e receba uma proposta sem compromisso.</p>
            </div>

            {/* Name */}
            <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all"
                    required
                />
            </div>

            {/* WhatsApp */}
            <div className="relative">
                <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="tel"
                    placeholder="(00) 00000-0000"
                    value={formData.whatsapp}
                    onChange={handlePhoneChange}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all"
                    required
                />
            </div>

            {/* Service Type */}
            <div className="relative">
                <Truck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all appearance-none"
                    required
                >
                    <option value="">Tipo de serviço</option>
                    {SERVICE_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
            </div>

            {/* City */}
            <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Cidade da obra"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all"
                />
            </div>

            {/* Urgency */}
            <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                    value={formData.urgency}
                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all appearance-none"
                >
                    <option value="">Prazo desejado</option>
                    {URGENCY_OPTIONS.map((u) => (
                        <option key={u.value} value={u.value}>{u.label}</option>
                    ))}
                </select>
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={loading || !formData.name || !formData.whatsapp || !formData.serviceType}
                className="w-full py-4 bg-brand-yellow text-black font-bold text-lg rounded-xl hover:bg-yellow-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
                {loading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Enviando...
                    </>
                ) : (
                    'Enviar Orçamento'
                )}
            </button>

            <p className="text-xs text-gray-400 text-center">
                Seus dados estão seguros. Responderemos em até 24h.
            </p>
        </form>
    );
}
