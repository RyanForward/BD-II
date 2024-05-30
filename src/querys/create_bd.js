const db = require('../conn')

async function createDataBase(){
    try{
        await db.connect();

        await db.query(`
        CREATE TYPE SESSION_TYPE AS ENUM('Race', 'Practice', 'Sprint', 'Qualifying')
        `);

        // Create tables
        await db.query(`
        CREATE TABLE drivers (
            driver_key INTEGER PRIMARY KEY,
            country_code VARCHAR(3) NOT NULL,
            driver_number INTEGER NOT NULL,
            full_name VARCHAR(50) NOT NULL,
            name_acronym VARCHAR(3) NOT NULL,
            session_key INTEGER NOT NULL,
            team_colour VARCHAR NOT NULL,
            team_name VARCHAR NOT NULL
        );
        `);

        await db.query(`
        CREATE TABLE intervals (
            id INTEGER PRIMARY KEY,
            date DATE NOT NULL,
            driver_key INTEGER NOT NULL,
            gap_to_leader INTERVAL NOT NULL,
            interval INTEGER NOT NULL,
            session_key INTEGER NOT NULL
        );
        `);

        await db.query(`
        CREATE TABLE pit_stop (
            id INTEGER PRIMARY KEY,
            date DATE NOT NULL,
            driver_key INTEGER NOT NULL,
            lap_number INTEGER NOT NULL,
            pit_duration INTEGER NOT NULL,
            session_key INTEGER NOT NULL
        );
        `);

        await db.query(`
        CREATE TABLE position (
            id INTEGER PRIMARY KEY,
            date DATE NOT NULL,
            driver_key INTEGER NOT NULL,
            position INTEGER NOT NULL,
            session_key INTEGER NOT NULL
        );
        `);

        await db.query(`
        CREATE TABLE sessions (
            session_key INTEGER NOT NULL PRIMARY KEY,
            session_name VARCHAR NOT NULL,
            session_type SESSION_TYPE NOT NULL,
            circuit_short_name VARCHAR NOT NULL,
            country_key INTEGER NOT NULL,
            country_name VARCHAR NOT NULL,
            date_end TIMESTAMPTZ,
            date_start TIMESTAMPTZ NOT NULL,
            gmt_offset INTERVAL NOT NULL,
            location VARCHAR NOT NULL,
            year INTEGER NOT NULL
        );
        `);

        await db.query(`
        CREATE TABLE radio (
            id INTEGER PRIMARY KEY,
            date DATE NOT NULL,
            driver_key INTEGER NOT NULL,
            recording_url TEXT NOT NULL,
            session_key INTEGER NOT NULL
        );
        `);

        await db.query(`
        CREATE TABLE weather (
            id INTEGER PRIMARY KEY,
            date DATE NOT NULL,
            session_key INTEGER NOT NULL,
            humidity INTEGER NOT NULL,
            rainfall INTEGER NOT NULL,
            track_temperature NUMERIC NOT NULL,
            wind_speed NUMERIC NOT NULL
        );
        `);

        // Add foreign keys
        await db.query(`
        ALTER TABLE drivers ADD FOREIGN KEY (session_key) REFERENCES sessions (session_key);
        `);

        await db.query(`
        ALTER TABLE pit_stop ADD FOREIGN KEY (driver_key) REFERENCES drivers (driver_key);
        `);

        await db.query(`
        ALTER TABLE pit_stop ADD FOREIGN KEY (session_key) REFERENCES sessions (session_key);
        `);

        await db.query(`
        ALTER TABLE radio ADD FOREIGN KEY (driver_key) REFERENCES drivers (driver_key);
        `);

        await db.query(`
        ALTER TABLE radio ADD FOREIGN KEY (session_key) REFERENCES sessions (session_key);
        `);

        await db.query(`
        ALTER TABLE weather ADD FOREIGN KEY (session_key) REFERENCES sessions (session_key);
        `);

        await db.query(`
        ALTER TABLE position ADD FOREIGN KEY (driver_key) REFERENCES drivers (driver_key);
        `);

        await db.query(`
        ALTER TABLE position ADD FOREIGN KEY (session_key) REFERENCES sessions (session_key);
        `);

        await db.query(`
        ALTER TABLE intervals ADD FOREIGN KEY (driver_key) REFERENCES drivers (driver_key);
        `);

        await db.query(`
        ALTER TABLE intervals ADD FOREIGN KEY (session_key) REFERENCES sessions (session_key);
        `);
        
        await db.end();
        
        console.log('Database created successfully');
    }catch(e){
        console.error('Houve um erro ao tentar criar o banco de dados!', e);
    }
}

createDataBase();