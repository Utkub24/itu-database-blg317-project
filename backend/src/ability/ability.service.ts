import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import AbilityDto from 'src/dto/Ability.dto';

@Injectable()
export class AbilityService {
  constructor(private databaseService: DatabaseService) {}

  async getAllAbilities(): Promise<AbilityDto[]> {
    const query = 'select * from ability;';
    return this.databaseService.query(query).then((res) => res.rows);
  }
}
