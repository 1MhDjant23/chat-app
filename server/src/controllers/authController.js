import  bcrypt                  from    'bcrypt';
import  jwt                     from    'jsonwebtoken';
import { createUser, findUserByUsername } from '../db/dbAccessLayers/users.js';

export  const   register = async (req, res, next) => {

    try {
        const   {username, password} = req.body;

        if (!username || !password || username.trim() === '' || password.trim() === '') {
            return res.status(400).json({error: 'All fields are required'});
        }

        const   isUserExist = await findUserByUsername(username);
        if (isUserExist)
            return res.status(409).json({ error: "Username already used" });

        const   hashed = await bcrypt.hash(password, 10);
        const   user_data = await createUser(username, hashed);

        res.status(201).json({
            message: 'User registred successfully',
            user: user_data
        });
        next();

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}


export const   loginUser = async (req, res) => {

    try {
        
        const   {username, password} = req.body;
        
        if (!username || !password || username.trim() === ''
        || password.trim() === '') return res.status(400).json({error: 'username and password are required'});
        
        const   isUserExist = await findUserByUsername(username);
        if(!isUserExist){
            console.log("Invalid username");
            return res.status(401).json({error: 'Invalid credentials'});
        }
        
        
        const   isMatch = await bcrypt.compare(password, isUserExist.hash_password);
        if (!isMatch) {
            console.log("Incorrect password!");
            return res.status(401).json({error: 'Invalid credentials'});
        }

        const   token = jwt.sign({id: isUserExist.id, username: isUserExist.username}, process.env.SECRET_KEY);

        res.status(200).json({
            message: 'Login success',
            token,
            user: {
                id: isUserExist.id,
                username: isUserExist.username
            }
        });
    } catch (error) {
        console.log("Login failled:", error);
        res.status(500).json({error: error.message});
    }        
}