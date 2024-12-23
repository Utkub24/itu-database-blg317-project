import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class MoveService {
  constructor(private databaseService: DatabaseService) {}

  async getAllMoves() {
    const query = '';
    return this.databaseService.query(query);
  }
}
