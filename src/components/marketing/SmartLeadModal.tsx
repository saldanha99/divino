'use client';

import React, { useState } from 'react';
import { X, ChevronRight, CheckCircle2, Truck, Hammer, MapPin, Clock, Smartphone, User } from 'lucide-react';
import { createSmartLead } from '@/actions/leads';

type Step = 'SERVICE' | 'DETAILS' | 'CONTACT' | 'SUCCESS';

interface SmartLeadModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialService?: string;
}

export default function SmartLeadModal({ isOpen, onClose, initialService }: SmartLeadModalProps) {
    const [step, setStep] = useState<Step>(initialService ? 'DETAILS' : 'SERVICE');
    const [loading, setLoading] = useState(false);

    // Form Data
    const [formData, setFormData] = useState({
        serviceType: initialService || '',
        city: '',
        urgency: '',
        name: '',
        whatsapp: ''
    });

    // Reset when opening with a new service
    React.useEffect(() => {
        if (isOpen && initialService) {
            setFormData(prev => ({ ...prev, serviceType: initialService }));
            setStep('DETAILS');
        }
    }, [isOpen, initialService]);

    if (!isOpen) return null;

    const handleBack = () => {
        if (step === 'DETAILS') setStep('SERVICE');
        if (step === 'CONTACT') setStep('DETAILS');
    };

    const handleNext = () => {
        if (step === 'SERVICE' && formData.serviceType) setStep('DETAILS');
        else if (step === 'DETAILS' && formData.city && formData.urgency) setStep('CONTACT');
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.whatsapp) return;
        setLoading(true);

        const result = await createSmartLead(formData);

        if (result.success) {
            setStep('SUCCESS');
            // Auto redirect to WhatsApp after 2 seconds
            setTimeout(() => {
                const message = `Olá! Meu nome é ${formData.name}. Gostaria de um orçamento para *${formData.serviceType}* em *${formData.city}* (${formData.urgency}).`;
                const url = `https://wa.me/5512999999999?text=${encodeURIComponent(message)}`;
                window.open(url, '_blank');
                onClose();
            }, 2000);
        } else {
            alert('Erro ao enviar. Tente novamente.');
        }
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-[32px] w-full max-w-lg shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300">

                {/* Header */}
                <div className="bg-brand-dark p-6 text-white flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold">Orçamento Inteligente</h2>
                        <p className="text-sm text-gray-400">Passo {step === 'SERVICE' ? '1' : step === 'DETAILS' ? '2' : '3'} de 3</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-8">

                    {/* STEP 1: SERVICE */}
                    {step === 'SERVICE' && (
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Qual serviço você precisa?</h3>
                            <div className="grid grid-cols-1 gap-4">
                                {[
                                    { id: 'Terraplenagem', icon: Truck, label: 'Terraplenagem / Nivelamento' },
                                    { id: 'Demolicao', icon: Hammer, label: 'Demolição / Limpeza' },
                                    { id: 'Locacao', icon: Truck, label: 'Locação de Máquina' }
                                ].map((s) => (
                                    <button
                                        key={s.id}
                                        onClick={() => {
                                            setFormData({ ...formData, serviceType: s.id });
                                            setStep('DETAILS');
                                        }}
                                        className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all hover:scale-[1.02] ${formData.serviceType === s.id ? 'border-brand-yellow bg-yellow-50' : 'border-gray-100 hover:border-brand-yellow/50'}`}
                                    >
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${formData.serviceType === s.id ? 'bg-brand-yellow text-black' : 'bg-gray-100 text-gray-500'}`}>
                                            <s.icon size={24} />
                                        </div>
                                        <span className="font-bold text-lg text-gray-800">{s.label}</span>
                                        <ChevronRight className="ml-auto text-gray-300" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* STEP 2: DETAILS */}
                    {step === 'DETAILS' && (
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Detalhes da Obra</h3>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                        <MapPin size={16} /> Cidade da Obra
                                    </label>
                                    <select
                                        className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-yellow outline-none bg-white"
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    >
                                        <option value="">Selecione...</option>
                                        <option value="SJC">São José dos Campos</option>
                                        <option value="Jacarei">Jacareí</option>
                                        <option value="Cacapava">Caçapava</option>
                                        <option value="Taubate">Taubaté</option>
                                        <option value="Outra">Outra</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                        <Clock size={16} /> Urgência
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {['Imediato', 'Próxima Semana', 'Só Cotando'].map((opt) => (
                                            <button
                                                key={opt}
                                                onClick={() => setFormData({ ...formData, urgency: opt })}
                                                className={`p-3 rounded-xl border text-sm font-medium transition-colors ${formData.urgency === opt ? 'bg-brand-dark text-white border-brand-dark' : 'bg-white border-gray-200 hover:border-gray-400'}`}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-between">
                                <button onClick={handleBack} className="text-gray-500 font-medium px-4 py-2 hover:bg-gray-100 rounded-lg">Voltar</button>
                                <button
                                    onClick={handleNext}
                                    disabled={!formData.city || !formData.urgency}
                                    className="bg-brand-yellow text-black px-6 py-2 rounded-lg font-bold disabled:opacity-50 hover:scale-105 transition-transform"
                                >
                                    Continuar
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: CONTACT */}
                    {step === 'CONTACT' && (
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">Finalizar Pedido</h3>
                            <p className="text-center text-gray-500 mb-6 text-sm">Receba seu orçamento detalhado via WhatsApp.</p>

                            <div className="space-y-4">
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Seu Nome"
                                        className="w-full pl-12 p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-yellow outline-none bg-gray-50"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="relative">
                                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="tel"
                                        placeholder="Seu WhatsApp (com DDD)"
                                        className="w-full pl-12 p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-yellow outline-none bg-gray-50"
                                        value={formData.whatsapp}
                                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="mt-8">
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading || !formData.name || !formData.whatsapp}
                                    className="w-full bg-green-600 text-white p-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                                >
                                    {loading ? 'Enviando...' : 'Receber Orçamento no Zap'}
                                </button>
                                <div className="mt-4 flex justify-center">
                                    <button onClick={handleBack} className="text-gray-400 text-sm hover:text-gray-600">Voltar</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SUCCESS */}
                    {step === 'SUCCESS' && (
                        <div className="text-center py-8">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                                <CheckCircle2 size={40} className="text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Quase lá!</h3>
                            <p className="text-gray-600">Estamos redirecionando você para o WhatsApp de um engenheiro...</p>
                        </div>
                    )}

                </div>

                {/* Progress Bar */}
                <div className="h-2 bg-gray-100 w-full absolute bottom-0">
                    <div
                        className="h-full bg-brand-yellow transition-all duration-300"
                        style={{ width: step === 'SERVICE' ? '33%' : step === 'DETAILS' ? '66%' : '100%' }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
