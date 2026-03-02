const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const LOCAL_IMAGES = [
    '/images/blog/img1.jpg',
    '/images/blog/img2.jpg',
    '/images/blog/img3.jpg',
    '/images/blog/img4.jpg'
];

async function main() {
    console.log('🔄 Cleaning up Blog Posts with Local Images...');

    const posts = await prisma.blogPost.findMany({
        orderBy: { publishedAt: 'desc' }
    });

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        console.log(`Checking post: ${post.title}`);

        let newContent = post.content;
        let needsUpdate = false;
        let newCoverImage = post.coverImage;

        // 1. Remove Placeholders
        if (newContent.includes('{{CTA_BUTTON}}') || newContent.includes('{{AD_BANNER}}')) {
            console.log(`  - Removing placeholders...`);
            newContent = newContent.replace(/{{CTA_BUTTON}}/g, '');
            newContent = newContent.replace(/{{AD_BANNER}}/g, '');
            needsUpdate = true;
        }

        // 2. Remove Lorem Ipsum (More aggressive)
        if (newContent.includes('Lorem ipsum') || newContent.includes('dolor sit amet')) {
            console.log(`  - Removing Lorem Ipsum...`);
            newContent = newContent.replace(/Lorem ipsum[\s\S]*?(\.|\?|!)/gi,
                '<p>Para saber mais sobre como otimizar sua obra com os equipamentos certos, entre em contato com nossa equipe técnica.</p>');
            needsUpdate = true;
        }

        // 3. Assign Local Cover Image (Distribution)
        // We want to replace non-local images or just enforce local ones for consistency if requested
        // User said "Use the images I sent".
        // Let's check if current cover is already one of ours. If not, replace.
        const assignedCover = LOCAL_IMAGES[i % LOCAL_IMAGES.length];
        if (post.coverImage !== assignedCover) {
            // Only replace if it's not already a valid local image we just set
            // Or if it's an external URL we want to kill.
            // Let's just enforce the cycle to be safe and uniform.
            console.log(`  - Updating Cover Image to ${assignedCover}`);
            newCoverImage = assignedCover;
            needsUpdate = true;
        }

        // 4. Inject Body Image (Cyclic, different from cover)
        if (!newContent.includes('<img') && !newContent.includes('<figure')) {
            console.log(`  - Injecting body image...`);
            const bodyImage = LOCAL_IMAGES[(i + 2) % LOCAL_IMAGES.length]; // Offset to avoid same as cover

            // Insert after first paragraph closure
            newContent = newContent.replace('</p>', `</p><figure class="my-8"><img src="${bodyImage}" alt="Obra em andamento" class="rounded-2xl shadow-lg w-full h-96 object-cover" /></figure>`);
            needsUpdate = true;
        }

        if (needsUpdate) {
            await prisma.blogPost.update({
                where: { id: post.id },
                data: {
                    content: newContent,
                    coverImage: newCoverImage
                }
            });
            console.log(`  ✅ Updated post: ${post.title}`);
        } else {
            console.log(`  ✨ Post clean.`);
        }
    }

    console.log('🎉 Cleanup finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
