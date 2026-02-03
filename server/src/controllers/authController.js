import  { readUsers, addUser }  from    '../utils/fileDB.js';
import  bcrypt  from    'bcrypt';
import jwt from 'jsonwebtoken';


export  const   register = (req, res, next) => {

    try {
        const   {username, password} = req.body;
    

        if (!username || !password || username.trim() === '' || password.trim() === '') {
            return res.status(400).json({error: 'All fields are required'});
        }
        const   users = readUsers();
        const   isUserExist = users.find( user => user.username === username );

        if(isUserExist)
            return res.status(400).json({error: 'usernam already exist!'});

        const   hashed = bcrypt.hashSync(password, 10);

        const   newUser = {
            id: new Date(),
            username: username,
            password: hashed
        };

        users.push(newUser);
        addUser(users);

        res.status(201).json({
            message: 'User registred successfully',
            user: {
                id: newUser.id,
                username: newUser.username
            }
        });
        next();
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}


export const   loginUser = (req, res) => {

    try {
        
        const   {username, password} = req.body;
        
        if (!username || !password || username.trim() === ''
        || password.trim() === '') return res.status(400).json({error: 'username and password are required'});
        
        const   users = readUsers();
        
        const   userExist = users.find( user => user.username === username );
        
        if (!userExist) {
            console.log(" User !!!!!");
            return res.status(401).json({error: 'Unauthorized'});
        }
        
        const   isMatch =  bcrypt.compareSync(password, userExist.password);
        if (!isMatch) {
            console.log("password !!!!!");
            return res.status(401).json({error: 'Unauthorized'});
        }
        
        const   token = jwt.sign({userId: userExist.id, username: userExist.username}, process.env.SECRET_KEY);
        
        res.status(200).json({
            message: 'Login success',
            token,
            user: {
                username: userExist.username
            }
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }        
}