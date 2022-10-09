import { createServer } from 'http'
// import { server_secrets } from './config/index.js'
import { logger } from './utils/logger.js'
import { version } from '../package.json'

const express = require('express')
const loaders = require('./loaders')
const config = require('config')

async function startServer() {
    const app = express()

    // ! ➡️ Create Server
    const httpServer = createServer(app)

    // ! Start Express
    await loaders({ expressApp: app })

    // ! ➡️ Server Secrets
    const server = config.get('server')

    // ! ➡️ Start Server
    httpServer.listen(server.port, () => {
        logger.info(config.get('app.version').replace(/\{0}/g, version))
        logger.info(
            `📶 http://${server.host}:${server.port} againt corsOrigin ${server.corsOrigin}`
        )
    })
}

startServer()
