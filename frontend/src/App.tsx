import React, { useState } from "react";
import PokemonDto from "./lib/dto/Pokemon.dto";
import TypeDto from "./lib/dto/Type.dto";
import MoveDto from "./lib/dto/Move.dto";
import AbilityDto from "./lib/dto/Ability.dto";
import PokemonCard from "./lib/components/PokemonCard";
import { DataTable } from "./lib/pokemon-table/data-table";

import { columns } from "@/lib/pokemon-table/columns"

const App = () => {
  const examplePokemon = new PokemonDto(
    25,
    "Pikachu",
    6,
    0.4,
    [new TypeDto("Electric")],
    [
      new MoveDto(1, "Thunderbolt", 90, 100, 15, new TypeDto("Electric")),
      new MoveDto(2, "Quick Attack", 40, 100, 30, new TypeDto("Normal")),
    ],
    [new AbilityDto(1, "Static"), new AbilityDto(2, "Lightning Rod")]
  );

  const pokemonData = [examplePokemon, new PokemonDto()];

  const handlePokemonUpdate = (oldPokemon: PokemonDto, newPokemon: PokemonDto) => {

  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen flex flex-col justify-center">
      <DataTable columns={columns} data={pokemonData} onUpdate={handlePokemonUpdate} />
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Edit Pokémon
      </button>
    </div>
  );
};

export default App;
