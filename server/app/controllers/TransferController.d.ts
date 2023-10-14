import { Response } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
export default class TransferController {
    static getAll: (req: any, res: Response) => Promise<void>;
    static getOne: (req: any, res: Response) => Promise<void>;
    static create: (req: RequestWithUser, res: Response) => Promise<void>;
}
