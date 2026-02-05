"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Menu, X, ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button';
import SmartQuoteButton from '../marketing/SmartQuoteButton';
import { usePathname } from 'next/navigation';
import SolutionsMegaMenu from './SolutionsMegaMenu';

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    const pathname = usePathname();
    const isLightPage = pathname?.includes('/servicos/terraplenagem');

    // Hide on Admin
    if (pathname?.startsWith('/admin')) return null;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}
            >
                <div className={`mx-4 md:mx-auto max-w-7xl rounded-2xl transition-all duration-300 ${isScrolled ? 'glass-ios shadow-lg bg-white/80' : 'bg-transparent'}`}>
                    <div className="px-6 h-16 flex items-center justify-between relative">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative w-40 h-20 transition-transform group-hover:scale-105">
                                <Image
                                    src="/logo-divino-new.png"
                                    alt="Divino Obras e Locações"
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 160px, 200px"
                                    priority
                                />
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className={`hidden md:flex items-center gap-8 font-medium text-sm ${isScrolled || isLightPage ? 'text-gray-600' : 'text-gray-200'}`}>
                            <Link href="/" className="hover:text-brand-yellow transition-colors">Home</Link>

                            {/* Mega Menu Trigger */}
                            <div
                                className="relative group h-16 flex items-center"
                                onMouseEnter={() => setIsMegaMenuOpen(true)}
                                onMouseLeave={() => setIsMegaMenuOpen(false)}
                            >
                                <button className={`flex items-center gap-1 hover:text-brand-yellow transition-colors ${isMegaMenuOpen ? 'text-brand-yellow' : ''}`}>
                                    Soluções <ChevronDown size={14} className={`transition-transform duration-300 ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isMegaMenuOpen && (
                                    <SolutionsMegaMenu />
                                )}
                            </div>

                            <Link href="/frota" className="hover:text-brand-yellow transition-colors">Frota</Link>
                            <Link href="/transportes" className="hover:text-brand-yellow transition-colors">Transportes</Link>
                            <Link href="/blog" className="hover:text-brand-yellow transition-colors">Blog</Link>
                            <Link href="/contato" className="hover:text-brand-yellow transition-colors">Contato</Link>
                        </nav>

                        {/* Actions */}
                        <div className="hidden md:flex items-center gap-4">
                            <SmartQuoteButton
                                className={`rounded-full shadow-lg px-6 ${isScrolled ? 'bg-brand-dark text-white' : 'bg-brand-yellow text-black font-bold'}`}
                            >
                                Orçamento
                            </SmartQuoteButton>
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            className={`md:hidden p-2 rounded-full ${isScrolled || isLightPage ? 'text-gray-900 bg-gray-100' : 'text-white bg-white/20 backdrop-blur'}`}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xl md:hidden animate-fade-in" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="absolute right-0 top-0 h-full w-[80%] bg-white p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
                        <div className="flex flex-col space-y-6 mt-20">
                            <h2 className="text-2xl font-bold text-gray-900 px-4">Menu</h2>
                            <div className="flex flex-col space-y-2">
                                <Link href="/" className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 text-gray-700 font-medium">
                                    Home <ChevronRight size={16} className="text-gray-400" />
                                </Link>

                                {/* Mobile Solutions Expansion could be added here, keeping simple link for now */}
                                <Link href="/servicos" className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 text-gray-700 font-medium">
                                    Soluções <ChevronRight size={16} className="text-gray-400" />
                                </Link>

                                {['Frota', 'Transportes', 'Blog', 'Contato'].map((item) => (
                                    <Link
                                        key={item}
                                        href={`/${item.toLowerCase()}`}
                                        className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 text-gray-700 font-medium"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item}
                                        <ChevronRight size={16} className="text-gray-400" />
                                    </Link>
                                ))}
                            </div>
                            <div className="mt-8 px-4">
                                <SmartQuoteButton
                                    className="w-full rounded-xl py-4 text-lg bg-green-600 hover:bg-green-700 text-white shadow-xl shadow-green-600/20"
                                >
                                    WhatsApp
                                </SmartQuoteButton>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

