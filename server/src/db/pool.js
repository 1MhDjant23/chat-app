import  pkg from    'pg';

const   { Pool } = pkg;


export const   pool = new Pool({
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    database: process.env.PG_DB,
    user: process.env.PG_USER,
    password: process.env.PG_PASS
});

export  const   qwery = (text, params) => {
    console.log("NEV:", process.env.PG_HOST);
    return pool.query(text, params);
}