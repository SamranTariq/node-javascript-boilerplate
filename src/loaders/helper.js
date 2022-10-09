import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
import path from 'path'
import config from 'config'

import { logger } from '../utils/logger'

export const assignid = (req, res, next) => {
    req.id = uuidv4()
    next()
}

export const accessLogStream = () => {
    return fs.createWriteStream(
        path.join(__dirname + '../../../', 'access.log'),
        {
            flags: 'a',
        }
    )
}

export const wholeError = (error) => {
    if (config.get('server.open')) {
        logger.info(`🎭 ${error}`)
    }
}
