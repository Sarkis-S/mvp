const express = require('express');
const port = 3000;
// const cors = require('cors');
const bodyParser = require('body-parser');
const { Pokemon } = require('../database/index');
let app = express();

// app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../public'));

// Create APIs HERE
app.post('/pokemon', (request, response) => {
  console.log('HERE IS THE POST REQUEST:', request.body);
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

app.listen(port, () => {
  console.log(`Good news, server is connected on port ${port}`);
});