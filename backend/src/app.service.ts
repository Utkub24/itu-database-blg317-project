import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  V(): string {
    return 'V'; // V for Vendetta
  }
}
