import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: {
        default: 'Divino Obras e Terraplenagem | Infraestrutura e Locação em SJC',
        template: '%s | Divino Obras',
    },
    description: 'Especialistas em Terraplenagem, Demolição e Locação de Máquinas Pesadas em São José dos Campos. Soluções completas para obras urbanas e rodoviárias.',
    keywords: ['terraplenagem', 'demolição', 'locação de máquinas', 'são josé dos campos', 'obras', 'infraestrutura'],
    authors: [{ name: 'Divino Obras' }],
    creator: 'Divino Obras',
    openGraph: {
        type: 'website',
        locale: 'pt_BR',
        url: 'https://divinolocacoes.com.br',
        title: 'Divino Obras e Terraplenagem | SJC e Vale do Paraíba',
        description: 'Terraplenagem, Demolição e Locação de Máquinas Pesadas. Atendemos SJC, Jacareí e região. Solicite um orçamento.',
        siteName: 'Divino Obras',
        images: [
            {
                url: 'https://blog.divinoterraplanagem.com.br/wp-content/uploads/2026/02/terraplanagem-SJC.png',
                width: 1200,
                height: 630,
                alt: 'Divino Obras e Terraplenagem',
            },
        ],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: '/logo-divino-new.png',
        shortcut: '/logo-divino-new.png',
        apple: '/logo-divino-new.png',
    },
};

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HideOnAdmin } from '@/components/layout/HideOnAdmin';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-BR">
            <body className={inter.className} suppressHydrationWarning={true}>
                <HideOnAdmin><Header /></HideOnAdmin>
                {children}
                <HideOnAdmin><Footer /></HideOnAdmin>
            </body>
        </html>
    );
}
