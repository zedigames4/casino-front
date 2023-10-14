import { Request, Response, NextFunction } from 'express';
export default class MTNValidate {
    static requestPay(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    static transactionStatus(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
}
