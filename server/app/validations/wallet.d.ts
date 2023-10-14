import { Request, Response, NextFunction } from 'express';
export default class WalletValidate {
    static create(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    static topup(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    static withdraw(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    static setMinimumBalance(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
}
