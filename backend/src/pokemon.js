const axios = require('axios');
const http = require('http');
const https = require('https');
const httpAgent = new http.Agent({ keepAlive: true });
const httpsAgent = new https.Agent({ keepAlive: true });
const pokeAPI = axios.create({
  timeout: 60000,
  httpsAgent : httpsAgent,
  httpAgent : httpAgent,
  baseURL : 'https://pokeapi.co/api/v2'
})

/**
 *
 * @param {Integer} batchSize - The size of the batch of pokemon to be returned
 * @param {Integer} offset - The offset from the previous batch
 *
 * @return {Promise} - Returns a promise containing the pokemon request data
 *
 * @description - Gets a batch of pokemon data
 */
const getPokemonBatch = async (batchSize, offset) => {
  try {
    const pokemonGenInfoBatchUrls = await pokeAPI.get(`/pokemon/?offset=${offset}&limit=${batchSize}`);
    const pokemonSpeciesInfoBatchUrls = await pokeAPI.get(`/pokemon-species/?offset=${offset}&limit=${batchSize}`);

    const pokemonGenInfoBatch = [];
    const pokemonSpeciesInfoBatch = [];
    const obj = {};
    obj.count = pokemonSpeciesInfoBatchUrls.data.count;
    obj.next = pokemonSpeciesInfoBatchUrls.data.next;
    obj.genInfo = [];
    obj.speciesInfo = [];

    pokemonGenInfoBatchUrls.data.results.forEach((element) => {
      pokemonGenInfoBatch.push(axios.get(element.url));
    });

    pokemonSpeciesInfoBatchUrls.data.results.forEach((element) => {
      pokemonSpeciesInfoBatch.push(axios.get(element.url));
    });

    const genInfoBatch = Promise.all(pokemonGenInfoBatch);
    const speciesInfoBatch = Promise.all(pokemonSpeciesInfoBatch);

    obj.genInfo = await genInfoBatch;
    obj.speciesInfo = await speciesInfoBatch;

    return Promise.resolve(obj);
  } catch (error) {
    return Promise.reject(error);
  }
};


/**
 *
 * @param {Integer} batchSize - The size of the batch of pokemon to be returned
 * @param {Integer} offset - The offset from the previous batch
 *
 * @return {Promise} - Response object containing readable information
 *
 * @description - Creates the readable payload based on API information
 *
 */
const getPokemon = async (batchSize, offset) => {
  try {
    const batch = await getPokemonBatch(batchSize, offset);
    const genInfo = batch.genInfo;
    const speciesInfo = batch.speciesInfo;
    const obj = {};
    obj.count = batch.count;
    obj.next = batch.next;
    obj.pokemonInfo = [];

    for (i = 0; i < speciesInfo.length; i++) {
      const dexEntriesRaw = speciesInfo[i].data.flavor_text_entries;
      const dexEntries = [];

      for (j = 0; j < dexEntriesRaw.length; j++) {
        if (dexEntriesRaw[j].language.name === 'en') {
          dexEntries.push({
            version: dexEntriesRaw[j].version.name,
            entry: dexEntriesRaw[j].flavor_text.replace(/[\f\r\t\n]+/g, ' ').trim(),
          });
        }
      }

      obj.pokemonInfo.push({
        'image': genInfo[i].data.sprites.front_default,
        'name': genInfo[i].data.name,
        'category': speciesInfo[i].data.genera[7].genus,
        'entries': dexEntries,
      });
    }
    return Promise.resolve(obj);
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = {
  getPokemon,
};
