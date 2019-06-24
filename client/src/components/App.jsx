
import React from 'react';
import axios from 'axios';
import FavoritesTable from './FavoritesTable.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      pokemon: '',
      description: '',
      favorites: []
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleNameChangeClick = this.handleNameChangeClick.bind(this);
    this.handleSavePokemon = this.handleSavePokemon.bind(this);
    this.handleGetAllPokemon = this.handleGetAllPokemon.bind(this);
    this.handleRemovePokemon = this.handleRemovePokemon.bind(this);
  }
  // LIFE CYCLE METHODS
  componentDidMount() {
    let requestedPokemonId = 0;
    axios.get(`http://pokeapi.co/api/v2/pokemon/pikachu/`)
      .then(response => {
        let requestedPokemonInfo = response;
        let currentPokemon = {
          id: requestedPokemonInfo.data.id,
          name: requestedPokemonInfo.data.name,
          sprite: requestedPokemonInfo.data.sprites.front_default,
          height: requestedPokemonInfo.data.height,
          weight: requestedPokemonInfo.data.weight,
          type: requestedPokemonInfo.data.types[0].type.name,
        }
        this.setState({ pokemon: currentPokemon });
        requestedPokemonId = requestedPokemonInfo.data.id;
      })
      .then(() => {
        axios.get(`http://pokeapi.co/api/v2/characteristic/${requestedPokemonId}/`)
          .then(response => {
            console.log('Description:', response.data.descriptions[1].description);
            this.setState({ description: response.data.descriptions[1].description});
          })
          // This is when PokeAPI doesn't have description
          .catch(error => {
            this.setState({ description: 'No data from PokéAPI'})
            console.log('Caught error from handleNameChangeClick GET characterstic with', error);
          })
      })
      .finally(() => {
        this.handleGetAllPokemon();
      })
      .catch(error => {
        console.log('Caught error from handleNameChangeClick:', error);
      })
  }
  // ALL THE METHODS
  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleNameChangeClick() {
    let requestedPokemon = this.state.name;
    let requestedPokemonId = 0;
    // GET POKEMON DETAILS
    axios.get(`http://pokeapi.co/api/v2/pokemon/${requestedPokemon}/`)
      .then(response => {
        let requestedPokemonInfo = response;
        let currentPokemon = {
          id: requestedPokemonInfo.data.id,
          name: requestedPokemonInfo.data.name,
          sprite: requestedPokemonInfo.data.sprites.front_default,
          height: requestedPokemonInfo.data.height,
          weight: requestedPokemonInfo.data.weight,
          type: requestedPokemonInfo.data.types[0].type.name
        }
        this.setState({ pokemon: currentPokemon });
        requestedPokemonId = requestedPokemonInfo.data.id;
      })
      .then(() => {
        // GET POKEMON DESCRIPTION
        axios.get(`http://pokeapi.co/api/v2/characteristic/${requestedPokemonId}/`)
          .then(response => {
            console.log('Description:', response.data.descriptions[1].description);
            this.setState({ description: response.data.descriptions[1].description});
          })
          // This is when PokeAPI doesn't have descriptions
          .catch(error => {
            this.setState({ description: 'No data from PokéAPI'})
            console.log('Caught error from handleNameChangeClick GET characterstic with', error);
          })
      })
      .catch(error => {
        console.log('Caught error from handleNameChangeClick:', error);
      })
  }

  handleSavePokemon() {
    console.log('POST REQUEST', this.state.pokemon);
    axios.post('/pokemon', this.state.pokemon)
      .then(()=> {
        console.log('Successful post');
      })
      .catch((error) => {
        console.log('ERROR:', error);
      })
      this.handleGetAllPokemon();
  }

  handleGetAllPokemon() {
    axios.get('/pokemon', () => {
    })
    .then((data) => {
      this.setState({ favorites: data.data });
    })
  }

  handleRemovePokemon() {
    let currentPokemon = this.state.pokemon.name;
    console.log('I want to remove ', currentPokemon);
    axios.get(`/${currentPokemon}`, () => {
    })
    .then(() => {
      console.log('Attempting to set pokemon free...');
    })
    .catch((error) => {
      console.log('Pokemon refuses to leave your side!');
    })
    this.handleGetAllPokemon();
  }

  // RENDER THE CODE
  render() {
    return (
      <div>
        <div className="pokemonName"><center>Pokémon Name</center></div>
        <center>
          <input type="text" className="inputBox" value={this.state.value}
            onChange={ (e) => {this.handleNameChange(e)} }>
          </input>
        </center>
        <br></br>
        <div className="buttons">
          <button type="button" className="getPokemon" onClick={this.handleNameChangeClick}>
            GET Pokémon
          </button>
          <button type="button" className="savePokemon" onClick={this.handleSavePokemon}>
            Save Pokémon
          </button>
        </div>

        <center>
          <div className="mainBox">
            <div><img src={this.state.pokemon.sprite}></img></div>
            <div>ID: {this.state.pokemon.id}</div>
            <div>Name: {this.state.pokemon.name}</div>
            <div>Height: {this.state.pokemon.height}</div>
            <div>Weight: {this.state.pokemon.weight}</div> 
            <div>Type: {this.state.pokemon.type}</div>
            <div>Description: {this.state.description}</div>
          </div>
        </center>
        <center>
          <button type="button" className="removePokemon" onClick={this.handleRemovePokemon}>
            Remove Pokémon
          </button>
        </center>
        <center>
          <FavoritesTable pokemons={this.state.favorites} />
        </center>
      </div>
    );
  }
}

export default App;
