import { FastifyReply, FastifyRequest } from 'fastify'
import bcrypt from 'bcryptjs'
import { RegisterInput, LoginInput } from '../schemas/auth'

export const registerHandler = async (request: FastifyRequest<{ Body: RegisterInput }>, reply: FastifyReply) => {
    const { username, email, password } = request.body
    const prisma = request.server.prisma

    // Check if exists
    const existingUser = await prisma.user.findFirst({
        where: { OR: [{ email }, { username }] }
    })

    if (existingUser) {
        return reply.status(400).send({ message: 'Email yoki foydalanuvchi nomi allaqachon mavjud' })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data: {
            username,
            email,
            passwordHash,
        }
    })

    const token = request.server.jwt.sign({ id: user.id, username: user.username })

    return reply.status(201).send({
        user: { id: user.id, username: user.username, email: user.email },
        token
    })
}

export const loginHandler = async (request: FastifyRequest<{ Body: LoginInput }>, reply: FastifyReply) => {
    const { email, password } = request.body
    const prisma = request.server.prisma

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
        return reply.status(401).send({ message: 'Email yoki parol noto\'g\'ri' })
    }

    const token = request.server.jwt.sign({ id: user.id, username: user.username })

    return reply.send({
        user: { id: user.id, username: user.username, email: user.email, avatar: user.avatar },
        token
    })
}
