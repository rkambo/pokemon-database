const express = require('express');
const bodyParser = require('body-parser');
const searchDB = require('./searchDB.js');
const app = express();
require('dotenv').config({path: '\.env'});

const port = process.env.PORT || 3000;


app.use(bodyParser.json());


app.post('/searchPokemon', (req, res) => searchDB.search(req, res));

console.log(`App listening on port ${port}...`);
app.listen(port);
