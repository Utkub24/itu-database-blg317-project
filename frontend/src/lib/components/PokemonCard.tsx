import { useState } from "react";
import PokemonDto from "../dto/Pokemon.dto";
import TypeDto from "../dto/Type.dto";
import MoveDto from "../dto/Move.dto";
import MoveCard from "./MoveCard";

function PokemonCard() {
  const [pokemon, setPokemon] = useState(new PokemonDto())

  pokemon.types.push(new TypeDto())


  return (
    <ul className="flex flex-row gap-2">
      <li>Name: {pokemon.name} </li>
      <li>Weight: {pokemon.weight} </li>
      <li>Height: {pokemon.height} </li>
      <li>Types: {pokemon.types.map((t) => `${t.name} `)} </li>
      <li>Moves: {pokemon.moves.map((m) => {
        return <MoveCard move={m} />
      })}
      </li>
      <li>Abilities: {pokemon.abilities.map((a) => {
        return a.name;
      })} </li>
    </ul>
  )
}

export default PokemonCard;
