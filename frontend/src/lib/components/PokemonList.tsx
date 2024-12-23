import { useState } from "react";
import PokemonDto from "../dto/Pokemon.dto";

interface PokemonListEntryProps {
  pokemon: PokemonDto;
}

interface PokemonListProps {
  pokemons: PokemonDto[];
}

export function PokemonListEntry({ pokemon }: PokemonListEntryProps) {
  return (
    <div className="bg-neutral-800">
      {pokemon.name}
    </div>
  )
}

export default function PokemonList({ pokemons }: PokemonListProps) {
  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="bg-sky-700">
          <h1> Pokemon Database </h1>
        </div>
        <div className="flex flex-col gap-2">
          {pokemons.map((p) => {
            return <PokemonListEntry pokemon={p} />
          })}
        </div>
      </div>
    </>
  )
}

