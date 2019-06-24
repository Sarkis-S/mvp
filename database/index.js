
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/pokemon', { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Good news, you\'re connected to mongoDB');
});

const pokemonSchema = new mongoose.Schema({
  id: Number,
  name: String,
  sprite: String,
  height: Number,
  weight: Number,
  type: String
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);


let getPokemonForServer = (callback => {
  Pokemon.find(function(err, pokemons) {
    if (err) {
      console.log('You done goofed!');
    } else {
      callback(pokemons);
    }
  })
  // Control how many shows up to client
  // .limit(25)
});

let removePokemonForServer = (request, response) => {
  let currentPokemon = request;
  console.log('CURRENT POKEMON', currentPokemon);
  Pokemon.deleteOne({ name: currentPokemon }, function(error) {
    if (error) {
      console.log('ERROR deleting', error);
    } else {
      console.log('Deletion succeeded');
    }
  });
};

module.exports.getPokemonForServer = getPokemonForServer;
module.exports.removePokemonForServer = removePokemonForServer;
module.exports.Pokemon = Pokemon;
