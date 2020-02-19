// const mongoUtil = require('./mongoUtil.js/index.js')
const pkmn = require('./pokemon.js');
const { PerformanceObserver, performance } = require('perf_hooks');

const BATCH_SIZE = 100;
// let load = {
//     name: "Bulbasaur",
//     image: "imageURL",
//     primaryType: "Grass",
//     secondaryType: null,
//     natDexNum: 1,
//     regDexNum: 1,
//     gen: 1
// }

// mongoUtil.openConn(function (err, client) {
//     if (err) console.log(err);
//     let db = mongoUtil.getDb()
// });


// let pokemon = {
//     name: info.name,
//     primaryType: info.types.length > 1 ? info.types[1].type.name : info.types[0].type.name,
//     secondaryType: info.types.length > 1 ? info.types[0].type.name : null
// }

const myFunc = (batchSize,offset) => {
    pkmn.getPokemon(batchSize,offset).then(response => {
        console.log(response);
        if(response.next !== null){
            setTimeout(function() {
                return myFunc(BATCH_SIZE,offset + BATCH_SIZE);                
            }, 60000);
        }
    }).catch( (error) => {
        console.log(error);
    });
}
myFunc(BATCH_SIZE,0)

// pkmn.getPokemon(10,800).then(response => {
//     console.log(response);
// }).catch((error) => {
//     console.log(error);
// });

// pkmn.getPokemonBatch(10).then(response => {
//     console.log(response.data)
// });
// pkmn.getPokemon().then(response => {
//     let info = response.data


//     console.log(pokemon)
// });
