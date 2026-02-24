import { Server } from 'socket.io';
import { setupSocket } from "./src/socket/socket.js";
import http from 'node:http';
import app from "./app.js";
import dotenv from 'dotenv';
import { waitForDb } from './src/db/waitForDb.js';
import { runMigration } from './src/db/migration.js';

dotenv.config();
const PORT = process.env.PORT || 3000;

function startServer() {
    const server = http.createServer(app);
    server.on('error', (err) => console.log('server error:', err));

    const io = new Server(server, {
        cors: {
            origin: '*'
        }
    });
    setupSocket(io);
    server.listen(PORT, () => console.log(`server running on Port: ${PORT}`));
}

const boot = async () => {
    try {
        await waitForDb({});
        await runMigration();
        startServer();
    } catch (error) {
        console.log('Startup failed:', error);
        process.exit(1);
    }
}


boot();