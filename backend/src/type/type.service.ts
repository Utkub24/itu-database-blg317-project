import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TypeService {
  constructor(private databaseService: DatabaseService) {}

  async getAllTypes() {
    const query = 'select * from type;';
    return this.databaseService.query(query).then((res) => res.rows);
  }
}
