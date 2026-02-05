import { PrismaClient } from '@prisma/client';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Plus, Search, Truck, Hammer } from 'lucide-react';
import Image from 'next/image';

const prisma = new PrismaClient();

export const metadata = {
    title: 'Gestão de Frota | Divino Admin',
};

export const dynamic = 'force-dynamic';

export default async function FrotaPage() {
    const machines = await prisma.machine.findMany({
        orderBy: { name: 'asc' }
    });

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans">
            <AdminSidebar />
            <main className="flex-1 md:ml-64 p-8">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-2xl font-bold text-brand-dark mb-1">Gestão de Frota</h1>
                        <p className="text-gray-500 text-sm">Gerencie o maquinário disponível no site.</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-brand-dark text-white rounded-xl hover:bg-black transition-colors shadow-lg">
                        <Plus className="w-5 h-5" />
                        <span className="font-bold text-sm">Nova Máquina</span>
                    </button>
                </header>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex gap-4">
                        <div className="relative flex-1">
                            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Buscar máquinas..."
                                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-yellow/50"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                    <th className="p-4 font-bold border-b border-gray-100">Equipamento</th>
                                    <th className="p-4 font-bold border-b border-gray-100">Categoria</th>
                                    <th className="p-4 font-bold border-b border-gray-100">Status</th>
                                    <th className="p-4 font-bold border-b border-gray-100 text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {machines.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="p-8 text-center text-gray-500">
                                            Nenhuma máquina cadastrada.
                                        </td>
                                    </tr>
                                ) : (
                                    machines.map((machine) => (
                                        <tr key={machine.id} className="hover:bg-gray-50 transition-colors group">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                                                        {machine.images && machine.images[0] ? (
                                                            <img src={machine.images[0]} alt={machine.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <Truck className="w-6 h-6 text-gray-400" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-gray-900">{machine.name}</div>
                                                        <div className="text-xs text-gray-500">{machine.brand} {machine.model}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-sm text-gray-600">
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 font-medium text-xs">
                                                    {machine.category === 'Demolicao' ? <Hammer className="w-3 h-3" /> : <Truck className="w-3 h-3" />}
                                                    {machine.category}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold ${machine.status === 'AVAILABLE' ? 'bg-green-100 text-green-600' :
                                                        machine.status === 'MAINTENANCE' ? 'bg-red-100 text-red-600' :
                                                            'bg-yellow-100 text-yellow-600'
                                                    }`}>
                                                    {machine.status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <button className="text-gray-400 hover:text-brand-dark font-medium text-sm transition-colors">
                                                    Editar
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
