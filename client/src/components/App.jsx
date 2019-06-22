
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }

    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
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

      </div>
    );
  }
}

export default App;
