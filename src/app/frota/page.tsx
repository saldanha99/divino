import Link from "next/link";
import { Button } from "@/components/ui/Button";

// Mock Data (will be replaced by Prisma/Supabase later)
const fleetData = [
    { id: 1, name: "Escavadeira Hidráulica 20T", category: "Escavadeiras", image: "https://images.unsplash.com/photo-1547628642-53697e884144?q=80&w=1000", price: "Sob Consulta" },
    { id: 2, name: "Retroescavadeira 4x4", category: "Retroescavadeiras", image: "https://images.unsplash.com/photo-1563606734792-59530413052b?q=80&w=1000", price: "Sob Consulta" },
    { id: 3, name: "Rolo Compactador Liso", category: "Compactação", image: "https://images.unsplash.com/photo-1579847641267-5435e076722d?q=80&w=1000", price: "Sob Consulta" },
    { id: 4, name: "Mini Carregadeira (Bobcat)", category: "Compactos", image: "https://images.unsplash.com/photo-1627918341620-3375c358055c?q=80&w=1000", price: "Sob Consulta" },
    { id: 5, name: "Caminhão Basculante 14m³", category: "Transporte", image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1000", price: "Sob Consulta" },
];

export const metadata = {
    title: 'Nossa Frota | Divino Locações',
    description: 'Confira nossa frota completa de escavadeiras, retroescavadeiras e caminhões disponíveis para locação em SJC e região.',
};

export default function FleetPage() {
    return (
        <main className="min-h-screen bg-[#F2F2F7] pt-24 pb-20">

            {/* Header Section */}
            <section className="container-custom px-4 mb-16 text-center">
                <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
                    Frota <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-600">Disponível</span>
                </h1>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                    Máquinas modernas, revisadas e operadas por profissionais qualificados. Segurança e eficiência garantidas.
                </p>
            </section>

            {/* Filter Tabs (Visual Only for now) */}
            <div className="container-custom px-4 mb-12">
                <div className="flex flex-wrap justify-center gap-3">
                    {['Todas', 'Escavadeiras', 'Retroescavadeiras', 'Compactação', 'Transporte'].map((cat, i) => (
                        <button
                            key={cat}
                            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${i === 0
                                    ? 'bg-black text-white shadow-lg'
                                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Fleet Grid (Bento Style) */}
            <div className="container-custom px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {fleetData.map((item) => (
                        <div key={item.id} className="group bg-white rounded-[32px] p-4 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col">
                            {/* Image Container */}
                            <div className="h-64 rounded-[24px] overflow-hidden relative mb-6 bg-gray-100">
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{ backgroundImage: `url('${item.image}')` }}
                                ></div>
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-gray-800 shadow-sm border border-gray-100">
                                    {item.category}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="px-2 pb-4 flex-1 flex flex-col">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-brand-yellow-vivid transition-colors">{item.name}</h3>
                                <p className="text-gray-400 text-sm mb-6 flex-1">Ideal para obras de médio e grande porte, com alta capacidade de produção.</p>

                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-400 font-medium uppercase">Diária a partir de</span>
                                        <span className="font-bold text-lg text-gray-900">{item.price}</span>
                                    </div>
                                    <Link href={`https://wa.me/5512999999999?text=Tenho interesse na ${item.name}`}>
                                        <Button className="rounded-full bg-black text-white hover:bg-brand-yellow hover:text-black transition-all shadow-lg px-6 h-12">
                                            Reservar
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <section className="container-custom px-4 mt-24">
                <div className="bg-brand-dark rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-800/50 to-black/80"></div>

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Não achou o que procura?</h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                            Temos parceiros em toda a região. Entre em contato e encontraremos a máquina ideal para sua necessidade.
                        </p>
                        <Link href="/contato">
                            <button className="px-10 py-5 bg-brand-yellow text-black font-bold text-lg rounded-full hover:bg-white transition-all shadow-xl shadow-yellow-500/20">
                                Falar com Consultor
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

        </main>
    );
}
