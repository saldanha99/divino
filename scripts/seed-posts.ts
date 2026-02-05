
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const TITLES = [
    "Dicas de Terraplenagem em SJC",
    "Melhores Máquinas para Demolição",
    "Como Escolher o Rolo Compactador Ideal",
    "Tendências de Construção Civil 2024",
    "Manutenção de Escavadeiras Hidráulicas",
    "Licenciamento Ambiental para Obras",
    "Top 5 Retroescavadeiras do Mercado",
    "Drenagem de Terrenos Alagadiços",
    "Custo de Locação vs Compra de Máquinas",
    "Segurança em Canteiros de Obra",
    "Pavimentação Asfáltica: CBUQ ou Frio?",
    "Terraplenagem para Condomínios",
    "Demolição Controlada: O que é?",
    "Transporte de Máquinas Pesadas",
    "Gestão de Frota de Caminhões",
    "Sustentabilidade na Construção Civil",
    "Reforma de Estradas Rurais",
    "Nivelamento de Terreno com Laser",
    "Operador de Máquinas: Profissão em Alta",
    "O Futuro da Obra Inteligente",
    "Limpeza de Terreno: Cuidados Essenciais"
];

const IMAGES = [
    "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=1000",
    "https://images.unsplash.com/photo-1547628642-53697e884144?q=80&w=1000",
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000",
    "https://images.unsplash.com/photo-1588619461332-445326514d3d?q=80&w=1000",
    "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1000"
];

async function main() {
    console.log('Seeding fake blog posts...');

    // Clear existing (optional, but good for idempotency if simple)
    await prisma.blogPost.deleteMany();

    for (let i = 0; i < 20; i++) {
        const title = TITLES[i] || `Artigo Extra ${i}`;
        const slug = title.toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-');

        // Random check if exists
        const exists = await prisma.blogPost.findUnique({ where: { slug } });
        if (exists) continue;

        await prisma.blogPost.create({
            data: {
                title,
                slug,
                excerpt: `Aprenda tudo sobre ${title} neste guia completo para sua obra. Dicas valiosas para economizar e ganhar eficiência.`,
                content: generateLongContent(title),
                coverImage: IMAGES[i % IMAGES.length],
                publishedAt: new Date(Date.now() - i * 86400000) // 1 day back each
            }
        });
        console.log(`Created: ${title}`);
    }
}

