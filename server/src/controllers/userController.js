import { findUserById, findUserByUsername, getUsersExceptMe } from '../db/dbAccessLayers/users.js';

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
        const   me = await findUserById(req.user.id);
        if(!me)
            return res.status(404).json({error: 'Not Found'});

        res.json(
            me
        //     {
        //     id: me.id,
        //     username: me.username,
        //     email: me.email,
        //     avatar_url: me.avatar_url,
        //     created_at: me.created_at
        // }
    );
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
