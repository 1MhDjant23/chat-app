import jwt from 'jsonwebtoken';

export   const   socketAuthenticate = (socket, next) => {
    try {
        console.log('In socket auth');
        const   token = socket.handshake.auth?.token;
        if (!token)
            return next(new Error('No Token'));
        const   payload = jwt.verify(token, process.env.SECRET_KEY);
        console.log('connected socket')
        socket.user = payload;
        next();
    } catch (error) {
        console.log('Connect error:', error);
        return next(new Error('Invalid Token'));
    }
}