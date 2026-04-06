import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { createPostHandler, getFeedHandler, toggleLikeHandler, addCommentHandler } from '../controllers/post'
import { createPostSchema, createCommentSchema } from '../schemas/post'

async function postRoutes(server: FastifyInstance) {
    // Public Feed
    server.get('/', getFeedHandler)

    // Protected routes
    server.register(async (protectedRoutes) => {
        protectedRoutes.addHook('preHandler', async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                await request.jwtVerify()
            } catch (err) {
                reply.send(err)
            }
        })

        protectedRoutes.post('/', { schema: { body: createPostSchema } }, createPostHandler)
        protectedRoutes.post('/:id/like', toggleLikeHandler)
        protectedRoutes.post('/:id/comment', { schema: { body: createCommentSchema } }, addCommentHandler)
    })
}

export default postRoutes
