import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import PokemonDto from 'src/dto/Pokemon.dto';
import TypeDto from 'src/dto/Type.dto';
import AbilityDto from 'src/dto/Ability.dto';
import MoveDto from 'src/dto/Move.dto';

@Injectable()
export class PokemonService {

  constructor(private readonly databaseService: DatabaseService) {}

  async getAllPokemon(): Promise<PokemonDto[]> {
    const query = 'select * from pokemon;';
    return await this.databaseService.query(query).then(res => res.rows);
  }

  async getPokemonById(id: string): Promise<PokemonDto> {
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

  async createPokemon(pokemonDto: any): Promise<any> {
    const id_query = 'SELECT MAX(pokemon_id) FROM pokemon;';
    const pokemon_id = await this.databaseService.query(id_query).then(res => res.rows[0].max + 1);

    const pokemon_query = 'insert into pokemon (pokemon_id, name, weight, height) values ($1, $2, $3, $4);';
    const pokemon = await this.databaseService.query(
      pokemon_query,
      [pokemon_id, pokemonDto.name, pokemonDto.weight, pokemonDto.height]
    );

    const moves_query = 'INSERT INTO pokemon_moves VALUES ($1, $2, $3);';
    for (const move of pokemonDto.moves) {
      await this.databaseService.query(moves_query, [pokemon_id, move.id, 1]);
    }

    const abilities_query = 'INSERT INTO pokemon_abilities VALUES ($1, $2, $3);';
    for (const ability of pokemonDto.abilities) {
      await this.databaseService.query(abilities_query, [pokemon_id, ability.id, false]);
    }

    const types_query = 'INSERT INTO pokemon_types VALUES ($1, $2, $3);';
    let is_primary = true;
    for (const type of pokemonDto.types) {
      await this.databaseService.query(types_query, [pokemon_id, type.id, is_primary]);
      if (is_primary) {
        is_primary = false;
      }
    }

    return {pokemonId: pokemon_id};
  }

  async updatePokemon(id: string, pokemonDto: any): Promise<void> {
    const query = 'update pokemon set (name = $2, height = $3, weight = $4) where pokemon_id = $1;';
    await this.databaseService.query(query, [id, pokemonDto.name, pokemonDto.height, pokemonDto.weight]);
  }

  async deletePokemon(id: string): Promise<void> {
    const pokemon_query = 'DELETE FROM pokemon WHERE pokemon_id = $1;';
    await this.databaseService.query(pokemon_query, [id]);

    const moves_query = 'DELETE FROM pokemon_moves WHERE pokemon_id = $1;';
    await this.databaseService.query(moves_query, [id]);

    const abilities_query = 'DELETE FROM pokemon_abilities WHERE pokemon_id = $1;';
    await this.databaseService.query(abilities_query, [id]);

    const types_query = 'DELETE FROM pokemon_types WHERE pokemon_id = $1;';
    await this.databaseService.query(types_query, [id]);
  }
}
