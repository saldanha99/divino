'use client';

import React, { useState, useEffect } from 'react';
import { createInstance, connectInstance, logoutInstance, getWhatsappInstance } from '@/actions/whatsapp';
import { Loader2, QrCode, Smartphone, Trash2, CheckCircle, RefreshCcw } from 'lucide-react';

export default function WhatsappConnection() {
    const [instance, setInstance] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [instanceNameInput, setInstanceNameInput] = useState('');
    const [status, setStatus] = useState('CHECKING'); // CHECKING, DISCONNECTED, CONNECTED

    useEffect(() => {
        loadInstance();
    }, []);

    async function loadInstance() {
        setLoading(true);
        try {
            const data = await getWhatsappInstance();
            if (data) {
                setInstance(data);
                setStatus(data.status === 'CONNECTED' ? 'CONNECTED' : 'DISCONNECTED');
                if (data.status !== 'CONNECTED') {
                    // Try to fetch QR code immediately if not connected
                    fetchQrCode(data.instanceName);
                }
            } else {
                setStatus('NO_INSTANCE');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function handleCreateInstance() {
        if (!instanceNameInput) return;
        setLoading(true);
        try {
            const result = await createInstance(instanceNameInput);
            if (result.success) {
                // Determine the correct instance name from result or input
                const name = result.data?.instance?.instanceName || instanceNameInput;
                // Refresh list
                await loadInstance();
            } else {
                alert('Erro ao criar instância: ' + result.error);
                setLoading(false);
            }
        } catch (error) {
            alert('Erro inesperado');
            setLoading(false);
        }
    }

    async function fetchQrCode(name: string) {
        const result = await connectInstance(name);
        if (result.success) {
            if (result.status === 'CONNECTED') {
                setStatus('CONNECTED');
                setQrCode(null);
            } else if (result.qrcode) {
                setQrCode(result.qrcode);
            }
        }
    }

    async function handleDelete() {
        if (!confirm('Tem certeza que deseja desconectar?')) return;
        if (!instance) return;

        setLoading(true);
        await logoutInstance(instance.instanceName);
        setInstance(null);
        setQrCode(null);
        setStatus('NO_INSTANCE');
        setLoading(false);
    }

    if (loading && status === 'CHECKING') {
        return <div className="p-8 text-center text-gray-500">Carregando status do WhatsApp...</div>;
    }

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-100 rounded-full text-green-600">
                    <Smartphone className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Conexão WhatsApp</h2>
                    <p className="text-sm text-gray-500">Gerencie a conexão da sua instância Evolution API</p>
                </div>
            </div>

            {status === 'NO_INSTANCE' && (
                <div className="space-y-4">
                    <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 text-yellow-800 text-sm">
                        Nenhuma instância configurada. Crie uma para começar.
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Nome da Instância (ex: divino-admin)"
                            className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={instanceNameInput}
                            onChange={(e) => setInstanceNameInput(e.target.value)}
                        />
                        <button
                            onClick={handleCreateInstance}
                            disabled={loading}
                            className="bg-green-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-green-700 disabled:opacity-50 transition-colors"
                        >
                            {loading ? <Loader2 className="animate-spin w-5 h-5 mx-auto" /> : 'Criar e Conectar'}
                        </button>
                    </div>
                </div>
            )}

            {status === 'CONNECTED' && (
                <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Conectado!</h3>
                    <p className="text-gray-500 mb-6">Sua instância <strong>{instance?.instanceName}</strong> está ativa e pronta para enviar mensagens.</p>

                    <button
                        onClick={handleDelete}
                        className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center justify-center gap-2 mx-auto"
                    >
                        <Trash2 className="w-4 h-4" /> Desconectar
                    </button>
                </div>
            )}

            {(status === 'DISCONNECTED' || (instance && !qrCode && status !== 'CONNECTED')) && !qrCode && (
                <div className="text-center py-8">
                    <p className="mb-4 text-gray-600">Instância criada, mas não conectada.</p>
                    <button
                        onClick={() => fetchQrCode(instance.instanceName)}
                        disabled={loading}
                        className="bg-brand-dark text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto"
                    >
                        <RefreshCcw className="w-4 h-4" /> Gerar QR Code
                    </button>
                    <div className="mt-4">
                        <button
                            onClick={handleDelete}
                            className="text-red-500 text-sm"
                        >
                            Remover Instância
                        </button>
                    </div>
                </div>
            )}

            {qrCode && status !== 'CONNECTED' && (
                <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                    <div className="bg-white p-4 rounded-xl border-2 border-green-500 shadow-lg mb-4">
                        <img src={qrCode} alt="QR Code WhatsApp" className="w-64 h-64" />
                    </div>
                    <p className="text-center text-gray-600 max-w-xs mb-4">
                        Abra o WhatsApp no seu celular, vá em <strong>Aparelhos Conectados {'>'} Conectar Aparelho</strong> e escaneie o código acima.
                    </p>
                    <button
                        onClick={() => fetchQrCode(instance.instanceName)}
                        className="text-sm text-green-600 font-medium hover:underline mb-6"
                    >
                        Atualizar QR Code
                    </button>
                    <button
                        onClick={handleDelete}
                        className="text-gray-400 hover:text-red-500 text-sm flex items-center gap-1"
                    >
                        <Trash2 className="w-3 h-3" /> Cancelar
                    </button>
                </div>
            )}
        </div>
    );
}
