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
            // socket.emit('joined', );
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
            io.in(roomId).emit('receive-message', message);
            console.log('iget messsage');
        });



        socket.on('disconnect', () => {
            console.log('Disconnected');
            io.emit('total-user', io.sockets.sockets.size);
        })
    });

}