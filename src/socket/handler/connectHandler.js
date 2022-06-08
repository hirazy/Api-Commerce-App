export const connectHandler = (io, socket) => {
    const socketId = socket.id

    io.to(socketId).emit()
}