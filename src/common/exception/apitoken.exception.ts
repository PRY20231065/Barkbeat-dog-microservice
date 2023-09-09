import { HttpException, HttpStatus } from '@nestjs/common';

export class ApitokenException extends HttpException {
  constructor() {
    super('Token suggest payment is required', HttpStatus.PAYMENT_REQUIRED);
  }
}