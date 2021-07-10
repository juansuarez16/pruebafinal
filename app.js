const express = require('express');
const path = require('path');
const morgan = require('morgan');
const https = require('https');
const helmet = require('helmet');
const app = express();
const server = require('http').Server(app);
const cors = require('cors');

app.use(helmet());
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}));


//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true }));

const routes = require("./routes/rutas.routes");
const config = require("./config");

app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.json());

app.use(routes);


server.listen(config.settings.PORT, () => {
    console.log(`Running server in port ${config.settings.PORT}`);
});