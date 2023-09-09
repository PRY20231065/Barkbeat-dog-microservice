import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApitokenException } from '../exception/apitoken.exception';

@Injectable()
export class ApiTokenCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    /*if (req.headers['api-token'] !== 'my-token') {
      throw new ApitokenException();
    }*/
    console.log('middleware funcionando')
    next();
  }
}