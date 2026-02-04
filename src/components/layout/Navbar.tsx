"use client";

import Link from 'next/link';
import { Button } from '../ui/Button'; // We will create a UI button component next

import { usePathname } from 'next/navigation';

export function Navbar() {
    const pathname = usePathname();
    if (pathname.startsWith('/admin')) return null;

    return (
        <nav className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-gray-200/50">
            <div className="container-custom h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-brand-yellow rounded-lg flex items-center justify-center font-bold text-brand-dark transform group-hover:rotate-3 transition-transform">
                        DL
                    </div>
                    <span className="font-bold text-xl tracking-tight text-brand-dark">
                        Divino <span className="text-brand-yellow">Locações</span>
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8 font-medium text-sm text-gray-600">
                    <Link href="/frota" className="hover:text-brand-dark transition-colors">Frota</Link>
                    <Link href="/servicos" className="hover:text-brand-dark transition-colors">Serviços</Link>
                    <Link href="/blog" className="hover:text-brand-dark transition-colors">Blog</Link>
                    <Link href="/admin" className="hover:text-brand-dark transition-colors">Admin</Link>
                </div>

                {/* CTA */}
                <Link
                    href="https://wa.me/5512999999999"
                    className="hidden md:inline-flex items-center justify-center bg-brand-dark text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-800 transition-all hover:scale-105 hover:shadow-lg"
                >
                    Orçamento Rápido
                </Link>
            </div>
        </nav>
    );
}
