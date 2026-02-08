import { findUserByUsername, getUsersExceptMe } from '../db/dbAccessLayers/users.js';

export  const   getUsers = async (req, res) => {
    try {
        const   users = await getUsersExceptMe(req.user.id);
        console.log('my User ID:', req.user.id);
        console.log("getting Users success");
        res.status(200).json(users);
    } catch (error) {
        console.log("Error getting Users");
    }
}


export const   getMe = async (req, res) => {
    try {
        const   me = await findUserByUsername(res.user.username);
        if(!me)
            return res.status(404).json({error: 'Not Found'});

        res.json({
            id: me.id,
            username: me.username
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
