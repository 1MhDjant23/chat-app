import { getMessagesBetweenUsers, saveMessage } from "../db/dbAccessLayers/messages.js";
// import { readMessages, saveMessage } from "../utils/fileMessages.js";

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

    // const   messages = readMessages();
    // const   chat = messages.filter(m => 
    //     (m.from === userId && m.to === me) ||
    //     (m.from === me && m.to === userId));
        
    //     console.log('i get it');
    //    console.log('=================');
    // res.json(chat);
}


export  const   sendMessage = async (req, res) => {
    const   userAId = req.user.userId;
    const   {otherId, content} = req.body;
    try {
        if (!otherId || !content || otherId.trim() === '' || content.trim() === '' || !isNaN(otherId)) {
            return res.status(401).json({error: 'Invalid'});
        }
    
        const   newMessage = await saveMessage(userAId, otherId, content);

        return res.status(201).json(newMessage);
        
    } catch (error) {
        console.log('error save message:', error);
        res.status(500).json({error: error.message});
    }
}