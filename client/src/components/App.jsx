
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      pokemon: ''
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleNameChangeClick = this.handleNameChangeClick.bind(this);
  }

  componentDidMount() {
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
          location: requestedPokemonInfo.data.location_area_encounters
        }
        this.setState({ pokemon: currentPokemon });
      })
      .catch(error => {
        console.log('Caught error from handleNameChangeClick:', error);
      })
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleNameChangeClick() {
    let requestedPokemon = this.state.name;
    axios.get(`http://pokeapi.co/api/v2/pokemon/${requestedPokemon}/`)
      .then(response => {
        let requestedPokemonInfo = response;
        let currentPokemon = {
          id: requestedPokemonInfo.data.id,
          name: requestedPokemonInfo.data.name,
          sprite: requestedPokemonInfo.data.sprites.front_default,
          height: requestedPokemonInfo.data.height,
          weight: requestedPokemonInfo.data.weight,
          type: requestedPokemonInfo.data.types[0].type.name,
          location: requestedPokemonInfo.data.location_area_encounters
        }
        this.setState({ pokemon: currentPokemon });
      })
      .catch(error => {
        console.log('Caught error from handleNameChangeClick:', error);
      })
  }

  render() {
    return (
      <div>
          
        <div className="pokemonName">Pokémon Name</div>
        <input type="text" name="name" value={this.state.value}
          onChange={ (e) => {this.handleNameChange(e)} }>
        </input>
        <br></br>
        <button type="button" className="getPokemon" onClick={this.handleNameChangeClick}>
          GET Pokémon
        </button>

        <div>
          <div><img src={this.state.pokemon.sprite}></img></div>
          <div>ID: {this.state.pokemon.id}</div>
          <div>Name: {this.state.pokemon.name}</div>
          <div>Height: {this.state.pokemon.height}</div>
          <div>Weight: {this.state.pokemon.weight}</div> 
          <div>Type: {this.state.pokemon.type}</div>
          {/* <div>Location:{this.state.pokemon.location}</div> */}
          
        </div>

      </div>
    );
  }
}

export default App;
