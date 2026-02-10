import  { pool }            from    './pool.js';
import  fs                  from    'node:fs';
import  path                from    'node:path';
import  { fileURLToPath }   from    'node:url';

const   __filename = fileURLToPath(import.meta.url);
const   __dirname = path.dirname(__filename);
const   MIGRATION_DIR = path.join(__dirname, '..', 'migration');

// console.log("DIR:", MIGRATION_DIR);



export  const   runMigration = async () => {

    const   client = await pool.connect();
    try {
        console.log("Running migrations...");
        const   migrInitSql = fs.readFileSync(path.join(MIGRATION_DIR, '00-create-migration-table.sql'), 'utf-8');
        await client.query(migrInitSql);

        const   { rows } = await client.query('SELECT name FROM migration'); // at here i get list all migration files that already applied.
        const   applied = new Set(rows.map(r => r.name));

        const   filesFromDisk = fs.readdirSync(MIGRATION_DIR).filter(f => f.endsWith('.sql')).sort();

        for (const file of filesFromDisk) {
            if(applied.has(file))
                continue;
            const   sqlToApply = fs.readFileSync(path.join(MIGRATION_DIR, file), 'utf-8');
            console.log(`➡️ Applying ${file}`);
            await client.query('BEGIN');
            await client.query(sqlToApply);
            await client.query('INSERT INTO migration (name) VALUES ($1)', [file]);
            await client.query('COMMIT');
        }
        console.log('Migration Complete');
    } catch (error) {
        await client.query('ROLLBACK');
        console.log(`Migration Failed:`, error);
    } finally {
        client.release();
    }
}