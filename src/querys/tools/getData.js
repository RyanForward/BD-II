async function getData(url) {
    try {
        const fetch = await import('node-fetch').then(mod => mod.default);
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

module.exports = { getData };
