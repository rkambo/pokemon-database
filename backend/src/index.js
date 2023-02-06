const express = require('express');
const bodyParser = require('body-parser');
const searchDB = require('./searchDB.js');
const cors = require('cors');
const app = express();
require('dotenv').config({path: '\.env'});

const port = process.env.PORT || 3001;


app.use(bodyParser.json());
app.use(cors());


app.post('/searchPokemon', (req, res) => searchDB.search(req, res));

console.log(`App listening on port ${port}...`);
app.listen(port);
