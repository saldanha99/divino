const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const posts = await prisma.blogPost.findMany({
        select: { title: true, coverImage: true },
        take: 5
    });
    console.log(JSON.stringify(posts, null, 2));
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
