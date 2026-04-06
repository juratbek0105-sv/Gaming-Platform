import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import multipart from '@fastify/multipart'
import path from 'path'
import fs from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'util'

const pump = promisify(pipeline)

async function uploadRoutes(server: FastifyInstance) {
    server.register(multipart)

    // Protected upload
    server.post('/image', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            await request.jwtVerify()
        } catch (err) {
            return reply.send(err)
        }

        const data = await request.file()
        if (!data) return reply.status(400).send({ message: 'Fayl tanlanmagan' })

        const filename = `${Date.now()}-${data.filename}`
        const uploadDir = path.join(__dirname, '../../uploads')

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true })
        }

        const filepath = path.join(uploadDir, filename)
        await pump(data.file, fs.createWriteStream(filepath))

        return reply.send({ url: `/uploads/${filename}` })
    })
}

export default uploadRoutes
