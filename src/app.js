import http from 'http'
import { env, mongo, port, ip, apiRoot } from './config'
import mongoose from './services/mongoose'
import express from './services/express'
import api from './api'

const app = express(apiRoot, api)
const server = http.createServer(app)

if (mongo.uri) {
    mongoose.connect(mongo.uri)
}
mongoose.Promise = Promise

setImmediate(() => {
    server.listen(port, ip, () => {
        console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
    })
})

// IO
const io = require("socket.io")(server);

// Authentication Socket
io.use(function(socket, next) {
    var token = socket.request.query.token;
    checkAuthToken(token, function(err, authorized) {
        if (err || !authorized) {
            next(new Error("not authorized"));
        }
        next();
    });
});

io.on('connection', function(socket) {
    
})

export default app