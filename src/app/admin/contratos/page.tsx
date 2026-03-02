import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { FileText, Search } from 'lucide-react';

export const metadata = {
    title: 'Contratos | Divino Admin',
};

export default function ContratosPage() {
    return (
        <div className="flex min-h-screen bg-gray-50 font-sans">
            <AdminSidebar />
            <main className="flex-1 md:ml-64 p-8">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-2xl font-bold text-brand-dark mb-1">Gestão de Contratos</h1>
                        <p className="text-gray-500 text-sm">Gerencie e visualize os contratos ativos.</p>
                    </div>
                    <button className="px-4 py-2 bg-brand-dark text-white rounded-xl font-bold text-sm shadow opacity-50 cursor-not-allowed">
                        Novo Contrato (Em Breve)
                    </button>
                </header>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FileText className="w-10 h-10 text-gray-300" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Nenhum contrato encontrado</h2>
                    <p className="text-gray-500 max-w-md mx-auto">
                        O módulo de gestão de contratos está sendo implementado. Em breve você poderá gerar e assinar contratos digitalmente aqui.
                    </p>
                </div>
            </main>
        </div>
    );
}
