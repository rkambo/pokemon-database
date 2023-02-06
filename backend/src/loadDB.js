const mongoUtil = require('./mongoUtil.js');
const pkmn = require('./pokemon.js');
let db;

const BATCH_SIZE = 50;

mongoUtil.openConn(function(err) {
  db = mongoUtil.getDb();
  if (err) console.log(err);
  console.log('Getting pokemon...');
  getAllPokemon(BATCH_SIZE, 0);
});

/**
 *
 * @param {*} response - The response body from getAllPokemon containing the pokemon information to insert into the database collection.
 *
 * @description - Inserts the entries into the MongoDB collection
 */
function insertPokemon(response) {
  response.pokemonInfo.forEach((doc) => {
    mongoUtil.insertDocuments(db, doc);
  });
}

/**
 *
 * @param {*} batchSize - The number of pokemon fetched with a request at once
 * @param {*} offset - The offset from the previous request
 *
 * @description - A recursive wrap for the getPokemon function. Runs every minute to avoid overloading the endpoint
 */
const getAllPokemon = (batchSize, offset) => {
  pkmn.getPokemon(batchSize, offset).then((response) => {
    console.log(response);
    insertPokemon(response);
    if (response.next !== null) {
      setTimeout(function() {
        return getAllPokemon(BATCH_SIZE, offset + BATCH_SIZE);
      }, 10000);
    }
  }).catch( (error) => {
    console.log(error);
  });
};
