import { HttpStatus } from '@nestjs/common';
import { AppException } from './AppExpection';

export class GeneralException extends AppException {
  constructor(message: string) {
    super(HttpStatus.BAD_REQUEST, 'GeneralException', message);
  }
}
