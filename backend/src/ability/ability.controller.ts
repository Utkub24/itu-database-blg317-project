import { Controller, Get } from '@nestjs/common';
import { AbilityService } from './ability.service';

@Controller('ability')
export class AbilityController {
  constructor(private abilityService: AbilityService) {}

  @Get('all')
  async getAllAbilities() {
    return this.abilityService.getAllAbilities();
  }
}
