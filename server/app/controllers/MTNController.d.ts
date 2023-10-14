import { Response } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
export default class MTNController {
    static requestPay: (req: RequestWithUser, res: Response) => Promise<void>;
    static transactionStatus: (req: RequestWithUser, res: Response) => Promise<void>;
}
