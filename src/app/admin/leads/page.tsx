import { PrismaClient } from '@prisma/client';
import KanbanBoard from '@/components/admin/KanbanBoard';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

const prisma = new PrismaClient();

export const metadata = {
    title: 'CRM Leads | Divino Admin',
};

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';

export default async function LeadsPage() {
    const leads = await prisma.lead.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans">
            <AdminSidebar />
            <main className="flex-1 md:ml-64 p-8">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-2xl font-bold text-brand-dark mb-1">CRM de Leads</h1>
                        <p className="text-gray-500 text-sm">Gerencie suas oportunidades e negociações.</p>
                    </div>
                </header>

                <KanbanBoard initialLeads={leads} />
            </main>
        </div>
    );
}
