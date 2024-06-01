const db = require('../../conn');
const { getData } = require('../tools/getData');
const { generateID } = require('../tools/idGenerator');
const url = 'https://api.openf1.org/v1/intervals'

async function insertIntervals(id, pitData){
    try{
        await db.query(
            `INSERT INTO 
            intervals(id, date, driver_key, gap_to_leader, interval, session_key) 
            VALUES 
            ($1, $2, $3, $4, $5, $6)`,
            [
                id,
                pitData.date,
                pitData.driver_number,
                pitData.gap_to_leader,
                pitData.interval,
                pitData.session_key,
            ]
        )
    }catch(e){
        console.error('Erro ao tentar inserir intervalo: ', e);
    }
}

async function getAllData(url, limit = 150) {
    let allData = [];
    let page = 1;
    let moreData = true;

    while (moreData) {
        const data = await getData(url, page, limit);
        if (data && data.length > 0) {
            allData = [...allData, ...data];
            page++;
        } else {
            moreData = false;
        }
    }

    return allData;
}



async function main() {
    try{
        const intervalsData = await getAllData(url);
        console.log(intervalsData.lenght)
        let intervals = []
        for (const item of intervalsData){
            if (
                item.gap_to_leader == null ||
                item.date == null ||
                item.driver_number == null ||
                item.interval == null ||
                item.session_key == null
            ){
                continue; 
            }
            intervals.push(item);
        }
        
        console.log(intervals.lenght)
        await db.connect()
        let counter = 0

        for (const item of intervals){
            const id = generateID(counter)
            counter++;
            await insertIntervals(id, item);
        }

        console.log('Carga dos intervalos foi efetuada com sucesso!')
        await db.end();
    }catch(e){
        return console.error('Houve um erro: ', e)
    }
}


main();
