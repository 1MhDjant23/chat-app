import { getMessagesBetweenUsers } from "../db/dbAccessLayers/messages.js";

export const   getMessages = async (req, res) => {
    const   userId = req.params.userId;
    const   otherUserId = req.user.id;
    
    try {
        const   messages = await getMessagesBetweenUsers(userId, otherUserId);
        res.json(messages);
    } catch (error) {
        console.log("Error getting messages:", error);
        res.status(500).json({error: error.message});
    }
}
