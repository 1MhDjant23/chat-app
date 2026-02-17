import { qwery } from "../pool.js"

export  const   saveFreindReq = async (sender_id, receiver_id) => {
    const   res = await qwery("INSERT INTO freind_requests \
        (sender_id, receiver_id) VALUES ($1, $2) RETURNING status"
            , [sender_id, receiver_id]);
    return res.rows[0];
}


export  const   checkIfFreindReqExist = async (sender_id, receiver_id) => {
    const   res = await qwery(
        "SELECT sender_id, receiver_id FROM freind_requests \
            WHERE sender_id = $1 AND receiver_id = $2 \
            OR sender_id = $2 AND receiver_id = $1"
        ,[sender_id, receiver_id]);
    console.log("RES:", res.rows[0]);
    return res.rows[0];
}


export  const   updateFreindRequest = async (reqId, status) => {
    const   res = await qwery(
        "UPDATE freind_requests SET status = $2 \
            WHERE id = $1"
    , [reqId, status]);
}


export  const   getRequestById = async (reqId) => {
    const   res = await qwery(
        "SELECT receiver_id FROM freind_requests WHERE id = $1", [reqId]);
    return res.rows[0];
}

export  const   freindsLists = async (userId, status) => {
    // const   status = "pending";
    const   res = await qwery(
        "SELECT sender_id, receiver_id FROM freind_requests \
        WHERE (sender_id = $1 OR receiver_id = $1) AND (status = $2)", [userId, status]
    );
    return res.rows;
}