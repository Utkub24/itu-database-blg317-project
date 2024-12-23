import React, { useState } from "react";
import PokemonDto from "./lib/dto/Pokemon.dto";
import TypeDto from "./lib/dto/Type.dto";
import MoveDto from "./lib/dto/Move.dto";
import AbilityDto from "./lib/dto/Ability.dto";
import PokemonCard from "./lib/components/PokemonCard";

const App = () => {
  const [isModalOpen, setModalOpen] = useState(true);

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

  const updatePokemon = (updatedPokemon: PokemonDto) => {
    console.log("Updated Pokémon:", updatedPokemon);
    setModalOpen(false);
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen flex items-center justify-center">
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        onClick={() => setModalOpen(true)}
      >
        Edit Pokémon
      </button>

      <PokemonCard
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        pokemon={examplePokemon}
        updatePokemon={updatePokemon}
      />
    </div>
  );
};

export default App;
