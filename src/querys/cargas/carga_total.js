const { spawn } = require('child_process');

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
        await runScript('./carga_sessions.js');
        console.log('Carga de sessions concluída.');
        
        await runScript('./carga_drivers.js');
        console.log('Carga de drivers concluída.');
        
        await runScript('./carga_intervals.js');
        console.log('Carga de intervals concluída.');
        
        await runScript('./carga_pit_stop.js');
        console.log('Carga de pit stops concluída.');
        
        await runScript('./carga_radio.js');
        console.log('Carga de radio concluída.');
        
        await runScript('./carga_weather.js');
        console.log('Carga de weather concluída.');
        
        console.log('Todas as cargas foram concluídas com sucesso!');
    } catch (error) {
        console.error('Erro ao executar as cargas:', error);
    }
}

// Chama a função para executar todos os scripts
runAllScripts();
