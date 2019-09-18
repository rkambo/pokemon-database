const axios = require('axios');

const BATCH_SIZE = 1;


// async function getPokemonInfo() {
//   const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${batchSize}`);
//   response.then({

//   }).catch((err) => {
//     console.log(err);
//   });
// }

/**
 *
 * @param {Integer} batchSize - The size of the batch of pokemon info to obtain at once
 */
const getPokemonInfo = async (batchSize) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${batchSize}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

getPokemonInfo(BATCH_SIZE).then( (response) => {
    console.log(response);
}).catch({

});

/**
 *
 * @param {Integer} batchSize - The size of the batch of pokemon info to obtain at once
 */
async function getPokemonBatch(batchSize) {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${batchSize}`);
    return response;
  } catch (error) {
    console.error(error);
  }
}
/**
 * Tester function for logging pokemon response data
 */
async function getPokemon() {
  try {
    getPokemonBatch(BATCH_SIZE).then((response) => {
      console.log(response.data);
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getPokemon,
};
