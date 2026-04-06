import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { getMeHandler, getProfileHandler, updateProfileHandler } from '../controllers/user'
import { updateProfileSchema } from '../schemas/user'

async function userRoutes(server: FastifyInstance) {
    // Middleware to verify JWT for protected routes
    server.addHook('preHandler', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            await request.jwtVerify()
        } catch (err) {
            reply.send(err)
        }
    })

    server.get('/me', getMeHandler)
    server.patch('/me', { schema: { body: updateProfileSchema } }, updateProfileHandler)

    // Public profile (needs to be outside if we want public access, but for now we put it here)
    server.get('/:username', getProfileHandler)
}

export default userRoutes
