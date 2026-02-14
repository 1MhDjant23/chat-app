import { qwery } from "../pool.js"


export  const   saveAvatar = async (id, avatar) => {
    const   res = await qwery("INSERT INTO users WHERE id = $1 (avatar) VALUES ($2)\
        RETURNING id, username, email, created_at, avatar", [id, avatar]);
    return res.rows[0];
}
