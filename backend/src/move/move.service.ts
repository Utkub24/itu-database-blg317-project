import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import MoveDto from 'src/dto/Move.dto';
import TypeDto from 'src/dto/Type.dto';

@Injectable()
export class MoveService {
  constructor(private databaseService: DatabaseService) {}

  async getAllMoves(): Promise<MoveDto[]> {
    const query = 'select move.move_id, move.name, move.power, move.accuracy, move.pp, type.type_id, type.type_name from move join type on move.type_id = type.type_id;';
    const moves = await this.databaseService.query(query).then((res) => res.rows);
    const all_moves = moves.map(move => new MoveDto(
      move.move_id,
      move.name,
      move.power,
      move.accuracy,
      move.pp,
      new TypeDto(move.type_id, move.type_name))
    );
    return all_moves;
  }
}
