import  { Server }      from    'socket.io';
// import  { qwery }       from    './src/db/index.js';
import  { setupSocket } from "./src/socket/socket.js";
import  http            from 'node:http';
import  app             from "./app.js";
import  dotenv          from 'dotenv';
import { waitForDb } from './src/db/waitForDb.js';

dotenv.config();
const   PORT = process.env.PORT || 3000;

function    startServer() {
    try {
        const   server = http.createServer(app);
        const   io = new Server(server, {
            cors: {
                origin: '*'
            }
        });
        setupSocket(io);
        
        server.listen(PORT, () => console.log(`server running on Port: ${PORT}`));

    } catch (error) {
        console.error("Failled to start server:", error);
        process.exit(1);
    }
}

await waitForDb({});

startServer();