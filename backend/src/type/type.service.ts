import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import TypeDto from 'src/dto/Type.dto';

@Injectable()
export class TypeService {
  constructor(private databaseService: DatabaseService) {}

  async getAllTypes(): Promise<TypeDto[]> {
    const query = 'select * from type;';
    return this.databaseService.query(query).then((res) => res.rows);
  }
}
