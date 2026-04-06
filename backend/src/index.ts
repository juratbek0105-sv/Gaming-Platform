import buildApp from './app'

const start = async () => {
    const app = await buildApp()
    const port = Number(process.env.PORT) || 5000

    try {
        await app.listen({ port, host: '0.0.0.0' })
        console.log(`🚀 JAMOA Backend running on http://localhost:${port}`)
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}

start()
