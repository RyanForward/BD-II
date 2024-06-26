const db = require('../../conn');
const { getData } = require('../tools/getData');
const url = 'https://api.openf1.org/v1/sessions?'

async function insertSession(sessionData){
    try {
        await db.query(
            `INSERT INTO 
            sessions(session_key, session_name, session_type, circuit_short_name, country_key, country_name, date_end, date_start, gmt_offset, location, year) 
            VALUES 
            ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
            [
                sessionData.session_key,
                sessionData.session_name,
                sessionData.session_type,
                sessionData.circuit_short_name,
                sessionData.country_key,
                sessionData.country_name,
                sessionData.date_end,
                sessionData.date_start,
                sessionData.gmt_offset,
                sessionData.location,
                sessionData.year
            ]
        );
    } catch (erro) {
        throw new Error('Erro ao tentar inserir sessão: ' + erro);

    }
}

async function main() {
    const dataSessions = await getData(url);

    let sessions = []
    for (const item of dataSessions){
        if (
            item.session_key == null ||
            item.session_name == null ||
            item.session_type == null ||
            item.circuit_short_name == null ||
            item.country_key == null ||
            item.country_name == null ||
            item.date_end == null ||
            item.date_start == null ||
            item.gmt_offset == null ||
            item.location == null ||
            item.year == null
        ) {
            continue; 
        }
        sessions.push(item)
    }

    await db.connect()

    for (const item of sessions){
        await insertSession(item);
    }

    console.log('Dados da sessão inseridos no banco de dados com sucesso!');
    
    await db.end();
}

main();
