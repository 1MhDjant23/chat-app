import  pkg from    'pg';

const   { Pool } = pkg;


const   pool = new Pool({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DB,
    user: process.env.PG_USER,
    password: process.env.PG_PASS
});


export  const   qwery = (text, params) => {
    return pool.query(text, params);
}