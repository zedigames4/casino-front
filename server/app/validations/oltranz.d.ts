import { Request, Response, NextFunction } from 'express';
export default class OltranzValidate {
    static requestPay(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    static transfer(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    static transactionStatus(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    static transferTransactionStatus(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
}
