import { Request, Response, NextFunction } from 'express';
export default class StatisticsValidate {
    static incomeExpenses(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
}
