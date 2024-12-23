import React, { useEffect, useState } from "react";
import PokemonDto from "./lib/dto/Pokemon.dto";
import TypeDto from "./lib/dto/Type.dto";
import MoveDto from "./lib/dto/Move.dto";
import AbilityDto from "./lib/dto/Ability.dto";
import PokemonCard from "./lib/components/PokemonCard";
import { DataTable } from "./lib/pokemon-table/data-table";

import { columns } from "@/lib/pokemon-table/columns"
import Header from "./lib/components/Header";
import PokemonService from "./lib/services/PokemonService";

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

  const [pokemonData, setPokemonData] = useState<PokemonDto[]>([examplePokemon, new PokemonDto()])



  const handlePokemonUpdate = async(oldPokemon: PokemonDto, newPokemon: PokemonDto) => {
    try {
      //const pokemon = await PokemonService.updatePokemon(oldPokemon.id, newPokemon); // Geçersiz ID

      setPokemonData((prevPokemonData) =>
        prevPokemonData.map((pokemon) =>
          pokemon.id === oldPokemon.id ? newPokemon : pokemon
        )
      );

      console.log(newPokemon);
    } catch (error: any) {
      console.error("Error fetching Pokémon:", error.message);
    }
  };

  

  return (
    <div>
      <Header />
      <main className="p-4">
        <div className="p-4 bg-gray-50 min-h-screen flex flex-col justify-center">
          <DataTable columns={columns} data={pokemonData} onUpdate={handlePokemonUpdate} />
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Edit Pokémon
          </button>
        </div>
      </main>
    </div>

  );
};

export default App;
