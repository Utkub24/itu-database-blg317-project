import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import PokemonDto from 'src/dto/Pokemon.dto';
import TypeDto from 'src/dto/Type.dto';
import AbilityDto from 'src/dto/Ability.dto';
import MoveDto from 'src/dto/Move.dto';

@Injectable()
export class PokemonService {

  constructor(private readonly databaseService: DatabaseService) {}

  async getAllPokemon() {
    const query = 'select * from pokemon;';
    return await this.databaseService.query(query).then(res => res.rows);
  }

  async getPokemonById(id: string) {
    const pokemon_query = 'select * from pokemon where pokemon_id = $1;';
    const pokemon = await this.databaseService.query(pokemon_query, [id]).then(res => res.rows);

    const moves_query = 'select move.move_id, move.name from move join pokemon_moves on move.move_id = pokemon_moves.move_id where pokemon_moves.pokemon_id = $1;';
    const moves = await this.databaseService.query(moves_query, [id]).then(res => res.rows);    

    const abilities_query = 'select ability.ability_id, ability.name from ability join pokemon_abilities on ability.ability_id = pokemon_abilities.ability_id where pokemon_abilities.pokemon_id = $1;';
    const abilities = await this.databaseService.query(abilities_query, [id]).then(res => res.rows);

    const types_query = 'select type.type_id, type.type_name from type join pokemon_types on type.type_id = pokemon_types.type_id where pokemon_types.pokemon_id = $1;';
    const types = await this.databaseService.query(types_query, [id]).then(res => res.rows);

    const pokemonDto = new PokemonDto(
      pokemon[0].id,
      pokemon[0].name,
      pokemon[0].weight,
      pokemon[0].height,
      types.map(type => new TypeDto(type.type_id, type.type_name)),
      moves.map(move => new MoveDto(move.mode_id, move.name)),
      abilities.map(ability => new AbilityDto(ability.ability_id, ability.name))
    );
    return pokemonDto;
  }

  async createPokemon() {
    const query = '';
    return await this.databaseService.query(query);
  }

  async updatePokemon(id: string) {
    const query = '';
    return await this.databaseService.query(query, [id]);
  }

  async deletePokemon(id: string) {
    const query = '';
    return await this.databaseService.query(query, [id]);
  }

  async getRandomPokemon() {
    const query = '';
    return await this.databaseService.query(query);
  }
}
