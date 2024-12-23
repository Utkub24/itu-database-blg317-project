import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get('all')
  async getAllPokemon() {
    try {
      return await this.pokemonService.getAllPokemon();
    }
    catch (error) {
      return error;
    }
  }

  @Get(':id')
  async getPokemonById(@Param('id') id: string) {
    try {
      return await this.pokemonService.getPokemonById(id);
    }
    catch (error) {
      return error;
    }
  }

  @Post()
  async createPokemon() {
    try {
      return await this.pokemonService.createPokemon();
    }
    catch (error) {
      return error;
    }
  }

  @Put(':id')
  async updatePokemon(@Param('id') id: string) {
    try {
      return await this.pokemonService.updatePokemon(id);
    }
    catch (error) {
      return error;
    }
  }

  @Delete(':id')
  async deletePokemon(@Param('id') id: string) {
    try {
      return await this.pokemonService.deletePokemon(id);
    }
    catch (error) {
      return error;
    }
  }

  @Get('random')
  async getRandomPokemon() {
    try {
      return await this.pokemonService.getRandomPokemon();
    }
    catch (error) {
      return error;
    }
  }

}
