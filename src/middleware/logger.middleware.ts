import { Injectable, NestMiddleware, HttpCode } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Logger } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    
    Logger.log(req.originalUrl, JSON.stringify({body:req.body, query:req.query}));
    next();
  }
}
