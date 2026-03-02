import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Settings, Save } from 'lucide-react';

export const metadata = {
    title: 'Configurações | Divino Admin',
};

export default function SettingsPage() {
    return (
        <div className="flex min-h-screen bg-gray-50 font-sans">
            <AdminSidebar />
            <main className="flex-1 md:ml-64 p-8">
                <header className="mb-10">
                    <h1 className="text-2xl font-bold text-brand-dark mb-1">Configurações</h1>
                    <p className="text-gray-500 text-sm">Preferências gerais do sistema.</p>
                </header>

                <div className="max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-bold text-gray-900 mb-4 border-b pb-2">Informações da Empresa</h3>
                            <div className="grid gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome Fantasia</label>
                                    <input type="text" defaultValue="Divino Locações" className="w-full p-2 border border-gray-200 rounded-lg" disabled />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">CNPJ</label>
                                    <input type="text" defaultValue="XX.XXX.XXX/0001-XX" className="w-full p-2 border border-gray-200 rounded-lg" disabled />
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-900 mb-4 border-b pb-2">Notificações</h3>
                            <div className="flex items-center justify-between py-2">
                                <span className="text-gray-700">Receber alerta de novos leads por e-mail</span>
                                <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer">
                                    <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <span className="text-gray-700">Som de notificação no painel</span>
                                <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer">
                                    <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button className="flex items-center gap-2 bg-brand-dark text-white px-6 py-2 rounded-lg font-bold hover:bg-black transition-colors">
                                <Save className="w-4 h-4" /> Salvar Alterações
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
