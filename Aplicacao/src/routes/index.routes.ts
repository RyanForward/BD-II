const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/teste', 
    //autenticar usuário,
    //validar dados enviados através de um validator,
    //chamar a função controller
    ()=>{console.log('Aqui será a rota para o relatório')
})

app.listen(3000, () => {
    console.log('Server on!')
});
