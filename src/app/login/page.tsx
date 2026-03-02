'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Construction } from 'lucide-react';

export default function LoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app password would be securely stored and hashed.
        // For simple local protection, this constant check is used.
        if (password === 'divino2024') {
            localStorage.setItem('divino_auth', 'true');
            router.push('/admin');
        } else {
            setError('Senha incorreta. Tente novamente.');
        }
    };

    return (
        <div className="min-h-screen bg-[#F2F2F7] flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl border border-gray-200">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-brand-yellow rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                        <Construction className="w-10 h-10 text-black" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Divino Locações</h1>
                    <p className="text-gray-500">Painel Administrativo</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Senha de Acesso
                        </label>
                        <div className="relative">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-yellow focus:border-transparent outline-none transition-all"
                                placeholder="Digite a senha..."
                                required
                            />
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        </div>
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm font-medium animate-shake">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full py-4 bg-brand-yellow hover:bg-black hover:text-white text-black font-bold rounded-xl transition-all shadow-md active:scale-[0.98]"
                    >
                        Entrar no Sistema
                    </button>

                    <p className="text-center text-xs text-gray-400 mt-4">
                        Acesso restrito para administradores.
                    </p>
                </form>
            </div>
        </div>
    );
}
