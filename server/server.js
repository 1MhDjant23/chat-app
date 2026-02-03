import express from "express";
import  {Server}    from    'socket.io';
import  http    from 'node:http';
import cors from 'cors';
import app from "./app.js";
import  dotenv  from 'dotenv';
import { setupSocket } from "./src/socket/socket.js";
// import  from 'prop-types';

dotenv.config();

const   PORT = process.env.PORT || 3000;

const   server = http.createServer(app);


const   io = new Server(server, {
    cors: {
        origin: '*'
    }
});

setupSocket(io);

server.listen(PORT, () => console.log(`server running on Port: ${PORT}`));