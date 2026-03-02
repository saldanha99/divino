const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const LOCAL_VIDEOS = [
    '/images/blog/img1.webm',
    '/images/blog/img2.webm',
    '/images/blog/img3.webm',
    '/images/blog/img4.webm'
];

async function main() {
    console.log('🎥 Updating Blog Posts to use WebM...');

    const posts = await prisma.blogPost.findMany();

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];

        // Update cover image to use .webm
        // Also update content images
        let newContent = post.content;

        // Replace .jpg with .webm in content
        newContent = newContent.replace(/\/images\/blog\/img(\d+)\.jpg/g, '/images/blog/img$1.webm');

        // Select a cover video
        const coverVideo = LOCAL_VIDEOS[i % LOCAL_VIDEOS.length];

        await prisma.blogPost.update({
            where: { id: post.id },
            data: {
                coverImage: coverVideo,
                content: newContent
            }
        });

        console.log(`  ✅ Updated: ${post.title} -> ${coverVideo}`);
    }
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
