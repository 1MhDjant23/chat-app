import { checkIfFreindReqExist, freindsLists, getRequestById, saveFreindReq, updateFreindRequest } from "../db/dbAccessLayers/freinds.js";

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

export  const   acceptFreindReq = async (req, res) => {
    try {
        const   {requestId} = req.params;
        const   receiver_id = req.user.id;

        const   reqResult = await getRequestById(requestId);
        if(!reqResult)
            return res.status(404).json({ error: 'friend request Not Found' });
        console.log("freindRequest:", reqResult);
        if (reqResult.receiver_id !== receiver_id) {
            // console.log("TypeOf:", typeof reqResult.receiver_id, typeof receiver_id);
            return res.status(409).json({message: 'bad request'});
        }
        const   upd = await updateFreindRequest(requestId, 'accepted');
        console.log("after accepting freind:", upd);
        res.status(201).json({message: 'freind request accepted'});


    } catch (error) {
        console.log("error:", error);
        res.status(500).json({error: error});
    }
}

export  const   rejectFreindReq = async (req, res) => {
    try {
        const   {requestId} = req.params;
        const   receiver_id = req.user.id;

        const   reqResult = await getRequestById(requestId);
        if (!reqResult)
            return res.status(404).json({error: 'freind request not found'});
        if (reqResult.receiver_id !== receiver_id) {
            return res.status(409).json({error: 'Bad request.'});
        }
        const   upd = await updateFreindRequest(requestId, 'rejected');
        console.log("request rejected:", upd);
        res.status(201).json({message: 'freind request rejected'});

    } catch (error) {
        console.log("error rejecting :", error);
        res.status(500).json({error: error});
    }
}

export  const   getFriendsList = async (req, res) => {
    try {
        const   userId = req.user.id;
        const   resList = await freindsLists(userId, "accepted");

        console.log("users List", resList);
        const   freinds = resList.map(fr => fr.sender_id === userId ? fr.receiver_id : fr.sender_id);
        console.log("so freinds is:", freinds);
        return res.status(200).json({
            message: 'you get all ur friends',
            freindList: freinds
        });

    } catch (error) {
        console.log("error:", error);
        res.status(500).json({ error: error.message });
    }
}