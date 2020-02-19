const express = require('express');
const app = express();
const authMid = require('./middlewares/auth')

// abrir a requisisão em outra porta
let allowCrossDomain = (req, res, next) => {

    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');

    return   next();
}

app.use(allowCrossDomain);
app.use(express.json());

const auth = require('./router/auth_routes');
const series = require('./router/series_routers');

app.use('/auth', auth);

app.use(authMid)

app.use('/series', series);

module.exports = app;