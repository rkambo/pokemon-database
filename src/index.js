// const mongoUtil = require('./mongoUtil.js/index.js')
const pkmn = require('./pokemon.js');

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

pkmn.getPokemon().then(console.log);
// pkmn.getPokemonBatch(10).then(response => {
//     console.log(response.data)
// });
// pkmn.getPokemon().then(response => {
//     let info = response.data


//     console.log(pokemon)
// });
