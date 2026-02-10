import  { qwery }   from    './pool.js';

const   sleep  = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export  const   waitForDb = async ({
        retries = 10,
        delay = 2000
    }) => {
        for (let i = 0; i < retries; i++) {
            try {
                const   res = await qwery("SELECT 1");
                console.log("✅ Database is ready");
                return ;
            } catch (error) {
                console.log(`⏳ DB not ready (attempt ${i}/${retries})`);
                await sleep(delay);
            }
        }
        console.error("Database never became ready.");
        process.exit(1);
}