"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    BarChart3,
    Users,
    Truck,
    FileText,
    Settings,
    LogOut,
    LayoutDashboard,
    MessageCircle
} from 'lucide-react';

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: Users, label: 'Leads (CRM)', href: '/admin/leads' },
    { icon: Truck, label: 'Frota', href: '/admin/frota' },
    { icon: FileText, label: 'Contratos', href: '/admin/contratos' },
    { icon: MessageCircle, label: 'WhatsApp', href: '/admin/whatsapp' },
    { icon: Settings, label: 'Configurações', href: '/admin/settings' },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-white h-screen fixed left-0 top-0 border-r border-gray-200 hidden md:flex flex-col z-40">
            <div className="h-20 flex items-center px-8 border-b border-gray-100">
                <div className="w-8 h-8 bg-brand-yellow rounded-lg flex items-center justify-center font-bold text-brand-dark mr-3">
                    DL
                </div>
                <span className="font-bold text-lg text-brand-dark">Divino <span className="text-gray-400">Admin</span></span>
            </div>

            <nav className="flex-1 px-4 py-8 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href || (pathname === '/admin' && item.href === '/admin');
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                ? 'bg-brand-dark text-white shadow-lg shadow-gray-200'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-brand-dark'
                                }`}
                        >
                            <item.icon className={`w-5 h-5 ${isActive ? 'text-brand-yellow' : 'text-gray-400 group-hover:text-brand-dark'}`} />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-gray-100">
                <button className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Sair</span>
                </button>
            </div>
        </aside>
    );
}
