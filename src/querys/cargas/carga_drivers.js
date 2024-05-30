const db = require('../../conn');
const url = 'https://api.openf1.org/v1/drivers?'

async function insertDrivers(driversData){
    try{
        await db.query(
            `INSERT INTO 
            drivers(driver_key, country_code, driver_number, full_name, name_acronym, session_key, team_colour, team_name) 
            VALUES 
            ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [
                driversData.driver_number,
                driversData.country_code,
                driversData.driver_number,
                driversData.full_name,
                driversData.name_acronym,
                driversData.session_key,
                driversData.team_colour,
                driversData.team_name,
            ]
        )
    }catch(e){
        console.error('Erro ao tentar inserir pilotos: ', e);
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
    const dataDrivers = await getData();
    let driversNumber = [];
    let drivers = []
    for (const item of dataDrivers){

        if (
            driversNumber.includes(item.driver_number) ||
            item.driver_number == null ||
            item.country_code == null ||
            item.full_name == null ||
            item.name_acronym == null ||
            item.session_key == null ||
            item.team_colour == null ||
            item.team_name == null
        ) {
            continue; 
        }
        drivers.push(item);
        driversNumber.push(item.driver_number)
    }
    
    await db.connect()
    for (const driver of drivers){
        await insertDrivers(driver);
    }
    
    await db.end();
}

main();
