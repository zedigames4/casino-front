import { Request, Response, NextFunction } from 'express';
export default class GameValidate {
    static create(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
}
