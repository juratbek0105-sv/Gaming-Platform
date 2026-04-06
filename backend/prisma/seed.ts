import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Seeding database...')

    const passwordHash = await bcrypt.hash('password123', 10)

    // 1. Create Users
    const user1 = await prisma.user.upsert({
        where: { username: 'jasur_pro' },
        update: {},
        create: {
            username: 'jasur_pro',
            email: 'jasur@jamoa.uz',
            passwordHash,
            name: 'Jasur Karimov',
            bio: "Pro Valorant Player | Tournament Organizer",
            location: "Toshkent",
            role: 'Duelist / Entry',
            team: 'Team Phoenix',
        }
    })

    const user2 = await prisma.user.upsert({
        where: { username: 'sardor_gg' },
        update: {},
        create: {
            username: 'sardor_gg',
            email: 'sardor@jamoa.uz',
            passwordHash,
            name: 'Sardor Aliyev',
            bio: "CS2 Enthusiast | Skin Collector",
            location: "Samarqand",
            role: 'AWPer',
            team: 'Shadow Squad',
        }
    })

    // 2. Create Groups
    const group1 = await prisma.group.create({
        data: {
            name: 'Valorant Uzbekistan',
            description: 'O\'zbekistonning eng katta Valorant jamoasi',
            ownerId: user1.id,
            members: {
                create: { userId: user1.id, role: 'admin' }
            }
        }
    })

    // 3. Create Tournaments
    await prisma.tournament.create({
        data: {
            name: 'Valorant Championship UZ 2026',
            game: 'Valorant',
            prize: '5,000,000 UZS',
            startDate: new Date('2026-04-15'),
            maxParticipants: 16,
            status: 'open',
        }
    })

    // 4. Create Posts
    await prisma.post.create({
        data: {
            content: 'Hamma salom! Jamoa platformasiga xush kelibsiz! 🎮',
            authorId: user1.id,
        }
    })

    console.log('✅ Seeding complete!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
