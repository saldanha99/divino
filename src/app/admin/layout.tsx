'use client';

import { useAuth } from './hooks/useAuth';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (isAuthenticated === false) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    if (isAuthenticated === null) {
        return <div className="min-h-screen bg-[#F2F2F7] flex items-center justify-center">Carregando...</div>;
    }

    if (!isAuthenticated) return null;

    return <>{children}</>;
}
