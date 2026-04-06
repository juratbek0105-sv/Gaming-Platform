import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import prismaPlugin from './plugins/prisma'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'

const buildApp = async () => {
    const app = Fastify({
        logger: true,
    })

    // Configure Zod
    app.setValidatorCompiler(validatorCompiler)
    app.setSerializerCompiler(serializerCompiler)

    // Register Plugins
    await app.register(cors, {
        origin: '*', // Adjust for production
    })

    await app.register(jwt, {
        secret: process.env.JWT_SECRET || 'supersecretjamoa2026',
    })

    await app.register(prismaPlugin)

    // Error Handler for Zod
    app.setErrorHandler((error: any, request, reply) => {
        if (error.validation) {
            return reply.status(400).send({
                message: 'Ma\'lumotlar noto\'g\'ri formatda',
                errors: error.validation
            })
        }
        reply.send(error)
    })

    // Health check
    app.get('/health', async () => {
        return { status: 'ok', timestamp: new Date().toISOString() }
    })

    // Routes
    await app.register(import('./routes/auth'), { prefix: '/api/auth' })
    await app.register(import('./routes/user'), { prefix: '/api/users' })
    await app.register(import('./routes/post'), { prefix: '/api/posts' })
    await app.register(import('./routes/community'), { prefix: '/api/community' })
    await app.register(import('./routes/upload'), { prefix: '/api/upload' })

    // Static files for uploads
    app.register(import('@fastify/static'), {
        root: require('path').join(__dirname, '../uploads'),
        prefix: '/uploads/',
    })

    return app
}

export default buildApp
