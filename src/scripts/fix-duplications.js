const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const REPEATED_TEXT = "Entre em contato conosco para saber mais detalhes sobre este serviço e como podemos ajudar na sua obra.";
const REPEATED_TEXT_VAR_2 = "Para saber mais sobre como otimizar sua obra com os equipamentos certos, entre em contato com nossa equipe técnica.";

async function main() {
    console.log('🧹 Removing Duplicates...');

    const posts = await prisma.blogPost.findMany();

    for (const post of posts) {
        let content = post.content;
        let needsUpdate = false;

        // Check for multiple occurrences of the repeated text
        // We'll split by <p> and filtering
        const originalLength = content.length;

        // Normalize string for checking
        if (content.split(REPEATED_TEXT).length > 2 || content.split(REPEATED_TEXT_VAR_2).length > 2) {
            console.log(`  - Fixing duplicates in: ${post.title}`);

            // Remove ANY occurrence of the repeated strings first
            // We use a regex with global flag
            const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

            const regex1 = new RegExp(`<p>${escapeRegExp(REPEATED_TEXT)}<\/p>`, 'gi');
            const regex2 = new RegExp(`<p>${escapeRegExp(REPEATED_TEXT_VAR_2)}<\/p>`, 'gi');

            content = content.replace(regex1, '');
            content = content.replace(regex2, '');

            // Now append ONE clean CTA at the end (before the last closing tag or just append)
            content += `<p>${REPEATED_TEXT}</p>`;

            needsUpdate = true;
        }

        if (needsUpdate) {
            await prisma.blogPost.update({
                where: { id: post.id },
                data: { content }
            });
            console.log(`  ✅ Cleaned: ${post.title}`);
        }
    }
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
