import React from 'react';
import FavoritesRow from './FavoritesRow.jsx';

const FavoritesTable = ({pokemons}) => (
  <table>
    <tbody>
      {pokemons.map((pokemon) => {
        return <FavoritesRow pokemon={pokemon} />
      })}
    </tbody>
  </table>
)

export default FavoritesTable;
