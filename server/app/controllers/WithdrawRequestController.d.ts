import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
export default class WithdrawRequestController {
    static getAll: (req: RequestWithUser, res: Response) => Promise<void>;
    static getOne: (req: any, res: Response) => Promise<void>;
    static create: (req: RequestWithUser, res: Response) => Promise<void>;
    static decide: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
}
