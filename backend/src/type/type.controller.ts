import { Controller, Get } from '@nestjs/common';
import { TypeService } from './type.service';
import TypeDto from 'src/dto/Type.dto';

@Controller('type')
export class TypeController {
  constructor(private typeService: TypeService) {}

  @Get('all')
  async getAllTypes(): Promise<TypeDto[]> {
    return this.typeService.getAllTypes();
  }
}
