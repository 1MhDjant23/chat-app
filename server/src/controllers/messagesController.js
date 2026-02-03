import { readMessages, saveMessage } from "../utils/fileMessages.js";

export const   getMessages = (req, res) => {
    const   userId = req.params.userId;
    const   me = req.user.userId;
    
    const   messages = readMessages();
    const   chat = messages.filter(m => 
        (m.from === userId && m.to === me) ||
        (m.from === me && m.to === userId));
        
        console.log('i get it');
       console.log('=================');
    res.json(chat);
}


export  const   sendMessage = (req, res) => {
    const   me = req.user.userId;
    const   {otherId, content} = req.body;

    if (!otherId || !content || otherId.trim() === '' || content.trim() === '') {
        return res.status(401).json({error: 'Invalid'});
    }
    const   messages = readMessages();
    const   newMessage = {
        id: new Date(),
        from: me,
        to: otherId,
        content: content
    };
    messages.push(newMessage);
    saveMessage(messages);
    return res.status(201).json(newMessage);
}