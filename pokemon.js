const axios = require('axios');

const BATCH_SIZE = 10

async function getPokemonBatch(batchSize) {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${batchSize}`)
        return response
    } catch (error) {
        console.error(error)
    }
}
async function getPokemon() {
    try {
        getPokemonBatch(BATCH_SIZE).then(response => {
            console.log(response.data)

        })
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getPokemon
}