function generateLongContent(title: string): string {
    const intro = `
        <h2>Introdução Completa sobre ${title}</h2>
        <p>No cenário atual da construção civil e infraestrutura, dominar o conceito de <strong>${title}</strong> é mais do que um diferencial, é uma necessidade imperativa para gestores, engenheiros e investidores que buscam eficiência, segurança e otimização de custos. Neste artigo abrangente, com mais de 1500 palavras, vamos mergulhar fundo em todos os aspectos técnicos, operacionais e estratégicos que envolvem este tema.</p>
        <p>A Divino Locações, com sua vasta experiência em locação de equipamentos pesados e execução de obras de terraplenagem em São José dos Campos e região, preparou este material exclusivo para você.</p>
    `;

    const section1 = `
        <h2>1. Contexto Histórico e Evolução</h2>
        <p>Historicamente, o ${title} evoluiu de processos manuais e rudimentares para operações altamente mecanizadas e tecnologicamente avançadas. Nas últimas décadas, vimos a introdução de sistemas de telemetria, nivelamento a laser e motores mais eficientes que mudaram radicalmente a produtividade no canteiro de obras.</p>
        <p>Entender essa evolução é crucial para não aplicar métodos obsoletos em obras modernas. O mercado exige rapidez, e a tecnologia embarcada nas máquinas atuais - como as que possuímos em nossa frota - permite entregar resultados em metade do tempo comparado a métodos tradicionais.</p>
        <p>Além disso, a capacitação dos operadores acompanhou essa evolução. Hoje, um operador não apenas manuseia alavancas, mas interpreta painéis digitais, planos de corte em 3D e realiza diagnósticos básicos do equipamento em tempo real.</p>
    `;

    const adBanner1 = `{{AD_BANNER}}`;

    const section2 = `
        <h2>2. Principais Desafios Técnicos</h2>
        <p>Ao lidar com ${title}, os desafios são inúmeros. O primeiro deles é a variação geológica. Em regiões como o Vale do Paraíba, encontramos desde solos argilosos até terrenos rochosos que exigem implementos específicos, como rompedores hidráulicos ou caçambas reforçadas.</p>
        <p>Outro desafio é a logística. Mobilizar equipamentos pesados requer planejamento de transporte (pranchas), licenças especiais e cronogramas ajustados para evitar ociosidade. Uma máquina parada é prejuízo certo. Por isso, a locação com uma empresa que garante manutenção preventiva em dia é vital.</p>
        <p>A segurança do trabalho também é um pilar inegociável. Operações envolvendo ${title} frequentemente interagem com trabalhadores de solo e outras máquinas, exigindo isolamento de área e comunicação via rádio constante. Ignorar esses protocolos pode levar a acidentes graves.</p>
        <p>Por fim, a gestão de resíduos. A movimentação de terra ou demolição gera volumes imensos de material que precisam de destinação correta com CTR (Controle de Transporte de Resíduos), evitando passivos ambientais para o contratante.</p>
    `;

    const section3 = `
        <h2>3. Análise de Custo-Benefício</h2>
        <p>Muitos clientes nos perguntam: vale mais a pena comprar ou alugar? Quando analisamos o ${title}, a conta deve considerar não apenas o valor do equipamento, mas a depreciação, custos de manutenção, seguro, operador e armazenamento.</p>
        <p>Para obras pontuais ou de médio prazo (até 12 meses), a locação se mostra invariavelmente mais vantajosa. Você elimina o custo fixo do ativo parado e garante sempre uma máquina moderna. Em contrapartida, a compra só se justifica para construtoras com demanda contínua e oficina própria estruturada.</p>
        <p>Estudos indicam que a locação pode reduzir o capital imobilizado em até 40%, liberando fluxo de caixa para compra de insumos e mão de obra, que são os verdadeiros gargalos de muitas obras.</p>
    `;

    const ctaButton = `{{CTA_BUTTON}}`;

    const section4 = `
        <h2>4. Melhores Práticas de Execução</h2>
        <p>Para garantir a excelência em ${title}, seguimos um checklist rigoroso:</p>
        <ul>
            <li><strong>Planejamento Topográfico:</strong> Nunca inicie sem as cotas definidas.</li>
            <li><strong>Seleção do Equipamento:</strong> Não use uma escavadeira de 20 toneladas para um serviço que uma mini-escavadeira faria com mais agilidade e menor consumo.</li>
            <li><strong>Manutenção Diária:</strong> Check-list de óleos, fluidos e material rodante antes de cada turno.</li>
            <li><strong>Documentação:</strong> ARTs e laudos técnicos em dia.</li>
        </ul>
        <p>Essas práticas, quando aplicadas consistentemente, reduzem o retrabalho a zero. O retrabalho é o maior inimigo da lucratividade na construção civil.</p>
    `;

    const section5 = `
        <h2>5. O Diferencial da Divino Locações</h2>
        <p>Nossa abordagem para ${title} é consultiva. Não apenas entregamos a máquina, mas ajudamos a dimensionar a frota. Se sua obra atrasar por chuva, negociamos. Se a máquina quebrar (o que é raro devido à nossa preventiva), substituímos em tempo recorde.</p>
        <p>Temos orgulho de ter participado das maiores obras de infraestrutura de São José dos Campos, Jacareí e Taubaté nos últimos anos. Nossa reputação foi construída sobre o pilar da confiabilidade.</p>
    `;

    const filler = Array(10).fill(`
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    `).join('');

    return `
        ${intro}
        ${section1}
        ${adBanner1}
        ${section2}
        ${section3}
        ${ctaButton}
        ${section4}
        ${filler}
        ${section5}
        <p>Esperamos que este guia sobre <strong>${title}</strong> tenha sido útil. Para um orçamento personalizado, clique no botão abaixo ou chame no WhatsApp.</p>
    `;
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
