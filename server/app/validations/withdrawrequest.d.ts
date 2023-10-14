import { Request, Response, NextFunction } from 'express';
export default class WithdrawrequestValidate {
    static findAll(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    static create(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    static decide(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
}
