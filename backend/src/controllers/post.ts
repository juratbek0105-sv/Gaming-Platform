import { FastifyReply, FastifyRequest } from 'fastify'
import { CreatePostInput, CreateCommentInput } from '../schemas/post'

export const createPostHandler = async (request: FastifyRequest<{ Body: CreatePostInput }>, reply: FastifyReply) => {
    const authorId = (request.user as any).id
    const { content, image, groupId } = request.body

    const post = await request.server.prisma.post.create({
        data: {
            content,
            image: image || null,
            authorId,
            groupId: groupId || null,
        },
        include: {
            author: {
                select: { id: true, username: true, name: true, avatar: true }
            }
        }
    })

    return reply.status(201).send(post)
}

export const getFeedHandler = async (request: FastifyRequest<{ Querystring: { username?: string } }>, reply: FastifyReply) => {
    const { username } = request.query
    const prisma = request.server.prisma

    const posts = await prisma.post.findMany({
        where: username ? {
            author: { username }
        } : {},
        orderBy: { createdAt: 'desc' },
        include: {
            author: {
                select: { id: true, username: true, name: true, avatar: true }
            },
            _count: {
                select: { likes: true, comments: true }
            }
        }
    })

    return reply.send(posts)
}

export const toggleLikeHandler = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const userId = (request.user as any).id
    const postId = request.params.id
    const prisma = request.server.prisma

    const existingLike = await prisma.like.findUnique({
        where: {
            postId_userId: { postId, userId }
        }
    })

    if (existingLike) {
        await prisma.like.delete({
            where: {
                postId_userId: { postId, userId }
            }
        })
        return reply.send({ liked: false })
    } else {
        await prisma.like.create({
            data: { postId, userId }
        })
        return reply.send({ liked: true })
    }
}

export const addCommentHandler = async (request: FastifyRequest<{ Params: { id: string }, Body: CreateCommentInput }>, reply: FastifyReply) => {
    const authorId = (request.user as any).id
    const postId = request.params.id
    const { content } = request.body

    const comment = await request.server.prisma.comment.create({
        data: {
            content,
            postId,
            authorId,
        },
        include: {
            author: {
                select: { id: true, username: true, name: true, avatar: true }
            }
        }
    })

    return reply.status(201).send(comment)
}
