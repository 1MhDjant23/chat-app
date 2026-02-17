import  bcrypt                  from    'bcrypt';
import  jwt                     from    'jsonwebtoken';
import { createUser, findUserByEmail } from '../db/dbAccessLayers/users.js';

export  const   register = async (req, res) => {

    try {
        const   {username, email, password} = req.body;

        if (!username || !password || !email || email.trim() === '' || username.trim() === '' || password.trim() === '') {
            return res.status(400).json({error: 'All fields are required'});
        }

        // const   isUserExist = await findUserByEmail(email);
        // if (isUserExist)
        //     return res.status(409).json({ error: "email already used" });

        const   hashed = await bcrypt.hash(password, 10);
        const   user_data = await createUser(username, email, hashed);

        res.status(201).json({
            message: 'User registred successfully',
            user: user_data
        });

    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({
                error: 'Email already in use'
            })
            // throw error;
        }
        res.status(500).json({error: error.message});
    }
}


export const   loginUser = async (req, res) => {

    try {
        console.log("body:", req.body);
        if(!req.body)
            return res.status(400).json({error: 'All fields are required'});

        const   { email, password } = req.body;
        
        if (!password || !email || email.trim() === '' || password.trim() === '')
            return res.status(400).json({error: 'All fields are required'});
        
        const   isUserExist = await findUserByEmail(email);
        if(!isUserExist){
            console.log("Invalid email");
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