const mongoUtil = require("./mongoUtil.js");
require("dotenv").config({ path: ".env" });
let db;

const pokemonCollection = process.env.DB_POKEMON_COLLECTION;
const typeCollection = process.env.DB_TYPE_COLLECTION;

mongoUtil.openConn(function (err) {
  db = mongoUtil.getDb();
  if (err) console.log(err);
});

const dbHealthCheck = async (req, res) => {
  const results = await mongoUtil.getFirstDoc(db);
  if (results != null) {
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
};

const searchPokemon = async (req, res) => {
  const query = req.body.name;
  const results = await mongoUtil.findDocuments(db, pokemonCollection, query);
  res.send({ results: results });
};

const searchTypes = async (req, res) => {
  const query = req.body.name;
  const results = await mongoUtil.findDocuments(db, typeCollection, query);
  res.send({ results: results });
};

const getFirstEntry = async (req, res) => {
  res.send({ results: await mongoUtil.getTopEntry(db) });
};
module.exports = {
  searchPokemon,
  searchTypes,
  dbHealthCheck,
  getFirstEntry,
};
