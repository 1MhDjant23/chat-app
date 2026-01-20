import express from "express";
import http    from 'node:http';
import { Server } from "socket.io";
import {
    getAllMessages,
    addMessage,
    addUser,
    removeUser,
    getAllUsers,
    usernameExists
}   from './data.js';
// import { timeStamp } from "node:console";

const   app = express();
const   server = http.createServer(app);
const   io = new Server(server);

// set view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extends: true }));

app.get('/', (req, res) => {
    const   messages = getAllMessages();
    res.render('index', { messages });
})

// ============ SOCKET.IO ===================

io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);
    // Event 1; user Joins
    socket.on('userJoin', (username) => {
        if(usernameExists(username)) {
            socket.emit('error', 'Username already taken');
            console.log('============');
            return;
        }
        addUser(socket.id, username);
        socket.username = username;

        console.log(username + ' joined the chat');

        socket.emit('welcome',{
            message: 'Welcome the chat: ' + username,
            username: username
        });

        socket.emit('userJoined', {
            username: username,
            message: username + ' joined the chat',
            totalUsers: getAllUsers().length
        });
    });
    // EVENT 2: User Sends message
    socket.on('sendMessage', (data) => {
        if (!socket.username) {
            socket.emit('error', 'Please join first');
            return ;
        }
        if (!data.content || data.content.trim() === '') {
            socket.emit('error', 'Message cannot be empty');
            return ;
        }
        const   message = addMessage(socket.username, data.content);
        console.log(socket.username + ' sent: ' + data.content);

        io.emit('newMessage', {
            id: message.id,
            username: message.username,
            content: message.content,
            timestamp: message.formatedTime
        });
    });
    // EVENT 3: Request current users list
    socket.on('getUsers', () => {
        socket.emit('usersList', {
            users: getAllUsers(),
            totalUsers: getAllUsers().length
        });    
    })
    // EVENT 4: User disconnects
    socket.on('disconnect', () => {
        if (socket.username) {
            console.log(socket.username + ' left the chat');
            removeUser(socket.id);
            io.emit('userLeft', {
                username: socket.username,
                message: socket.username + ' left the chat',
                totalUsers: getAllUsers().length
            });
        } else {
            console.log('Client disconnected:', socket.id);
        }
    });
})

const   PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('🚨 Chat Server Running on http://localhost:' + PORT);
});
