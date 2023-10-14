import { Request, Response, NextFunction } from 'express';
export default class TransferValidate {
    static create(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    static getAll(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
}
