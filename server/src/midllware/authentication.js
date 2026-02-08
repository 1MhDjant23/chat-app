import  jwt from    'jsonwebtoken';
import  dotenv  from 'dotenv';

dotenv.config();

export  const   authenticate = (request, response, next)=> {
    const   authHeader = request.headers.authorization;
    if (!authHeader)
        return response.status(401).json({error: 'Missing token'});

    const   token = authHeader.split(' ')[1];

    if(!token) {
        return response.status(401).json({error: 'Missing token'});
    }

    try {
        const userPaylod = jwt.verify(token, process.env.SECRET_KEY);
        request.user = userPaylod; // { id and username }
        console.log('user authorized!');
        next();
    } catch (error) {
        console.log('Invalid token');
        response.status(403).json({error: 'Invalid token'});
    }
}