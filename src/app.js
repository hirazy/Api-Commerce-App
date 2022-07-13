import http from 'http'
import { env, mongo, port, ip, apiRoot } from './config'
import mongoose from './services/mongoose'
import express from './services/express'
import api from './api'
// import { client } from '../src/services/redis'

const app = express(apiRoot, api)
const server = http.createServer(app)

// const client = redis.createClient(3000)

// client.on('error', (err) => {
//     console.log("Error " + err)
// });

if (mongo.uri) {
    mongoose.connect(mongo.uri)
}
mongoose.Promise = Promise

setImmediate(() => {
    server.listen(port, ip, () => {
        console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
    })
})

app.get('/', async(req, res) => {
    // await client.connect()

    console.log("Hehe " + await client.get("name"))
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