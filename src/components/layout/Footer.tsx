import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import LogoImg from '@/assets/logo.png';

export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-brand-dark text-gray-300 pt-16 pb-8 border-t border-brand-yellow/20">
            <div className="container-custom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                {/* Column 1: Sobre */}
                <div>
                    <div className="flex items-center gap-2 mb-6">
                        <div className="relative w-56 h-24">
                            <Image
                                src={LogoImg}
                                alt="Divino Locações"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                    <p className="text-sm leading-relaxed mb-6 text-gray-400">
                        Especialistas em locação de máquinas pesadas e terraplenagem em São José dos Campos e região. Qualidade e agilidade para sua obra.
                    </p>
                    <div className="flex gap-4">
                        <Link href="#" className="hover:text-brand-yellow transition-colors"><Instagram className="w-5 h-5" /></Link>
                        <Link href="#" className="hover:text-brand-yellow transition-colors"><Facebook className="w-5 h-5" /></Link>
                    </div>
                </div>

                {/* Column 2: Frota */}
                <div>
                    <h3 className="font-bold text-white mb-6 border-b border-gray-700 pb-2 inline-block">Nossa Frota</h3>
                    <ul className="space-y-3 text-sm">
                        <li><Link href="/frota/escavadeira" className="hover:text-brand-yellow transition-colors">Escavadeiras Hidráulicas</Link></li>
                        <li><Link href="/frota/retroescavadeira" className="hover:text-brand-yellow transition-colors">Retroescavadeiras</Link></li>
                        <li><Link href="/frota/rolo-compactador" className="hover:text-brand-yellow transition-colors">Rolos Compactadores</Link></li>
                        <li><Link href="/frota/bobcat" className="hover:text-brand-yellow transition-colors">Bobcats (Mini Carregadeiras)</Link></li>
                        <li><Link href="/frota/caminhao" className="hover:text-brand-yellow transition-colors">Caminhões Basculantes</Link></li>
                    </ul>
                </div>

                {/* Column 3: Serviços */}
                <div>
                    <h3 className="font-bold text-white mb-6 border-b border-gray-700 pb-2 inline-block">Serviços</h3>
                    <ul className="space-y-3 text-sm">
                        <li><Link href="/servicos/terraplenagem" className="hover:text-brand-yellow transition-colors">Terraplenagem Completa</Link></li>
                        <li><Link href="/servicos/demolicao" className="hover:text-brand-yellow transition-colors">Demolição</Link></li>
                        <li><Link href="/servicos/limpeza" className="hover:text-brand-yellow transition-colors">Limpeza de Terrenos</Link></li>
                        <li><Link href="/lp/transporte-pesado" className="hover:text-brand-yellow transition-colors">Transporte de Máquinas</Link></li>
                        <li><Link href="/servicos/aterro" className="hover:text-brand-yellow transition-colors">Aterro e Desaterro</Link></li>
                    </ul>
                </div>

                {/* Column 4: Contato */}
                <div>
                    <h3 className="font-bold text-white mb-6 border-b border-gray-700 pb-2 inline-block">Contato</h3>
                    <ul className="space-y-4 text-sm">
                        <li className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-brand-yellow mt-0.5 shrink-0" />
                            <span>Rua Coronel Gonçalves, 110<br />Eugênio de Melo, SJC - SP</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-brand-yellow shrink-0" />
                            <span>(12) 3905-3113</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-brand-yellow shrink-0" />
                            <span>contato@divinolocacoes.com.br</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="container-custom pt-8 border-t border-gray-800 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                <p>&copy; {year} Divino Locações e Terraplenagem. Todos os direitos reservados.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <Link href="/politica-privacidade" className="hover:text-white">Política de Privacidade</Link>
                    <Link href="/termos" className="hover:text-white">Termos de Uso</Link>
                </div>
            </div>
        </footer>
    );
}
