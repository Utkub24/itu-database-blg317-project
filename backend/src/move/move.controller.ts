import { Controller, Get } from '@nestjs/common';
import { MoveService } from './move.service';

@Controller('move')
export class MoveController {
  constructor(private moveService: MoveService) {}

  @Get('all')
  async getAllMoves() {
    return this.moveService.getAllMoves();
  }  
}
