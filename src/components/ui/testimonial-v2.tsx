"use client";

import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Hammer, HardHat, Building2, Truck, Ruler, CheckCircle2 } from 'lucide-react';

// --- Types ---
interface Testimonial {
    text: string;
    image: string;
    name: string;
    role: string;
    company: string;
}

// --- Data ---
const testimonials: Testimonial[] = [
    {
        text: "A frota da Divino é impecável. Máquinas novas e manutenção em dia garantiram que não tivéssemos nenhuma parada técnica em 4 meses de obra.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Ricardo Silva",
        role: "Engenheiro Civil",
        company: "Construtora Vanguarda"
    },
    {
        text: "A agilidade na entrega dos equipamentos em São José salvou nosso cronograma. O operador enviado era extremamente qualificado.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Mariana Costa",
        role: "Diretora de Obras",
        company: "Incorporadora Santos"
    },
    {
        text: "Parceria sólida há 3 anos. Documentação sempre correta, laudos em dia e atendimento rápido no WhatsApp. Recomendo para grandes obras.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Carlos Mendes",
        role: "Gestor de Contratos",
        company: "Grupo Mendes Engenharia"
    },
    {
        text: "Contratamos a demolição mecanizada e nos surpreendemos com a limpeza e organização. Destinação de resíduos com manifesto 100% legal.",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Fernanda Oliveira",
        role: "Gerente de Projetos",
        company: "Urbanismo Vale"
    },
    {
        text: "Excelente custo-benefício para locação mensal. A retroescavadeira chegou no dia seguinte ao pedido, abastecida e pronta para trabalhar.",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Roberto Almeida",
        role: "Mestre de Obras",
        company: "Almeida Terraplenagem"
    },
    {
        text: "Segurança em primeiro lugar. Os operadores utilizam todos os EPIs e respeitam as normas da obra. Fundamental para nossa certificação ISO.",
        image: "https://images.unsplash.com/photo-1598550874175-4d7112ee7e8e?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Juliana Ferreira",
        role: "Engenheira de Segurança",
        company: "Construtora Padrão"
    },
    {
        text: "Precisávamos de um rolo compactador com urgência em Taubaté. A Divino atendeu no mesmo dia. Logística impressionante.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
        name: "André Souza",
        role: "Proprietário",
        company: "AS Pavimentação"
    },
    {
        text: "O atendimento consultivo fez a diferença. O engenheiro da Divino sugeriu uma máquina menor que fez o serviço mais rápido e barato.",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Carla Nunes",
        role: "Arquiteta",
        company: "Studio Nunes"
    },
    {
        text: "Já aluguei com várias empresas no Vale, mas a Divino é a única que entrega a máquina limpa e revisada toda vez. Zero dor de cabeça.",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Paulo Roberto",
        role: "Empreiteiro",
        company: "PR Construções"
    },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

// --- Sub-Components ---
const TestimonialsColumn = (props: {
    className?: string;
    testimonials: Testimonial[];
    duration?: number;
}) => {
    return (
        <div className={props.className}>
            <motion.ul
                animate={{
                    translateY: "-50%",
                }}
                transition={{
                    duration: props.duration || 10,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                }}
                className="flex flex-col gap-6 pb-6 bg-transparent transition-colors duration-300 list-none m-0 p-0"
            >
                {[
                    ...new Array(2).fill(0).map((_, index) => (
                        <React.Fragment key={index}>
                            {props.testimonials.map(({ text, image, name, role, company }, i) => (
                                <motion.li
                                    key={`${index}-${i}`}
                                    aria-hidden={index === 1 ? "true" : "false"}
                                    tabIndex={index === 1 ? -1 : 0}
                                    className="p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-brand-yellow/30 bg-white transition-all duration-300 cursor-default select-none group"
                                >
                                    <blockquote className="m-0 p-0">
                                        <p className="text-gray-600 leading-relaxed font-normal m-0 mb-6 italic">
                                            "{text}"
                                        </p>
                                        <footer className="flex items-center gap-4">
                                            <img
                                                width={48}
                                                height={48}
                                                src={image}
                                                alt={`Avatar of ${name}`}
                                                className="h-12 w-12 rounded-full object-cover ring-2 ring-gray-100 group-hover:ring-brand-yellow transition-all duration-300"
                                            />
                                            <div className="flex flex-col">
                                                <cite className="font-bold not-italic tracking-tight leading-5 text-gray-900">
                                                    {name}
                                                </cite>
                                                <span className="text-xs font-semibold text-brand-dark uppercase tracking-wide mt-1">
                                                    {role}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {company}
                                                </span>
                                            </div>
                                        </footer>
                                    </blockquote>
                                </motion.li>
                            ))}
                        </React.Fragment>
                    )),
                ]}
            </motion.ul>
        </div>
    );
};

const TestimonialsSection = () => {
    return (
        <section
            aria-labelledby="testimonials-heading"
            className="bg-[#F2F2F7] py-24 relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,193,7,0.05),transparent_40%)]"></div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                    duration: 1.2,
                    ease: [0.16, 1, 0.3, 1],
                }}
                className="container-custom px-4 z-10 relative"
            >
                <div className="flex flex-col items-center justify-center max-w-3xl mx-auto mb-16 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="border border-brand-yellow/30 py-1.5 px-6 rounded-full text-xs font-bold tracking-widest uppercase text-brand-dark bg-brand-yellow/10">
                            O que dizem nossos parceiros
                        </div>
                    </div>

                    <h2 id="testimonials-heading" className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-gray-900">
                        A escolha das grandes <span className="text-brand-yellow-vivid">Construtoras</span> do Vale
                    </h2>
                    <p className="text-xl text-gray-500 leading-relaxed">
                        Mais de 500 obras atendidas em São José dos Campos e região. Veja quem confia na nossa frota e engenharia.
                    </p>
                </div>

                <div
                    className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[740px] overflow-hidden"
                    role="region"
                    aria-label="Depoimentos de Clientes"
                >
                    <TestimonialsColumn testimonials={firstColumn} duration={25} />
                    <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={35} />
                    <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={30} />
                </div>
            </motion.div>
        </section>
    );
};

export default TestimonialsSection;
