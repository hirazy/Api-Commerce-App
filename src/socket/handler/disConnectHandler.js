export const disConnectHandler = (io, socket) => {
    socket.on('disconnect', (msg) => {
        const socketId = socket.id

        delete global.mapIdToUser[socketId]
    })
}