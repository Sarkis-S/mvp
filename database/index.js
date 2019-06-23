
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


module.exports.Pokemon = Pokemon;
