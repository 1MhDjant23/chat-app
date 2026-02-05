import { socketAuthenticate } from "../midllware/socketAuth.js";
import { saveMessage } from "../utils/fileMessages.js";
import { getUserById } from "../utils/getData.js";


export const setupSocket = (io) => {
    io.use(socketAuthenticate);

    io.on("connection", (socket) => {
        // const   count = io.sockets.sockets.size;
        console.log("Socket connected:", socket.user);
        console.log('Online-user', io.sockets.sockets.size);
        io.emit('total-user', io.sockets.sockets.size);

        socket.on('join-private-chat', (receiverId) => {
            const receiver = getUserById(receiverId);

            console.log(`join chat: (me),${socket.user.username} with ${receiver.username}`);
            const roomId = 'room_' + [receiverId, socket.user.userId].sort().join('_');
            console.log("Room Id", roomId);
            socket.join(roomId);
            io.in(roomId).emit('joined', `Welcome ${socket.user.username} & ${receiver.username} in that Private Chat`);
            console.log(`User ${socket.user.username} join the chat with ${receiver.username}`);
        });


        socket.on('send-message', (data) => {
            const   roomId = 'room_' + [data.receiverId, socket.user.userId].sort().join('_');
            const   message = {
                id: new Date(),
                from: socket.user.userId,
                to: data.receiverId,
                content: data.content
            };
            saveMessage(message); // save to DB
            io.emit()
            io.in(roomId).emit('receive-message', message);
            console.log('i get messsage');
        });

        socket.on('status:typing:start', (receiverId) => {
            const   roomId = 'room_' + [receiverId, socket.user.userId].sort().join('_');

            socket.to(roomId).emit('typing', `${socket.user.username} is typing`);
            console.log('user typing......');
        })
        socket.on('status:typing:stop', (receiverId) => {
            const   roomId = 'room_' + [receiverId, socket.user.userId].sort().join('_');
            socket.to(roomId).emit('typing:off', null);
        })


        socket.on('disconnect', () => {
            console.log('Disconnected');
            io.emit('total-user', io.sockets.sockets.size);
        })
    });

}