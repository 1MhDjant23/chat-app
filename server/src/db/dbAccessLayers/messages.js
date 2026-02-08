import  { qwery }   from    '../index.js';

export  const   getMessagesBetweenUsers = async (senderId, receiverId) => {
    const   res = await qwery(
        "SELECT * FROM messages WHERE \
            (sender_id = $1 AND receiver_id = $2) \
         OR (sender_id = $2 AND receiver_id =$1) ORDER BY created_at ASC"
    , [senderId, receiverId]);
    return res.rows;
}


export  const   saveMessage = async (sender_id, receiver_id, content) => {
    const   res = await qwery(
        "INSERT INTO messages (sender_id, receiver_id, content)\
            VALUES ($1, $2, $3) RETURNING sender_id, receiver_id, content, created_at",
        [sender_id, receiver_id, content]);
    console.log('message:', res.rows);
    return res.rows;
}