import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TypeService {
  constructor(private databaseService: DatabaseService) {}

  async getAllTypes() {
    const query = '';
    return this.databaseService.query(query);
  }
}
