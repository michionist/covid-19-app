// import environmental variables from our variables.env file
require('dotenv').config({
    path: '.env'
});

// XML Converter
const o2x = require('object-to-xml');

// import our data
const data = require('./data');

// import app models file
const impactEstimator = require('./src/estimator');

const express = require('express');

// READY?! Let's go!
const app = express();

// Instal and set body-parser to use
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: false
}))

// Homepage
app.get('/', function (req, res) {
    res.send('Welcome to COVID-19 Estimator app');
});

app.post('/api/v1/on-covid-19/:resDataType', function (req, res) {
    const data = req.body;
    if (req.params.resDataType === "xml") {
        res.send(typeof impactEstimator(data));
    }

    console.log(data);

    res.json(
        impactEstimator(data)
    );



});

app.post('*', function (req, res) {
    res.send("You've met an API dead end!");
});


app.post('*', function (req, res) {
    res.json(impactEstimator(data));
});

app.set('port', process.env.PORT);
const server = app.listen(app.get('port'), () => {
    console.debug(`Express running → PORT ${server.address().port}`);
});