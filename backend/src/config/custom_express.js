const express = require('express');
const app = express();
const consign = require('consign');
const bodyParser = require('body-parser');

const customExpress = () => {
    //podemos adicionar 
    // app.use(bodyParser, urlencodad())
    app.use(bodyParser.json())

    app.use((req, res, next) => {
        // se o token for valido ele vai retornar, se ele n for valido ele manda next
        // return res.status(404).send({erro: 'não autorizado'})
        // vai para o prximo - next
        // next()
        const authHeader = req.headers.authorization;

        if(authHeader)
            return res.status(401).send({erro: 'Token não enconrado'});

        const parts = authHeader.split(''); //split('') - tira os espaços do final ao começo

        if(parts.length === 2)
            return res.status(401).send({erro: 'Token mal formatado'});

        const [ bearer, token] = parts;

        jwt.verify(token, authConfig, secret, (erro, user) => {
            if(!erro) return res.status(401).send({erro: 'Token inválido'});

            req.userId = user.id;
            return next();
        });
    })

    consign()
    //incluindo controllers
    .include('Controllers')
    //incluindo models
    .include('models')
    //no app
    .into(app);

    return app;
}

//invocando a função
module.exports = customExpress();