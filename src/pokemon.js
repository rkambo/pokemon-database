const axios = require('axios');

const BATCH_SIZE = 10;

/**
 *
 * @param {Integer} batchSize - The size of the batch of pokemon info to obtain at once
 * @return {Promise} - A promise with an array of size 2 containing the API endpoints
 *
 * @description This function will get as many API endpoints for pokemon information as the batch size dictates
 */
const getPokemonBatch = async (batchSize) => {
  try {
    const pokemonGeneralInfoBatch = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${batchSize}`);
    const pokemonSpeciesInfoBatch = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/?limit=${batchSize}`);

    return Promise.all([pokemonGeneralInfoBatch, pokemonSpeciesInfoBatch]);
  } catch (error) {
    throw error;
  }
};

/**
 *
 * @param {JSON} batchInfo - A response object sent back from the getPokemonBatch function
 * @return {Promise} - Returns all corresponding pokemon info
 *
 * @description - Obtains the pokemon information
 */
const getPokemonInfo = async (batchInfo) => {
  try {
    const pokemonInfo = [];

    batchInfo.results.forEach((element) => {
      pokemonInfo.push(axios.get(`${element.url}`));
    });

    return Promise.all(pokemonInfo);
  } catch (error) {
    throw error;
  }
};

getPokemonBatch(BATCH_SIZE).then((response) => {
  getPokemonInfo(response[0].data)
      .then((genInfoResponse) => {
        getPokemonInfo(response[1].data)
            .then( (speciesInfoResponse) => {
              const payload = [];
              for (i = 0; i < genInfoResponse.length; i++) {
                payload.push({
                  'name': genInfoResponse[i].data.name,
                  'category': speciesInfoResponse[i].data.genera[2].genus,
                });
              }
              return payload;
            }).catch((error) => {
              console.error(error);
            });
      }).catch((error) => {
        console.error(error);
      });
}).catch((err) => {
  console.error(err);
});

// async function getPokemon() {
//   try {
//     getPokemonBatch(BATCH_SIZE).then((response) => {
//       console.log(response.data);
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }

module.exports = {
  // getPokemon,
};
