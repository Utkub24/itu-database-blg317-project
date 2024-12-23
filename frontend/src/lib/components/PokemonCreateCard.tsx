import React, { useState } from "react";
import PokemonDto from "../dto/Pokemon.dto";

interface PokemonCreateCardProps {
  isOpen: boolean;
  onClose: () => void;
  abilities: { id: number; name: string }[];
  moves: { id: number; name: string }[];
  types: { id: number; name: string }[];
  onCreate: (newPokemon: PokemonDto) => Promise<void>;
}

const PokemonCreateCard: React.FC<PokemonCreateCardProps> = ({
  isOpen,
  onClose,
  abilities,
  moves,
  types,
  onCreate,
}) => {
  const [newPokemon, setNewPokemon] = useState<PokemonDto>({
    id: Date.now(),
    name: "",
    weight: 0,
    height: 0,
    types: [],
    moves: [],
    abilities: [],
  });

  if (!isOpen) return null;

  const handleChange = (field: keyof PokemonDto, value: string | number) => {
    setNewPokemon({ ...newPokemon, [field]: value });
  };

  const handleSelect = (field: "types" | "moves" | "abilities", id: number) => {
    setNewPokemon((prev) => {
      const isSelected = prev[field].some((item: any) => item.id === id);
      if (isSelected) {
        return {
          ...prev,
          [field]: prev[field].filter((item: any) => item.id !== id),
        };
      }
      const selectedItem =
        field === "types"
          ? types.find((t) => t.id === id)
          : field === "moves"
          ? moves.find((m) => m.id === id)
          : abilities.find((a) => a.id === id);

      return {
        ...prev,
        [field]: [...prev[field], selectedItem],
      };
    });
  };

  const handleCreate = () => {
    onCreate(newPokemon).then(() => onClose());
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-6 relative">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Create New Pokémon</h2>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            ✖
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="max-h-[70vh] overflow-y-auto pr-4">
          <ul className="space-y-2">
            {/* Name */}
            <li className="flex justify-between text-gray-700">
              <span className="font-medium">Name:</span>
              <input
                type="text"
                maxLength={40}
                value={newPokemon.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="border rounded-md p-1 text-sm w-2/3"
              />
            </li>

            {/* Weight */}
            <li className="flex justify-between text-gray-700">
              <span className="font-medium">Weight (kg):</span>
              <input
                type="number"
                min={0}
                value={newPokemon.weight}
                onChange={(e) => handleChange("weight", parseFloat(e.target.value))}
                className="border rounded-md p-1 text-sm w-2/3"
              />
            </li>

            {/* Height */}
            <li className="flex justify-between text-gray-700">
              <span className="font-medium">Height (m):</span>
              <input
                type="number"
                min={0}
                value={newPokemon.height}
                onChange={(e) => handleChange("height", parseFloat(e.target.value))}
                className="border rounded-md p-1 text-sm w-2/3"
              />
            </li>

            {/* Types */}
            <li className="flex flex-col text-gray-700">
              <span className="font-medium mb-1">Types:</span>
              <div className="flex flex-wrap gap-2">
                {types.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleSelect("types", type.id)}
                    className={`px-2 py-1 rounded-md text-sm ${
                      newPokemon.types.some((t) => t.id === type.id)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {type.name}
                  </button>
                ))}
              </div>
            </li>

            {/* Moves */}
            <li className="flex flex-col text-gray-700">
              <span className="font-medium mb-1">Moves:</span>
              <div className="flex flex-wrap gap-2">
                {moves.map((move) => (
                  <button
                    key={move.id}
                    onClick={() => handleSelect("moves", move.id)}
                    className={`px-2 py-1 rounded-md text-sm ${
                      newPokemon.moves.some((m) => m.id === move.id)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {move.name}
                  </button>
                ))}
              </div>
            </li>

            {/* Abilities */}
            <li className="flex flex-col text-gray-700">
              <span className="font-medium mb-1">Abilities:</span>
              <div className="flex flex-wrap gap-2">
                {abilities.map((ability) => (
                  <button
                    key={ability.id}
                    onClick={() => handleSelect("abilities", ability.id)}
                    className={`px-2 py-1 rounded-md text-sm ${
                      newPokemon.abilities.some((a) => a.id === ability.id)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {ability.name}
                  </button>
                ))}
              </div>
            </li>
          </ul>
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            onClick={handleCreate}
          >
            Create
          </button>
          <button
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PokemonCreateCard;
