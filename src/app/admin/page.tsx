import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { SalesChart, LeadsChart } from '@/components/admin/AdminCharts';
import KanbanBoard from '@/components/admin/KanbanBoard';
import { Search, Bell, Calendar } from 'lucide-react';

export const metadata = {
    title: 'Gestão de Leads | Divino Locações',
};

export default function AdminPage() {
    return (
        <div className="flex min-h-screen bg-gray-50 font-sans">
            <AdminSidebar />

            <main className="flex-1 md:ml-64 p-8">
                {/* Header */}
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-2xl font-bold text-brand-dark mb-1">Dashboard de Vendas</h1>
                        <p className="text-gray-500 text-sm">Bem-vindo de volta, Administrador.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block">
                            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Buscar leads..."
                                className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-yellow/50 w-64 text-sm"
                            />
                        </div>
                        <button className="relative w-10 h-10 bg-white rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:text-brand-dark hover:shadow-md transition-all">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <button className="w-10 h-10 bg-brand-dark text-white rounded-xl flex items-center justify-center shadow-lg hover:bg-black transition-colors">
                            <div className="text-xs font-bold">AD</div>
                        </button>
                    </div>
                </header>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                    {/* Sales Chart */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-gray-800">Receita Recorrente - 2024</h3>
                            <button className="flex items-center gap-2 text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg hover:bg-gray-100">
                                <Calendar className="w-3 h-3" /> Este Ano
                            </button>
                        </div>
                        <SalesChart />
                    </div>

                    {/* Leads Summary */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
                        <div>
                            <h3 className="font-bold text-gray-800 mb-6">Novos Leads (Semanal)</h3>
                            <LeadsChart />
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-50">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-500 text-sm">Taxa de Conversão</span>
                                <span className="text-green-500 font-bold text-sm">+2.4%</span>
                            </div>
                            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-brand-dark h-full w-[65%] rounded-full"></div>
                            </div>
                            <div className="mt-2 text-right text-xs font-medium text-gray-400">65% da meta</div>
                        </div>
                    </div>
                </div>

                {/* Kanban Section */}
                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-brand-dark">Pipeline de Negociações</h2>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 bg-brand-yellow text-brand-dark text-sm font-bold rounded-xl hover:bg-yellow-400 transition-colors shadow-sm">
                                + Novo Lead
                            </button>
                        </div>
                    </div>
                    <KanbanBoard />
                </section>
            </main>
        </div>
    );
}
