import axios from "axios";
import { handleRequest } from "./RequestHandler";

const API_BASE_URL = "https://your-backend-api.com";

const PokemonService = {
    getAllPokemons: async () =>
        handleRequest(() => axios.get(`${API_BASE_URL}/pokemon/all`)),

    getPokemonById: async (pokemonId: number) =>
        handleRequest(() =>
            axios.get(`${API_BASE_URL}/pokemon/${pokemonId}`)
        ),

    addPokemon: async (newPokemon: any) =>
        handleRequest(async () => {
            const response = await axios.post(`${API_BASE_URL}/pokemon`, newPokemon);
            const pokemonId = response.data.pokemonId; // API'nin döndürdüğü id'yi alıyoruz
            return pokemonId; // pokemonId'yi return ediyoruz}
        }),

    updatePokemon: async (pokemonId: number, updatedPokemon: any) =>
        handleRequest(() =>
            axios.put(`${API_BASE_URL}/pokemon/${pokemonId}`, updatedPokemon)
        ),

    deletePokemon: async (pokemonId: number) =>
        handleRequest(() =>
            axios.delete(`${API_BASE_URL}/pokemon/${pokemonId}`)
        ),

    getPokemonsByType: async (typeId: number) =>
        handleRequest(() =>
            axios.get(`${API_BASE_URL}/pokemon/type/${typeId}`)
        ),

    getPokemonsByMove: async (moveId: number) =>
        handleRequest(() =>
            axios.get(`${API_BASE_URL}/pokemon/move/${moveId}`)
        ),

    getPokemonsByAbility: async (abilityId: number) =>
        handleRequest(() =>
            axios.get(`${API_BASE_URL}/pokemon/ability/${abilityId}`)
        ),

    getTypeEffectivenessByType: async (typeId: number) =>
        handleRequest(() =>
            axios.get(`${API_BASE_URL}/pokemon/type-effectiveness/${typeId}`)
        ),

    getAllTypes: async () =>
        handleRequest(() => axios.get(`${API_BASE_URL}/type/all`)),

    getAllMoves: async () =>
        handleRequest(() => axios.get(`${API_BASE_URL}/move/all`)),

    getAllAbilities: async () =>
        handleRequest(() => axios.get(`${API_BASE_URL}/ability/all`)),

    getAllTypeEffectivenesses: async () =>
        handleRequest(() =>
            axios.get(`${API_BASE_URL}/type-effectiveness/all`)
        ),
};

export default PokemonService;
