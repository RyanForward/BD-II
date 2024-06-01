const db = require('../../conn');
const { generateID } = require('../tools/idGenerator');
const url = 'https://api.openf1.org/v1/pit?'

async function insertPits(id, pitData){
    try{
        await db.query(
            `INSERT INTO 
            pit_stop(id, date, driver_key, lap_number, pit_duration, session_key) 
            VALUES 
            ($1, $2, $3, $4, $5, $6)`,
            [
                id,
                pitData.date,
                pitData.driver_number,
                pitData.lap_number,
                pitData.pit_duration,
                pitData.session_key,
            ]
        )
    }catch(e){
        console.error('Erro ao tentar inserir pit: ', e);
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
    const pitstops = await getData();

    let pits = []
    for (const pit of pitstops){
        if (
            pit.pit_duration == null ||
            pit.date == null ||
            pit.driver_number == null ||
            pit.lap_number == null ||
            pit.session_key == null
        ){
            continue; 
        }
        pits.push(pit);
    }
    
    await db.connect()
    let counter = 0

    for (const item of pits){
        const id = generateID(counter)
        counter++;
        await insertPits(id, item);
    }

    console.log('Carga dos pit stops foi efetuada com sucesso!')
    await db.end();
}


main();
