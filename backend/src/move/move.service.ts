import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import MoveDto from 'src/dto/Move.dto';

@Injectable()
export class MoveService {
  constructor(private databaseService: DatabaseService) {}

  async getAllMoves(): Promise<MoveDto[]> {
    const query = 'select * from move;';
    return this.databaseService.query(query).then((res) => res.rows);
  }
}
