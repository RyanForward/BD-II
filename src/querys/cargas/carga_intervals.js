const https = require('https'); 
const db = require('../../conn'); 
const { generateID } = require('../tools/idGenerator'); 

const BATCH_SIZE = 1000; 
const sessionsUrl = "https://api.openf1.org/v1/sessions"; 


async function fetchData(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';

           
            res.on('data', (chunk) => {
                data += chunk;
            });

           
            res.on('end', () => {
                if (res.statusCode === 200) {
                    resolve(JSON.parse(data)); 
                } else {
                    reject(new Error(`Failed to fetch data. Status code: ${res.statusCode}`));
                }
            });
        }).on('error', (e) => {
            reject(new Error(`Error: ${e.message}`)); 
        });
    });
}


async function insertIntervals(batch) {
    
    const queryText = `
        INSERT INTO intervals(id, date, driver_key, gap_to_leader, interval, session_key) 
        VALUES 
        ${batch.map((_, i) => `($${i * 6 + 1}, $${i * 6 + 2}, $${i * 6 + 3}, $${i * 6 + 4}, $${i * 6 + 5}, $${i * 6 + 6})`).join(', ')}
    `;

    // Valores da query
    const queryValues = [];
    batch.forEach(item => {
        queryValues.push(
            item.id,
            item.date,
            item.driver_number,
            item.gap_to_leader,
            item.interval,
            item.session_key
        );
    });

    try {
        await db.query(queryText, queryValues); 
    } catch (e) {
        console.error('Erro ao tentar inserir intervalo: ', e);
        throw e;
    }
}

// Função para obter todas as sessões
async function getAllSessions(url) {
    try {
        const sessionsData = await fetchData(url); 
        return sessionsData.map(session => session.session_key); 
    } catch (e) {
        console.error('Erro ao tentar obter sessões: ', e);
        throw e;
    }
}


async function getAllDataForSessions(sessions) {
    let allData = [];
    for (const sessionKey of sessions) {
        const url = `https://api.openf1.org/v1/intervals?session_key=${sessionKey}&interval<0.005`;
        try {
            const data = await fetchData(url); 
            if (data && data.length > 0) {
                allData = [...allData, ...data]; 
            }
        } catch (e) {
            console.error(`Erro ao tentar obter dados para a sessão ${sessionKey}: `, e);
        }
    }
    return allData; 
}

// Função principal
async function main() {
    try {
        const sessionKeys = await getAllSessions(sessionsUrl); 
        const intervalsData = await getAllDataForSessions(sessionKeys); 
        console.log(intervalsData.length);
        let intervals = [];

        for (const item of intervalsData) {
            if (
                item.gap_to_leader == null ||
                item.date == null ||
                item.driver_number == null ||
                item.interval == null ||
                item.session_key == null
            ) {
                continue;
            }
            intervals.push(item); 
        }

        console.log(intervals.length);
        await db.connect(); 
        await db.query('BEGIN'); 
        let counter = 0;
        let batch = [];

        for (const item of intervals) {
            const id = generateID(counter);
            counter++;
            item.id = id;
            batch.push(item);

            if (batch.length === BATCH_SIZE) {
                await insertIntervals(batch); 
                batch = [];
            }
        }

        
        if (batch.length > 0) {
            await insertIntervals(batch);
        }

        await db.query('COMMIT'); 
        console.log('Carga dos intervalos foi efetuada com sucesso!');
    } catch (e) {
        await db.query('ROLLBACK'); 
        console.error('Houve um erro: ', e);
    } finally {
        await db.end(); 
    }
}

main(); 
