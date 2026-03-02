
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const leads = await prisma.lead.findMany({
            orderBy: { createdAt: 'desc' },
            take: 5
        });
        console.log('--- Last 5 Leads ---');
        leads.forEach(l => {
            console.log(`ID: ${l.id} | Name: ${l.name} | Phone: '${l.contact}' | Status: ${l.status} | Created: ${l.createdAt}`);
        });
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
