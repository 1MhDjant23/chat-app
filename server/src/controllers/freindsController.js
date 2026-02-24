import { checkIfFreindReqExist, freindsLists, getRequestById, saveFreindReq, updateFreindRequest, getPendingRequestsDB } from "../db/dbAccessLayers/freinds.js";
import { findUserByUsername } from "../db/dbAccessLayers/users.js";
import { qwery } from "../db/pool.js";

export const sendRequest = async (req, res) => {
    try {
        const { username } = req.params;
        const sender_id = req.user.id;

        if (!username || typeof username !== 'string') {
            return res.status(400).json({
                message: 'Invalid Username format'
            })
        }

        // Lookup the user by username to get their ID
        const targetUser = await findUserByUsername(username);

        if (!targetUser) {
            return res.status(404).json({ message: 'Target user does not exist' });
        }

        const receiver_id = targetUser.id;

        if (receiver_id === sender_id) {
            return res.status(400).json(
                { message: "You cannot send a friend request to yourself" });
        }

        const existingReq = await checkIfFreindReqExist(sender_id, receiver_id);

        if (existingReq) {
            if (existingReq.status === 'rejected' || existingReq.status === 'cancelled') {
                // If it was rejected, we can update it back to pending and swap sender/receiver if needed
                // It's cleaner to just update the existing record
                await qwery(
                    "UPDATE freind_requests SET status = 'pending', sender_id = $1, receiver_id = $2 WHERE id = $3",
                    [sender_id, receiver_id, existingReq.id]
                );
                return res.status(201).json({
                    message: 'request sent successfully',
                    status: 'pending'
                });
            } else {
                // If it's already pending or accepted
                return res.status(409).json({
                    message: 'Friend request already exists or you are already friends'
                })
            }
        }

        const result = await saveFreindReq(sender_id, receiver_id);

        res.status(201).json({
            message: 'request sent successfully',
            status: result
        })
    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({ message: 'Friend request already sent' });
        }
        res.status(500).json({
            error: error.message
        })
    }
}

export const acceptFreindReq = async (req, res) => {
    try {
        const { requestId } = req.params;
        const receiver_id = req.user.id;

        const reqResult = await getRequestById(requestId);
        if (!reqResult)
            return res.status(404).json({ error: 'friend request Not Found' });
        console.log("freindRequest:", reqResult);
        if (reqResult.receiver_id !== receiver_id) {
            // console.log("TypeOf:", typeof reqResult.receiver_id, typeof receiver_id);
            return res.status(409).json({ message: 'bad request' });
        }
        const upd = await updateFreindRequest(requestId, 'accepted');
        console.log("after accepting freind:", upd);

        res.status(201).json({ message: 'freind request accepted' });

    } catch (error) {
        console.log("error:", error);
        res.status(500).json({ error: error });
    }
}

export const rejectFreindReq = async (req, res) => {
    try {
        const { requestId } = req.params;
        const receiver_id = req.user.id;

        const reqResult = await getRequestById(requestId);
        if (!reqResult)
            return res.status(404).json({ error: 'freind request not found' });
        if (reqResult.receiver_id !== receiver_id) {
            return res.status(409).json({ error: 'Bad request.' });
        }
        const upd = await updateFreindRequest(requestId, 'rejected');
        console.log("request rejected:", upd);
        res.status(201).json({ message: 'freind request rejected' });

    } catch (error) {
        res.status(500).json({ error: error });
    }
}

export const getFriendsList = async (req, res) => {
    try {
        const userId = req.user.id;
        const freinds = await freindsLists(userId, "accepted"); // Only get accepted friends

        return res.status(200).json({
            message: 'you get all ur friends',
            freindList: freinds
        });

    } catch (error) {
        console.log("error:", error);
        res.status(500).json({ error: error.message });
    }
}

export const getPendingRequests = async (req, res) => {
    try {
        const userId = req.user.id;
        const pendingReqs = await getPendingRequestsDB(userId);

        return res.status(200).json({
            message: 'Pending requests retrieved',
            requests: pendingReqs
        });
    } catch (error) {
        console.log("error fetching pending:", error);
        res.status(500).json({ error: error.message });
    }
}