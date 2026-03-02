'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const router = useRouter();

    useEffect(() => {
        const auth = localStorage.getItem('divino_auth');
        if (auth === 'true') {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const login = (password: string) => {
        // Simple password check - in real app use more secure method
        if (password === 'divino2024') {
            localStorage.setItem('divino_auth', 'true');
            setIsAuthenticated(true);
            router.push('/admin');
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem('divino_auth');
        setIsAuthenticated(false);
        router.push('/login');
    };

    return { isAuthenticated, login, logout };
}
