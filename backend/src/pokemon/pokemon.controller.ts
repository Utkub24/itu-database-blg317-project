import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import PokemonDto from 'src/dto/Pokemon.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get('all')
  async getAllPokemon(): Promise<PokemonDto[]> {
    try {
      return await this.pokemonService.getAllPokemon();
    }
    catch (error) {
      console.log(error);
      return error;
    }
  }

  @Get(':id')
  async getPokemonById(@Param('id') id: string): Promise<PokemonDto> {
    try {
      return await this.pokemonService.getPokemonById(id);
    }
    catch (error) {
      console.log(error);
      return error;
    }
  }

  @Post()
  async createPokemon(@Body() pokemonDto: any): Promise<any> {
    try {
      console.log("asd");
      return await this.pokemonService.createPokemon(pokemonDto);
    }
    catch (error) {
      console.log(error);
      return error;
    }
  }

  @Put(':id')
  async updatePokemon(@Body() pokemonDto: any, @Param('id') id: string): Promise<void> {
    try {
      return await this.pokemonService.updatePokemon(id, pokemonDto);
    }
    catch (error) {
      console.log(error);
      return error;
    }
  }

  @Delete(':id')
  async deletePokemon(@Param('id') id: string): Promise<void> {
    try {
      return await this.pokemonService.deletePokemon(id);
    }
    catch (error) {
      console.log(error);
      return error;
    }
  }

}
