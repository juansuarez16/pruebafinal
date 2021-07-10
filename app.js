const express = require('express');
const path = require('path');
const morgan = require('morgan');
const https = require('https');

const app = express();
const server = require('http').Server(app);





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