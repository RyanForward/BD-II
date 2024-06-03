const db = require('../../conn');
const { getData } = require('../tools/getData');
const { generateID } = require('../tools/idGenerator');
const url = 'https://api.openf1.org/v1/weather?'

async function insertWeather(id, weatherData){
    try{
        await db.query(
            `INSERT INTO 
            weather(id, date, session_key, humidity, rainfall, track_temperature, wind_speed) 
            VALUES 
            ($1, $2, $3, $4, $5, $6, $7)`,
            [
                id,
                weatherData.date,
                weatherData.session_key,
                weatherData.humidity,
                weatherData.rainfall,
                weatherData.track_temperature,
                weatherData.wind_speed,
            ]
        )
    }catch(e){
        console.error('Erro ao tentar inserir clima: ', e);
    }
}

async function main() {
    const weather = await getData(url);
    let clima = []
    for (const item of weather){
        if (
            item.date == null ||
            item.humidity == null ||
            item.rainfall == null ||
            item.track_temperature == null ||
            item.wind_speed == null ||
            item.session_key == null
        ){
            continue; 
        }
        clima.push(item);
    }
    
    await db.connect()
    let counter = 0

    for (const item of clima){
        const id = generateID(counter)
        counter++;
        await insertWeather(id, item);
    }

    console.log('Carga dos climas foi efetuada com sucesso!')
    await db.end();
}


main();
