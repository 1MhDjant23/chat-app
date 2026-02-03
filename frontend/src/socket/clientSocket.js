import  {socket}    from './socket.js';

export  const   clientSocket = (userId) => {
    if(socket.connected) {
        console.log("already connected !!!");
        return;
    }
    const   token = localStorage.getItem('token');

    socket.auth = { token: token };

    socket.connect();
    socket.on('connect', () => {
        socket.emit('join-private-chat', userId);
        console.log('Connected success');
    });


    socket.on('disconnect', () => {
        console.log('disconnect!');
    });
    socket.on('connect_error', (error) => {
        console.log('error socket:', error.message);
    });
}