import { Response } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
export default class StatController {
    static incomeExpense: (req: RequestWithUser, res: Response) => Promise<void>;
    static getChartData: (req: RequestWithUser, res: Response) => Promise<void>;
}
