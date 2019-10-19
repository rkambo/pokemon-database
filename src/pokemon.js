const axios = require('axios');

const BATCH_SIZE = 100;

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

/**
 * @return {Promise} - Returns an array of JSON objects containing the relevant pokemon information
 *
 * @description - Returns an object of information compiled from the API information
 */
const getPokemon = async () => {
  try {
    const pokemonBatch = await getPokemonBatch(BATCH_SIZE);
    const infoResponse = await Promise.all([getPokemonInfo(pokemonBatch[0].data), getPokemonInfo(pokemonBatch[1].data)]);
    const payload = [];

    for (i = 0; i < infoResponse[0].length; i++) {
      payload.push({
        'name': infoResponse[0][i].data.name,
        'category': infoResponse[1][i].data.genera[2].genus,
      });
    }
    return payload;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getPokemon,
};
