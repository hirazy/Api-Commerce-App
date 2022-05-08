import http from 'http'
import { env, mongo, port, ip, apiRoot } from './config'
import mongoose from './services/mongoose'
import express from './services/express'
import api from './api'

import ipaddr from 'ipaddr.js'
import rateLimit from 'express-rate-limit'

const app = express(apiRoot, api)
const server = http.createServer(app)

const apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minutes
    max: 2,
    message: 'Too many connection',
});

// app.get('/', apiLimiter, (req, res) => {

// })

if (mongo.uri) {
    mongoose.connect(mongo.uri)
}
mongoose.Promise = Promise

setImmediate(() => {
    server.listen(port, ip, () => {
        console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
    })
})

export default app