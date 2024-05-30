const db = require('../../conn');
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

async function getData(){
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Resposta da API não está OK. Motivo: ' + response.statusText);
        }
        
        const jsonData = await response.json();
        
        return jsonData;
    } catch (error) {
        console.error('Erro ao contactar API: ', error);
        return null;
    }
}


async function main() {
    const dataSessions = await getData();
    await db.connect()
    for (const item of dataSessions){
        await insertSession(item);
    }
    console.log('Dados da sessão inseridos no banco de dados com sucesso!');
    await db.end();
}

main();
