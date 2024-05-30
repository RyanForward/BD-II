const db = require('../conn')

async function dropDataBase(){
    try {
        await db.connect();
    
        // Drop foreign key constraints
        await db.query(`
            ALTER TABLE intervals DROP CONSTRAINT IF EXISTS intervals_driver_key_fkey;
            ALTER TABLE intervals DROP CONSTRAINT IF EXISTS intervals_session_key_fkey;
        `);
    
        await db.query(`
            ALTER TABLE pit_stop DROP CONSTRAINT IF EXISTS pit_stop_driver_key_fkey;
            ALTER TABLE pit_stop DROP CONSTRAINT IF EXISTS pit_stop_session_key_fkey;
        `);
    
        await db.query(`
            ALTER TABLE radio DROP CONSTRAINT IF EXISTS radio_driver_key_fkey;
            ALTER TABLE radio DROP CONSTRAINT IF EXISTS radio_session_key_fkey;
        `);
    
        await db.query(`
            ALTER TABLE weather DROP CONSTRAINT IF EXISTS weather_session_key_fkey;
        `);
    
        await db.query(`
            ALTER TABLE position DROP CONSTRAINT IF EXISTS position_driver_key_fkey;
            ALTER TABLE position DROP CONSTRAINT IF EXISTS position_session_key_fkey;
        `);
    
        await db.query(`
            ALTER TABLE drivers DROP CONSTRAINT IF EXISTS drivers_session_key_fkey;
        `);
    
        // Drop tables
        await db.query(`DROP TABLE IF EXISTS sessions`);
        await db.query(`DROP TABLE IF EXISTS radio`);
        await db.query(`DROP TABLE IF EXISTS weather`);
        await db.query(`DROP TABLE IF EXISTS pit_stop`);
        await db.query(`DROP TABLE IF EXISTS intervals`);
        await db.query(`DROP TABLE IF EXISTS position`);
        await db.query(`DROP TABLE IF EXISTS drivers`);
    
        // Drop enum type
        await db.query(`DROP TYPE IF EXISTS SESSION_TYPE`);
    
        await db.end();
    
        console.log('Todas as tabelas e relações foram removidas do banco de dados com sucesso');
    } catch (e) {
        console.error('Houve um erro ao tentar remover todas as tabelas e relações do banco de dados:', e);
    }
    
}

dropDataBase();