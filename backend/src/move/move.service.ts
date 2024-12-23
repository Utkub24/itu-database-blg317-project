import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class MoveService {
  constructor(private databaseService: DatabaseService) {}

  async getAllMoves() {
    const query = 'select * from move;';
    return this.databaseService.query(query).then((res) => res.rows);
  }
}
