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
import PokemonCreateCard from "./lib/components/PokemonCreateCard";

const App = () => {
  const examplePokemon = new PokemonDto(
    25,
    "Pikachu",
    6,
    0.4,
    [new TypeDto(1, "Electric")],
    [
      new MoveDto(1, "Thunderbolt", 90, 100, 15, new TypeDto(1, "Electric")),
      new MoveDto(2, "Quick Attack", 40, 100, 30, new TypeDto(2, "Normal")),
      new MoveDto(2, "Quick Attack", 40, 100, 30, new TypeDto(2, "Normal")),
      new MoveDto(2, "Quick Attack", 40, 100, 30, new TypeDto(2, "Normal")),
      new MoveDto(2, "Quick Attack", 40, 100, 30, new TypeDto(2, "Normal")),
    ],
    [new AbilityDto(1, "Static"), new AbilityDto(2, "Lightning Rod")]
  );

  const [pokemonData, setPokemonData] = useState<PokemonDto[]>([examplePokemon, new PokemonDto()])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [abilitiesList, setAbilitiesList] = useState<AbilityDto[]>([
    new AbilityDto(1, "Static"),
    new AbilityDto(2, "Lightning Rod"),
  ]);

  const [movesList, setMovesList] = useState<MoveDto[]>([
    new MoveDto(1, "Thunder Shock", 40, 100, 30, new TypeDto(1, "Electric")),
    new MoveDto(2, "Quick Attack", 40, 100, 30, new TypeDto(1, "Normal")),
    new MoveDto(3, "Iron Tail", 100, 75, 15, new TypeDto(2, "Steel")),
  ]);

  const [typesList, setTypesList] = useState<TypeDto[]>([
    new TypeDto(1, "Electric"),
    new TypeDto(2, "Flying"),
    new TypeDto(3, "Fire"),
  ]);


  const handlePokemonUpdate = async (oldPokemon: PokemonDto, newPokemon: PokemonDto) => {
    try {
      const pokemon = await PokemonService.updatePokemon(oldPokemon.id, newPokemon); // Geçersiz ID

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



  const handleCreatePokemon = async (newPokemon: PokemonDto) => {
    try {
      const pokemon = await PokemonService.addPokemon(newPokemon); // Geçersiz ID

      setPokemonData((prevData) => [...prevData, newPokemon]);

      console.log(newPokemon);
    } catch (error: any) {
      console.error("Error fetching Pokémon:", error.message);
    }

  };

  const handleDeletePokemon = async (pokemon: PokemonDto) => {
    try {
      //const res = await PokemonService.deletePokemon(pokemon.id); // Geçersiz ID

      setPokemonData((prevData) => prevData.filter((p) => p.id !== pokemon.id));

      //console.log(res);
    } catch (error: any) {
      console.error("Error deleting Pokémon:", error.message);
    }

  };

  return (
    <div>
      <Header />
      <main className="p-4">
        <div className="p-4 bg-gray-50 min-h-screen flex flex-col justify-center">
          <DataTable columns={columns} data={pokemonData} onUpdate={handlePokemonUpdate} onDelete={handleDeletePokemon} />
          <div className="mt-4">
            <button
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              onClick={() => setIsCreateModalOpen(true)}
            >
              Add Pokémon
            </button>
          </div>
          {isCreateModalOpen && (
            <PokemonCreateCard
              isOpen={isCreateModalOpen}
              onClose={() => setIsCreateModalOpen(false)}
              abilities={abilitiesList}
              moves={movesList}
              types={typesList}
              onCreate={handleCreatePokemon}
            />
          )}
        </div>
      </main>
    </div>

  );
};

export default App;
