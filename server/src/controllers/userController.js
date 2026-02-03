import  {readUsers} from '../utils/fileDB.js';

export  const   getUsers = (req, res) => {

    const   users = readUsers();

    const   userExceptMe = users.filter((u) => u.id !== req.user.userId).map(user => ({
        id: user.id,
        username: user.username
    }));
    console.log("user send");
    res.status(200).json(userExceptMe);
}


export const   getMe = (req, res) => {
    try {
        const   users = readUsers();

        const   me = users.find(u => u.id === req.user.userId);

        if(!me) return res.status(404).json({error: 'Not Found'});
        res.json({
            id: me.id,
            username: me.username
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
