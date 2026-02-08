import { saveMessage } from "../db/dbAccessLayers/messages.js";
import { findUserById } from "../db/dbAccessLayers/users.js";
import { socketAuthenticate } from "../midllware/socketAuth.js";

export const setupSocket = (io) => {
    io.use(socketAuthenticate);
    /*
    * after auth i add user={id, username} to socket OBJ
    */
    
    io.on("connection", (socket) => {
        // console.log("Socket connected:", socket.user.username);
        // console.log('Online-user', io.sockets.sockets.size);
        io.emit('total-user', io.sockets.sockets.size);
        
        socket.on('join-private-chat', async (receiverId) => {

            const   otherUser = await findUserById(receiverId);

            console.log(`join chat: (me),${socket.user.username} with ${otherUser.username}`);
            const roomId = 'room_' + [receiverId, socket.user.id].sort().join('_') + '___id';
            socket.join(roomId);
            io.in(roomId).emit('joined', `Welcome ${socket.user.username} & ${otherUser.username} in that Private Chat`);
            // console.log(`User ${socket.user.username} join the chat with ${otherUser.username}`);
        });


        socket.on('send-message', async (data) => {
            const roomId = 'room_' + [data.receiverId, socket.user.id].sort().join('_') + '___id';
    
            const   newMessage = await saveMessage(socket.user.id,  data.receiverId, data.content);
            io.in(roomId).emit('receive-message', newMessage);

        });

        socket.on('status:typing:start', (receiverId) => {
            const roomId = 'room_' + [receiverId, socket.user.id].sort().join('_') + '___id';
    
            socket.to(roomId).emit('typing', `${socket.user.username} is typing`);
            // console.log('user typing......');
        })
        socket.on('status:typing:stop', (receiverId) => {
            const roomId = 'room_' + [receiverId, socket.user.id].sort().join('_') + '___id';
            
            socket.to(roomId).emit('typing:off', null);
        })


        socket.on('disconnect', () => {
        
            console.log('Disconnected');
            io.emit('total-user', io.sockets.sockets.size);
        })
    });

}