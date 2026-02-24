import { qwery } from "../pool.js"

export const saveFreindReq = async (sender_id, receiver_id) => {
    const res = await qwery("INSERT INTO freind_requests \
        (sender_id, receiver_id) VALUES ($1, $2) RETURNING status"
        , [sender_id, receiver_id]);
    return res.rows[0];
}


export const checkIfFreindReqExist = async (sender_id, receiver_id) => {
    const res = await qwery(
        "SELECT id, sender_id, receiver_id, status FROM freind_requests \
            WHERE (sender_id = $1 AND receiver_id = $2) \
            OR (sender_id = $2 AND receiver_id = $1)"
        , [sender_id, receiver_id]);
    console.log("RES:", res.rows[0]);
    return res.rows[0];
}


export const updateFreindRequest = async (reqId, status) => {
    const res = await qwery(
        "UPDATE freind_requests SET status = $2 \
            WHERE id = $1 RETURNING status"
        , [reqId, status]);
    return res.rows[0];
}

export const getPendingRequestsDB = async (userId) => {
    // Select the sender's details where the receiver is the current user and status is pending
    const res = await qwery(
        "SELECT fr.id as request_id, u.id as sender_id, u.username, u.avatar_url \
        FROM freind_requests fr \
        JOIN users u ON u.id = fr.sender_id \
        WHERE fr.receiver_id = $1 AND fr.status = 'pending'",
        [userId]
    );
    return res.rows;
}


export const getRequestById = async (reqId) => {
    const res = await qwery(
        "SELECT receiver_id FROM freind_requests WHERE id = $1", [reqId]);
    return res.rows[0];
}

export const freindsLists = async (userId, status) => {

    const res = await qwery(
        "SELECT u.id, u.username, u.email, u.avatar_url, u.created_at \
    FROM freind_requests fr \
    JOIN users u \
    ON ( \
        (fr.sender_id = $1 AND u.id = fr.receiver_id) \
        OR \
        (fr.receiver_id = $1 AND u.id = fr.sender_id) \
    ) \
    WHERE fr.status = $2;"
        , [userId, status]);

    return res.rows;
}