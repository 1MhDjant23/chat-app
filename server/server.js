import  {Server}    from    'socket.io';
import  http    from 'node:http';
import  { qwery }   from    './src/db/index.js';
import app from "./app.js";
import  dotenv  from 'dotenv';
import { setupSocket } from "./src/socket/socket.js";

dotenv.config();
const   PORT = process.env.PORT || 3000;

async   function    startServer() {
    try {
        const   res = await qwery("SELECT NOW()");
        console.log("DB connecte at:", res.rows[0].now);
        
        const   server = http.createServer(app);
        const   io = new Server(server, {
            cors: {
                origin: '*'
            }
        });
        setupSocket(io);
        
        server.listen(PORT, () => console.log(`server running on Port: ${PORT}`));

    } catch (error) {
        console.error("Failled to start server:", error.message);
        process.exit(1);
    }
}

startServer();