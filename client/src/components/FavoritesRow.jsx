import React from 'react';

const FavoritesRow = ({pokemon}) => {
  return (
    <div>
      <tr>
        <td><img src={pokemon.sprite}></img></td>
        <td>ID:{pokemon.id}</td>
        <td>Name:{pokemon.name}</td>
        <td>Height:{pokemon.height}</td>
        <td>Weight:{pokemon.weight}</td>
        <td>Type:{pokemon.type}</td>
      </tr>
    </div>
  );
}

export default FavoritesRow;