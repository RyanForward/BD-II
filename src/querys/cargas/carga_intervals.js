const https = require('https');
const db = require('../../conn');
const { generateID } = require('../tools/idGenerator');
const { performance } = require('perf_hooks');

const BATCH_SIZE = 1000;
const intervalsUrlTemplate = "https://api.openf1.org/v1/intervals?session_key=";

async function getSessionIdsFromDB() {
    const queryText = 'SELECT session_key FROM sessions';
    try {
        const res = await db.query(queryText);
        return res.rows.map(row => row.session_key);
    } catch (e) {
        console.error('Erro ao tentar obter sessões do banco de dados: ', e);
        throw e;
    }
}

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

async function getAllDataForSessions(sessions) {
    let allData = [];
    for (const sessionKey of sessions) {
<<<<<<< HEAD
        const url = `https://api.openf1.org/v1/intervals?session_key=${sessionKey}`;
=======
        const url = `${intervalsUrlTemplate}${sessionKey}`;
>>>>>>> ed49a5431c7e87870d4275a95dc5fdfef9df2228
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

async function main() {
    const totalStart = performance.now();
    try {
        await db.connect();

        const sessionStart = performance.now();
        const sessionKeys = await getSessionIdsFromDB();
        const sessionEnd = performance.now();
        console.log(`Tempo para obter as sessões do banco de dados: ${sessionEnd - sessionStart}ms`);

        const fetchStart = performance.now();
        const intervalsData = await getAllDataForSessions(sessionKeys);
        const fetchEnd = performance.now();
        console.log(`Tempo para buscar todos os dados das sessões: ${fetchEnd - fetchStart}ms`);
        console.log(intervalsData.length);

        let intervals = intervalsData.filter(item =>
            item.gap_to_leader != null &&
            item.date != null &&
            item.driver_number != null &&
            item.interval != null &&
            item.session_key != null
        );

        console.log(intervals.length);

        let counter = 0;
        const batches = intervals.reduce((acc, item) => {
            const id = generateID(counter);
            counter++;
            item.id = id;

            const lastBatch = acc[acc.length - 1];
            if (lastBatch && lastBatch.length < BATCH_SIZE) {
                lastBatch.push(item);
            } else {
                acc.push([item]);
            }

            return acc;
        }, []);

        for (const batch of batches) {
            const batchStart = performance.now();
            try {
                await db.query('BEGIN');
                await insertIntervals(batch);
                await db.query('COMMIT');
            } catch (e) {
                console.error('Erro ao tentar inserir lote de intervalos: ', e);
                await db.query('ROLLBACK');
            }
            const batchEnd = performance.now();
            console.log(`Tempo para inserir um lote de intervalos: ${batchEnd - batchStart}ms`);
        }

        console.log('Carga dos intervalos foi efetuada com sucesso!');
    } catch (e) {
        console.error('Houve um erro: ', e);
    } finally {
        const totalEnd = performance.now();
        await db.end();
        console.log(`Tempo total de execução: ${totalEnd - totalStart}ms`);
    }
}

main();
