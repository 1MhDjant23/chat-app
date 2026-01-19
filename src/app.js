import express from "express";
import http    from 'node:http';
import WebSocket, { WebSocketServer } from "ws";

const PORT = process.env.PORT || 4000;
const app = express();
const server = http.createServer(app);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.s
})




// const wws = new WebSocketServer( {server} );
// wws.on('connection', (wbs) => {
//   console.log(`connection from ${wbs}`);
//   wbs.on('message', (data) => {
//     const mssg = data.toString();
//     console.log('Received', mssg);
//     wbs.send(`Echo: ${mssg}`);
//   } )
// })


server.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));