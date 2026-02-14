import  { qwery }   from    '../pool.js';

export  const   findUserByEmail = async (email) => {
    const   res = await qwery(
        "SELECT * FROM users WHERE email = $1",
        [email]);
    return res.rows[0];
}


export  const   findUserByUsername = async (username) => {
    const   res = await qwery(
        "SELECT * FROM users WHERE username = $1",
        [username]);
    return res.rows[0];
}

export  const   findUserById = async (uid) => {
    const   res = await qwery(
        "SELECT id, username, email, created_at, avatar_url FROM users WHERE id = $1",
        [uid]);
    return res.rows[0];
}

export  const   getUsersExceptMe = async (uid) => {
    const   res = await qwery(
        "SELECT id, username, created_at FROM users WHERE id != $1 ORDER BY username",
        [uid]
    );
    // console.log("Users:", res.rows);
    return res.rows;
}

export  const   createUser = async (username, email, hash_password) => {

    const   res = await qwery(
        "INSERT INTO users (username, email, hash_password) VALUES ($1, $2, $3) RETURNING id, username, created_at",
        [username, email, hash_password]);
    return res.rows[0];
}