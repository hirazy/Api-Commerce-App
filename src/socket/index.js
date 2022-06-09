import {} from './handler'

global.mapIdToUser = {}


const onConnection = (io) => (socket) => {
    const socketId = socket.id

    /**
     * Authentication Socket 
     */
    io.use(function(socket, next) {
        var token = socket.request.query.token;

        checkAuthToken(token, function(err, authorized) {
            if (err || !authorized) {
                next(new Error("not authorized"));
            }
            next();
        });
    });
}

export default onConnection