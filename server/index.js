const express = require('express');
const port = 3000;
// const cors = require('cors');
const bodyParser = require('body-parser');
const { Pokemon } = require('../database/index');
const db = require('../database/index');
let app = express();

// app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../public'));

// This route should pull all saved pokemons for rendering to the client
app.get('/pokemon', (request, response) => {
  db.getPokemonForServer((pokemons) => {
    response.send(pokemons);
  });
})
// This route will should save all pokemons to database
app.post('/pokemon', (request, response) => {
  const newPokemon = new Pokemon(request.body);
  newPokemon.save((error) => {
    if (error) {
      console.log('Save error from API app.post', error);
    } else {
      console.log('Pokemon is saved to mongoDB');
      response.status(201);
    }
  });
});
// This route should remove ONE pokemon from database
app.get('/:pokename', (req, res) => {
  let pokemon = req.params.pokename;
  db.removePokemonForServer(pokemon);
});



app.listen(port, () => {
  console.log(`Good news, server is connected on port ${port}`);
});