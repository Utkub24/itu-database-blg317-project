import { Controller, Get } from '@nestjs/common';
import { AbilityService } from './ability.service';
import AbilityDto from 'src/dto/Ability.dto';

@Controller('ability')
export class AbilityController {
  constructor(private abilityService: AbilityService) {}

  @Get('all')
  async getAllAbilities(): Promise<AbilityDto[]> {
    return this.abilityService.getAllAbilities();
  }
}
