import { checkIfFreindReqExist, saveFreindReq } from "../db/dbAccessLayers/freinds.js";

export  const   sendRequest = async (req, res) => {
    try {
        const   {userId} = req.params;
        const   sender_id = req.user.id;
        if (!Number(userId) || isNaN(userId)) {
            return res.status(400).json({
                message: 'Invalid User ID format'
            })
        }
        if (Number(userId) === sender_id) {
            return res.status(400).json(
                { message: "You cannot send a friend request to yourself"});
        }
        const   isAlreadySent = await checkIfFreindReqExist(sender_id, userId);
        if(isAlreadySent)
            return res.status(409).json({
                message: 'Friend request already exists'
            })

        const   result = await saveFreindReq(sender_id, userId);
        res.status(201).json({
            message: 'requset send successfully',
            status: result
        })
    } catch (error) {
        if(error.code === '23503')
            return res.status(404).json({ message: 'Target user does not exist' });
        if (error.code === '23505') {
            return res.status(409).json({ message: 'Friend request already sent' });
        }
        res.status(500).json({
            error: error.message
        })
    }
}