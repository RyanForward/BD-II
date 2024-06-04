const { spawn } = require('child_process');
const path = require('path');

// Função para executar um script e retornar uma Promise que resolve quando o script termina
function runScript(script) {
    return new Promise((resolve, reject) => {
        const process = spawn('node', [script]);

        process.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        process.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        process.on('close', (code) => {
            if (code !== 0) {
                reject(new Error(`Process ${script} exited with code ${code}`));
            } else {
                resolve();
            }
        });
    });
}

// Executar os scripts em sequência
async function runAllScripts() {
    try {
        const scripts = [
            './carga_sessions.js',
            './carga_drivers.js',
            './carga_pit_stop.js',
            './carga_radio.js',
            './carga_weather.js',
            './carga_intervals.js'
        ];

        for (const script of scripts) {
            await runScript(path.resolve(__dirname, script));
            console.log(`Carga de ${path.basename(script, '.js')} concluída.`);
        }

        console.log('Todas as cargas foram concluídas com sucesso!');
    } catch (error) {
        console.error('Erro ao executar as cargas:', error);
    }
}

// Chama a função para executar todos os scripts
runAllScripts();
