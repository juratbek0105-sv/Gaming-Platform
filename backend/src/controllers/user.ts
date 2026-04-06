import { FastifyReply, FastifyRequest } from 'fastify'
import { UpdateProfileInput } from '../schemas/user'

export const getMeHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    const user = await request.server.prisma.user.findUnique({
        where: { id: (request.user as any).id }
    })
    return reply.send(user)
}

export const getProfileHandler = async (request: FastifyRequest<{ Params: { username: string } }>, reply: FastifyReply) => {
    const { username } = request.params
    const user = await request.server.prisma.user.findUnique({
        where: { username },
        include: {
            _count: {
                select: { followers: true, following: true, posts: true }
            }
        }
    })

    if (!user) return reply.status(404).send({ message: 'Foydalanuvchi topilmadi' })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...safeUser } = user
    return reply.send(safeUser)
}

export const updateProfileHandler = async (request: FastifyRequest<{ Body: UpdateProfileInput }>, reply: FastifyReply) => {
    const userId = (request.user as any).id
    const data = request.body

    const updatedUser = await request.server.prisma.user.update({
        where: { id: userId },
        data
    })

    return reply.send(updatedUser)
}
