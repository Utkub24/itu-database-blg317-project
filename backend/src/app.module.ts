import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonService } from './pokemon/pokemon.service';
import { PokemonController } from './pokemon/pokemon.controller';
import { DatabaseService } from './database/database.service';
import { AbilityService } from './ability/ability.service';
import { AbilityController } from './ability/ability.controller';
import { MoveService } from './move/move.service';
import { MoveController } from './move/move.controller';
import { TypeService } from './type/type.service';
import { TypeController } from './type/type.controller';

@Module({
  imports: [],
  controllers: [AppController, PokemonController, AbilityController, MoveController, TypeController],
  providers: [AppService, PokemonService, DatabaseService, AbilityService, MoveService, TypeService],
})
export class AppModule {}
