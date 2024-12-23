import axios from "axios";
import { handleRequest } from "./RequestHandler";
import PokemonDto from "../dto/Pokemon.dto";
import TypeDto from "../dto/Type.dto";
import MoveDto from "../dto/Move.dto";
import AbilityDto from "../dto/Ability.dto";

const API_BASE_URL = "http://localhost:3000";

const PokemonService = {
  getAllPokemons: async (): Promise<PokemonDto[]> =>
    handleRequest(async () => {
      const response = await axios.get(`${API_BASE_URL}/pokemon/all`);
      return response.data.map(
        (pokemon: any) =>
          new PokemonDto(
            pokemon.pokemon_id,
            pokemon.name,
            pokemon.weight,
            pokemon.height,
            //pokemon.types.map((type: any) => new TypeDto(type.id, type.name)),
            //pokemon.moves.map(
            //  (move: any) =>
            //    new MoveDto(
            //      move.id,
            //      move.name,
            //      move.power,
            //      move.accuracy,
            //      move.pp,
            //      new TypeDto(move.type.id, move.type.name)
            //    )
            //),
            //pokemon.abilities.map(
            //  (ability: any) => new AbilityDto(ability.id, ability.name)
            //)
          )
      );
    }),

  getPokemonById: async (pokemonId: number): Promise<PokemonDto> =>
    handleRequest(async () => {
      const response = await axios.get(`${API_BASE_URL}/pokemon/${pokemonId}`);
      const pokemon = response.data;
      return new PokemonDto(
        pokemon.pokemon_id,
        pokemon.name,
        pokemon.weight,
        pokemon.height,
        pokemon.types.map((type: any) => new TypeDto(type.id, type.name)),
        pokemon.moves.map(
          (move: any) =>
            new MoveDto(
              move.id,
              move.name,
              move.power,
              move.accuracy,
              move.pp,
              new TypeDto(move.type.id, move.type.name)
            )
        ),
        pokemon.abilities.map(
          (ability: any) => new AbilityDto(ability.id, ability.name)
        )
      );
    }),

  addPokemon: async (newPokemon: PokemonDto): Promise<number> =>
    handleRequest(async () => {
      const response = await axios.post(`${API_BASE_URL}/pokemon`, newPokemon);
      return response.data.pokemonId; // pokemonId'yi return ediyoruz
    }),

  updatePokemon: async (pokemonId: number, updatedPokemon: PokemonDto) =>
    handleRequest(() =>
      axios.put(`${API_BASE_URL}/pokemon/${pokemonId}`, updatedPokemon)
    ),

  deletePokemon: async (pokemonId: number) =>
    handleRequest(() =>
      axios.delete(`${API_BASE_URL}/pokemon/${pokemonId}`)
    ),

  getPokemonsByType: async (typeId: number): Promise<PokemonDto[]> =>
    handleRequest(async () => {
      const response = await axios.get(`${API_BASE_URL}/pokemon/type/${typeId}`);
      return response.data.map(
        (pokemon: any) =>
          new PokemonDto(
            pokemon.pokemon_id,
            pokemon.name,
            pokemon.weight,
            pokemon.height,
            pokemon.types.map((type: any) => new TypeDto(type.id, type.name)),
            pokemon.moves.map(
              (move: any) =>
                new MoveDto(
                  move.id,
                  move.name,
                  move.power,
                  move.accuracy,
                  move.pp,
                  new TypeDto(move.type.id, move.type.name)
                )
            ),
            pokemon.abilities.map(
              (ability: any) => new AbilityDto(ability.id, ability.name)
            )
          )
      );
    }),

  getAllTypes: async (): Promise<TypeDto[]> =>
    handleRequest(async () => {
      const response = await axios.get(`${API_BASE_URL}/type/all`);
      return response.data.map((type: any) => new TypeDto(type.id, type.name));
    }),

  getAllMoves: async (): Promise<MoveDto[]> =>
    handleRequest(async () => {
      const response = await axios.get(`${API_BASE_URL}/move/all`);
      return response.data.map(
        (move: any) =>
          new MoveDto(
            move.id,
            move.name,
            move.power,
            move.accuracy,
            move.pp,
            new TypeDto(move.type.id, move.type.name)
          )
      );
    }),

  getAllAbilities: async (): Promise<AbilityDto[]> =>
    handleRequest(async () => {
      const response = await axios.get(`${API_BASE_URL}/ability/all`);
      return response.data.map(
        (ability: any) => new AbilityDto(ability.id, ability.name)
      );
    }),
};

export default PokemonService;
