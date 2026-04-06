import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { getGroupsHandler, joinGroupHandler, getTournamentsHandler, joinTournamentHandler } from '../controllers/community'
import { joinGroupSchema, joinTournamentSchema } from '../schemas/community'

async function communityRoutes(server: FastifyInstance) {
    // Public
    server.get('/groups', getGroupsHandler)
    server.get('/tournaments', getTournamentsHandler)

    // Protected
    server.register(async (protectedRoutes) => {
        protectedRoutes.addHook('preHandler', async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                await request.jwtVerify()
            } catch (err) {
                reply.send(err)
            }
        })

        protectedRoutes.post('/groups/join', { schema: { body: joinGroupSchema } }, joinGroupHandler)
        protectedRoutes.post('/tournaments/join', { schema: { body: joinTournamentSchema } }, joinTournamentHandler)
    })
}

export default communityRoutes
