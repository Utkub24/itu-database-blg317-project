import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class PokemonService {

  constructor(private readonly databaseService: DatabaseService) {}

  async getAllPokemon() {
    const query = '';
    return await this.databaseService.query(query);
  }

  async getPokemonById(id: string) {
    const query = '';
    return await this.databaseService.query(query, [id]);
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
