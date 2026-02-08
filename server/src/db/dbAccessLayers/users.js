import  { qwery }   from    '../index.js';


export  const   findUserByUsername = async (username) => {
    const   res = await qwery(
        "SELECT * FROM users WHERE username = $1",
        [username]);
    return res.rows[0];
}

export  const   getUsersExceptMe = async (uid) => {
    const   res = await qwery(
        "SELECT id, username, created_at FROM users WHERE id != $1 ORDER BY username",
        [uid]
    );
    console.log("Users:", res.rows);
    return res.rows;
}

export  const   createUser = async (username, hash_password) => {

    const   res = await qwery(
        "INSERT INTO users (username, hash_password) VALUES ($1, $2) RETURNING id, username, created_at",
        [username, hash_password]);
    return res.rows[0];
}