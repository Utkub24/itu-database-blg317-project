import { Controller, Get } from '@nestjs/common';
import { TypeService } from './type.service';

@Controller('type')
export class TypeController {
  constructor(private typeService: TypeService) {}

  @Get('all')
  async getAllTypes() {
    return this.typeService.getAllTypes();
  }
}
