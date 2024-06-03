const db = require('../../conn');
const { getData } = require('../tools/getData');
const { generateID } = require('../tools/idGenerator');
const url = 'https://api.openf1.org/v1/team_radio?'

async function insertRadios(id, radioData){
    try{
        await db.query(
            `INSERT INTO 
            radio(id, date, driver_key, recording_url, session_key) 
            VALUES 
            ($1, $2, $3, $4, $5)`,
            [
                id,
                radioData.date,
                radioData.driver_number,
                radioData.recording_url,
                radioData.session_key,
            ]
        )
    }catch(e){
        console.error('Erro ao tentar inserir rádio: ', e);
    }
}


async function main() {
    const dataRadios = await getData(url);
    let radios = []
    for (const item of dataRadios){
        if (
            item.date == null ||
            item.driver_number == null ||
            item.recording_url == null ||
            item.session_key == null
        ){
            continue; 
        }
        radios.push(item);
    }
    
    await db.connect()
    let counter = 0
    for (const radio of radios){
        const id = generateID(counter)
        counter++;
        await insertRadios(id, radio);
    }

    console.log('Carga dos rádios foi efetuada com sucesso!')
    await db.end();
}


main();
