import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { MapPin, Calendar, ArrowRight, Building2 } from "lucide-react";

export const metadata = {
    title: 'Portfólio de Obras | Divino Locações',
    description: 'Conheça nossos projetos recentes de terraplenagem, pavimentação e infraestrutura em São José dos Campos e região.',
};

// Mock Data (Replace with Prisma fetch later)
const PROJECTS = [
    {
        id: 1,
        title: "Condomínio Reserva do Vale",
        category: "Terraplenagem e Drenagem",
        location: "Caçapava, SP",
        year: "2024",
        image: "https://images.unsplash.com/photo-1590483005691-f80750bc148b?q=80&w=2670",
        description: "Movimentação de 50.000m³ de terra e execução de 2km de galerias pluviais para novo loteamento residencial."
    },
    {
        id: 2,
        title: "Pavimentação Industrial XYZ",
        category: "Pavimentação Asfáltica",
        location: "São José dos Campos, SP",
        year: "2023",
        image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069",
        description: "Execução de 15.000m² de pavimento reforçado para pátio de carretas e logística."
    },
    {
        id: 3,
        title: "Drenagem Urbana Centro",
        category: "Saneamento",
        location: "Jacareí, SP",
        year: "2023",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2089",
        description: "Instalação de adutoras e rede de esgoto para modernização do centro da cidade."
    },
    {
        id: 4,
        title: "Limpeza de Área Industrial",
        category: "Demolição e Limpeza",
        location: "Taubaté, SP",
        year: "2024",
        image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070",
        description: "Demolição de galpões antigos e limpeza mecanizada de terreno de 30.000m²."
    },
    {
        id: 5,
        title: "Duplicação Rodovia SP-123",
        category: "Obras Viárias",
        location: "Pindamonhangaba, SP",
        year: "2022",
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070",
        description: "Apoio com maquinário e equipe técnica para duplicação de trecho rodoviário."
    },
    {
        id: 6,
        title: "Loteamento Jardim das Flores",
        category: "Infraestrutura Completa",
        location: "Guararema, SP",
        year: "2023",
        image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80",
        description: "Obra chave na mão: abertura de ruas, guias, sarjetas, água, esgoto e asfalto."
    }
];

export default function PortfolioPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-white">
                <div className="absolute inset-0 opacity-30">
                    <AnimatedGridPattern
                        numSquares={30}
                        maxOpacity={0.1}
                        duration={3}
                        repeatDelay={1}
                        className="text-brand-dark/20"
                    />
                </div>

                <div className="container-custom relative z-10 text-center">
                    <span className="text-brand-yellow font-bold tracking-widest uppercase text-sm mb-4 block">Nosso Portfólio</span>
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
                        Obras que Transformam <br />
                        <span className="text-brand-dark">Cidades e Negócios</span>
                    </h1>
                    <p className="text-xl text-gray-500 max-w-3xl mx-auto mb-10 leading-relaxed">
                        Confira abaixo alguns dos projetos realizados pela Divino Obras, entregues com pontualidade e excelência técnica.
                    </p>
                </div>
            </section>

            {/* PROJECTS GRID */}
            <section className="py-20 px-4">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {PROJECTS.map((project) => (
                            <div key={project.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
                                <div className="relative h-64 overflow-hidden">
                                    <div className="absolute inset-0 bg-gray-900/20 group-hover:bg-gray-900/0 transition-colors z-10"></div>
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm flex items-center gap-1">
                                        <Calendar size={12} className="text-brand-yellow" /> {project.year}
                                    </div>
                                    <div className="absolute bottom-4 left-4 z-20">
                                        <span className="bg-brand-dark text-brand-yellow text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                            {project.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-8 flex-1 flex flex-col">
                                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                                        <MapPin size={14} />
                                        <span>{project.location}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-brand-dark transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed mb-6 flex-1 text-sm">
                                        {project.description}
                                    </p>

                                    <div className="mt-auto pt-6 border-t border-gray-100">
                                        <button className="text-brand-dark font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                                            Ver Detalhes <ArrowRight size={16} className="text-brand-yellow" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 bg-brand-dark rounded-3xl p-12 text-center relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Pronto para iniciar sua obra?</h2>
                            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                                Entre em contato com nossa engenharia para uma avaliação técnica gratuita do seu projeto.
                            </p>
                            <Link href="https://wa.me/5512999999999" target="_blank">
                                <Button className="bg-brand-yellow text-black hover:bg-white px-10 py-6 rounded-full text-lg font-bold">
                                    Falar com Engenheiro
                                </Button>
                            </Link>
                        </div>
                        {/* Decorative Pattern */}
                        <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12">
                            <Building2 size={300} text-white />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
