import { AdminSidebar } from '@/components/admin/AdminSidebar';
import WhatsappConnection from '@/components/admin/WhatsappConnection';

export const metadata = {
    title: 'Integração WhatsApp | Divino Locações',
};

export default function WhatsappPage() {
    return (
        <div className="flex min-h-screen bg-gray-50 font-sans">
            <AdminSidebar />

            <main className="flex-1 md:ml-64 p-8">
                <header className="mb-10">
                    <h1 className="text-2xl font-bold text-gray-800 mb-1">Integração WhatsApp</h1>
                    <p className="text-gray-500 text-sm">Gerencie a conexão com a Evolution API para automações.</p>
                </header>

                <WhatsappConnection />
            </main>
        </div>
    );
}
