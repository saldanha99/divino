'use client';

export default function AdBanner({ type = 'horizontal' }: { type?: 'horizontal' | 'sidebar' | 'card' }) {
    if (type === 'card') {
        return (
            <div className="bg-gray-100 rounded-[24px] flex flex-col items-center justify-center p-6 text-center h-full border-2 border-dashed border-gray-300">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Publicidade</span>
                <div className="w-full h-32 bg-gray-200 rounded-xl mb-4 animate-pulse"></div>
                <h3 className="text-gray-900 font-bold">Patrocinador Exclusivo</h3>
                <p className="text-sm text-gray-500 mt-2">Sua marca aqui.</p>
            </div>
        );
    }

    if (type === 'sidebar') {
        return (
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 sticky top-24">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-4">Parceiros</span>
                <div className="w-full h-64 bg-gray-200 rounded-xl animate-pulse flex items-center justify-center text-gray-400 font-medium">
                    Space Ad 300x600
                </div>
            </div>
        );
    }

    return (
        <div className="w-full container-custom px-4 my-12">
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-8 flex items-center justify-center border border-gray-300 border-dashed">
                <div className="text-center">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Publicidade</span>
                    <h3 className="text-xl font-bold text-gray-400">Banner Principal (728x90)</h3>
                </div>
            </div>
        </div>
    );
}
