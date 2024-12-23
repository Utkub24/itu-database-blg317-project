import { Controller, Get } from '@nestjs/common';
import { MoveService } from './move.service';
import MoveDto from 'src/dto/Move.dto';

@Controller('move')
export class MoveController {
  constructor(private moveService: MoveService) {}

  @Get('all')
  async getAllMoves(): Promise<MoveDto[]> {
    return this.moveService.getAllMoves();
  }  
}
