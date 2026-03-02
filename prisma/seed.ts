import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const fleetItems = [
  { name: "Escavadeira Hidráulica", category: "Escavadeiras", image: "/images/escavadeira-hidraulica.jpg" },
  { name: "Retroescavadeira", category: "Retroescavadeiras", image: "/images/retroescavadeira.jpg" },
  { name: "Trator Agrícola de Pneu", category: "Tratores", image: "/images/trator-agricola.jpg" },
  { name: "Mini Escavadeira", category: "Compactos", image: "/images/mini-escavadeira.jpg" },
  { name: "Rolo Compactador", category: "Compactação", image: "/images/rolo-compactador.jpg" },
  { name: "Motoniveladora", category: "Nivelamento", image: "/images/motoniveladora.jpeg" },
  { name: "Bobcat", category: "Compactos", image: "/images/bobcat.jpg" },
  { name: "Trator de Esteira", category: "Tratores", image: "/images/trator-esteira.jpg" },
  { name: "Pá Carregadeira", category: "Carregadeiras", image: "/images/pa-carregadeira.jpeg" },
  { name: "Caminhão Basculante", category: "Transporte", image: "/images/caminhao basculante.jpg" },
  { name: "Caminhão Pipa", category: "Transporte", image: "/images/caminhao pipa.jpg" },
  { name: "Grades Aradoras", category: "Acessórios", image: "/images/grade-aradora.jpg" },
  { name: "Carretas e Roçadeiras", category: "Acessórios", image: "/images/carretas-rocadeiras.jpg" },
]

async function main() {
  console.log('Start seeding ...')

  // Clear existing machines to avoid duplicates for this run
  // await prisma.machine.deleteMany()    // Clear existing data to force update with new images
  // await prisma.machine.deleteMany({}); // Optional: uncomment if you want to start fresh

  for (const item of fleetItems) {
    const slug = item.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')

    // Check if exists
    const existing = await prisma.machine.findUnique({
      where: { slug }
    })

    if (existing) {
      // UPDATE if exists to refresh image path
      await prisma.machine.update({
        where: { slug },
        data: {
          images: item.image,
        }
      });
      console.log(`Updated machine: ${item.name}`);
    } else {
      // CREATE if not exists
      await prisma.machine.create({
        data: {
          name: item.name,
          slug,
          model: "Padrão",
          brand: "Diversas",
          category: item.category,
          description: `Locação de ${item.name} para sua obra.`,
          images: item.image,
          status: "AVAILABLE",
        }
      })
      console.log(`Created machine: ${item.name}`);
    }
  }
  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
