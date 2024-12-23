import React, { useEffect, useState } from "react";
import PokemonDto from "../dto/Pokemon.dto";
import MoveCard from "./MoveCard";
import PokemonService from "../services/PokemonService";

interface PokemonCardProps {
  isOpen: boolean;
  onClose: () => void;
  pokemon: PokemonDto;
  updatePokemon: (updatedPokemon: PokemonDto) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  isOpen,
  onClose,
  pokemon,
  updatePokemon,
}) => {
  const [renderPokemon, setRenderPokemon] = useState({ ...pokemon });
  const [editedPokemon, setEditedPokemon] = useState({ ...pokemon });
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  if (!isOpen) return null;

  useEffect(() => {
    let hasFetched = false;

    const fetchData = async () => {
      if (hasFetched) return;

      try {
        // fetch full pokemon data
        const fullPokemon = await PokemonService.getPokemonById(pokemon.id);
        setRenderPokemon(fullPokemon)
      } catch (error: any) {
        console.error("Error fetching data", error)
      }

      hasFetched = true;
    };

    fetchData();
  }, [])

  const handleChange = (field: keyof PokemonDto, value: string | number) => {
    setEditedPokemon({ ...editedPokemon, [field]: value });
    setIsDirty(true);
  };

  const handleUpdate = () => {
    updatePokemon(editedPokemon);
    setIsEditMode(false);
    setIsDirty(false);
    onClose();
  };

  const handleClose = () => {
    if (isDirty && !window.confirm("Changes have not been saved. Close anyway?")) {
      return;
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-6 relative">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Pokémon Details</h2>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={handleClose}
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
              {isEditMode ? (
                <input
                  type="text"
                  maxLength={40}
                  value={renderPokemon.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="border rounded-md p-1 text-sm w-2/3"
                />
              ) : (
                <span>{renderPokemon.name}</span>
              )}
            </li>

            {/* Weight */}
            <li className="flex justify-between text-gray-700">
              <span className="font-medium">Weight (kg):</span>
              {isEditMode ? (
                <input
                  type="number"
                  min={0}
                  value={editedPokemon.weight}
                  onChange={(e) =>
                    handleChange("weight", parseFloat(e.target.value))
                  }
                  className="border rounded-md p-1 text-sm w-2/3"
                />
              ) : (
                <span>{renderPokemon.weight}</span>
              )}
            </li>

            {/* Height */}
            <li className="flex justify-between text-gray-700">
              <span className="font-medium">Height (m):</span>
              {isEditMode ? (
                <input
                  type="number"
                  min={0}
                  value={editedPokemon.height}
                  onChange={(e) =>
                    handleChange("height", parseFloat(e.target.value))
                  }
                  className="border rounded-md p-1 text-sm w-2/3"
                />
              ) : (
                <span>{renderPokemon.height}</span>
              )}
            </li>

            {/* Types */}
            <li className="flex flex-col text-gray-700">
              <span className="font-medium mb-1">Types:</span>
              <div className="flex flex-wrap gap-2">
                {(renderPokemon.types || []).map((type, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 px-2 py-1 rounded-md text-sm"
                  >
                    {type.name}
                  </span>
                ))}
              </div>
            </li>

            {/* Abilities */}
            <li className="flex flex-col text-gray-700">
              <span className="font-medium mb-1">Abilities:</span>
              <div className="flex flex-wrap gap-2">
                {(renderPokemon.abilities || []).map((ability, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 px-2 py-1 rounded-md text-sm"
                  >
                    {ability.name}
                  </span>
                ))}
              </div>
            </li>

            {/* Moves */}
            <li className="flex flex-col text-gray-700">
              <span className="font-medium mb-1">Moves:</span>
              <div className="space-y-2">
                {(renderPokemon.moves || []).map((move) => (
                  <MoveCard key={move.id} move={move} />
                ))}
              </div>
            </li>
          </ul>
        </div>

        {/* Update and Cancel Buttons */}
        {isEditMode && (
          <div className="flex justify-end space-x-2 mt-4">
            <button
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              onClick={handleUpdate}
            >
              Update
            </button>
            <button
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              onClick={() => {
                setEditedPokemon({ ...renderPokemon });
                setIsEditMode(false);
                setIsDirty(false);
              }}
            >
              Cancel
            </button>
          </div>
        )}

        {!isEditMode && (
          <div className="flex justify-end pt-2">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={() => setIsEditMode(true)}
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonCard;
