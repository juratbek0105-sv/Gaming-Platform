import { FastifyInstance } from 'fastify'
import { registerHandler, loginHandler } from '../controllers/auth'
import { registerSchema, loginSchema } from '../schemas/auth'

async function authRoutes(server: FastifyInstance) {
    server.post('/register', {
        schema: {
            body: registerSchema
        }
    }, registerHandler)

    server.post('/login', {
        schema: {
            body: loginSchema
        }
    }, loginHandler)
}

export default authRoutes
