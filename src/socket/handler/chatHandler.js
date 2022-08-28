/**
 * @param {*} id 
 * @param {*} tag 
 * @param {*} mess 
 * @abstract Send Message to specific Id
 */
const sendMessageToId = (id, tag, mess) => {
    try {
        global.io.to(id).emit(tag, mess)
    } catch (error) {}
}

/**
 * 
 * @param {*} io 
 * @param {*} socket 
 * @abstract Handle Chat From Others
 */
export const chatHandler = (io, socket) => {
    socket.on('chat:message', (message, callBack) => {

        /**
         * My Socket Id
         */
        const socketId = socket.id

        /**
         * List User Sockets of Global
         */
        const userSockets = global.mapIdToUser[socketId]
        callBack(true)

        if (global.mapGroupById[walletAddress]) {

            sendMessageToId(socketId, 'chat:messageResponse', {
                code: 200,
                data: {
                    userSockets,
                    message
                }
            })
        } else {
            sendMessageToId(socketId, 'chat:messageResponse', {

            })
        }
    })
}