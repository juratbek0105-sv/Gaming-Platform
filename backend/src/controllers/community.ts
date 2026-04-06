import { FastifyReply, FastifyRequest } from 'fastify'

// Groups
export const getGroupsHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    const groups = await request.server.prisma.group.findMany({
        include: {
            _count: { select: { members: true, posts: true } },
            owner: { select: { username: true, name: true } }
        }
    })
    return reply.send(groups)
}

export const joinGroupHandler = async (request: FastifyRequest<{ Body: { groupId: string } }>, reply: FastifyReply) => {
    const userId = (request.user as any).id
    const { groupId } = request.body
    const prisma = request.server.prisma

    const existing = await prisma.groupMember.findUnique({
        where: { userId_groupId: { userId, groupId } }
    })

    if (existing) return reply.status(400).send({ message: 'Siz allaqachon a\'zosiz' })

    await prisma.groupMember.create({
        data: { userId, groupId }
    })

    return reply.send({ message: 'Guruhga qo\'shildingiz' })
}

// Tournaments
export const getTournamentsHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    const tournaments = await request.server.prisma.tournament.findMany({
        include: {
            _count: { select: { participants: true } }
        }
    })
    return reply.send(tournaments)
}

export const joinTournamentHandler = async (request: FastifyRequest<{ Body: { tournamentId: string } }>, reply: FastifyReply) => {
    const userId = (request.user as any).id
    const { tournamentId } = request.body
    const prisma = request.server.prisma

    const tournament = await prisma.tournament.findUnique({ where: { id: tournamentId } })
    if (!tournament) return reply.status(404).send({ message: 'Turnir topilmadi' })
    if (tournament.status !== 'open') return reply.status(400).send({ message: 'Ro\'yxatdan o\'tish yopilgan' })

    const existing = await prisma.tournamentParticipant.findUnique({
        where: { tournamentId_userId: { tournamentId, userId } }
    })

    if (existing) return reply.status(400).send({ message: 'Siz allaqachon ro\'yxatdan o\'tgansiz' })

    const count = await prisma.tournamentParticipant.count({ where: { tournamentId } })
    if (count >= tournament.maxParticipants) return reply.status(400).send({ message: 'Joy qolmadi' })

    await prisma.tournamentParticipant.create({
        data: { tournamentId, userId }
    })

    return reply.send({ message: 'Turnirga muvaffaqiyatli ro\'yxatdan o\'tdingiz' })
}
