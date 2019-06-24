import React from 'react';

const FavoritesRow = ({pokemon}) => {
  return (
    <tr>
      <td><img src={pokemon.sprite}></img></td>
      <td><b>ID:</b> {pokemon.id},</td>
      <td><b>Name:</b> {pokemon.name},</td>
      <td><b>Height:</b> {pokemon.height},</td>
      <td><b>Weight:</b> {pokemon.weight},</td>
      <td><b>Type:</b> {pokemon.type}</td>
    </tr>
  );
}

export default FavoritesRow;