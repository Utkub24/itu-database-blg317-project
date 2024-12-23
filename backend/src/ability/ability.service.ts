import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AbilityService {
  constructor(private databaseService: DatabaseService) {}

  async getAllAbilities() {
    const query = 'select * from ability;';
    return this.databaseService.query(query).then((res) => res.rows);
  }
}
