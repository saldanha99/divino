const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const LOCAL_IMAGES = [
    '/images/blog/img1.jpg',
    '/images/blog/img2.jpg',
    '/images/blog/img3.jpg',
    '/images/blog/img4.jpg'
];

async function main() {
    console.log('🖼️ Enriching Blog Posts with MORE Images...');

    const posts = await prisma.blogPost.findMany();

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];

        // We want to reset body images to have a clean slate logic, 
        // but parsing HTML regex is hard. 
        // Let's assuming "cleaning" removes old <figure> tags if we want to re-distribute?
        // User said "remove duplication" before.
        // Let's first strip existing <figure> tags to re-inject properly? 
        // Or just look for paragraphs that don't have images near them.

        // Simpler approach for "Add images": 
        // Split by </p>.
        // Inject image after paragraph 3 and paragraph 7.

        let content = post.content;

        // Remove existing injected figures to avoid dupes/mess
        content = content.replace(/<figure.*?>.*?<\/figure>/g, '');

        const paragraphs = content.split('</p>');
        let newContent = '';
        let imgIndex = (i + 1) % LOCAL_IMAGES.length; // Start with different image than cover

        for (let j = 0; j < paragraphs.length; j++) {
            newContent += paragraphs[j];
            if (j < paragraphs.length - 1) {
                newContent += '</p>'; // Restore closing tag
            }

            // Logic: Inject image after para 2 and para 6 (if they exist)
            if (j === 2 || j === 6) {
                const imgSrc = LOCAL_IMAGES[imgIndex % LOCAL_IMAGES.length];
                newContent += `
<figure class="my-10 relative rounded-3xl overflow-hidden shadow-xl group">
    <img src="${imgSrc}" alt="Imagem ilustrativa ${j}" class="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700" />
</figure>`;
                imgIndex++;
            }
        }

        if (newContent !== post.content) {
            await prisma.blogPost.update({
                where: { id: post.id },
                data: { content: newContent }
            });
            console.log(`  ✅ Enriched: ${post.title}`);
        }
    }
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
