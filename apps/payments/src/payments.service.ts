import { Injectable } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

@Injectable()
export class PaymentsService {
  constructor(private readonly logger: Logger) {}

  
}
