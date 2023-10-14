import { Response } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
export default class UserController {
    static getOne: (req: RequestWithUser, res: Response) => Promise<void>;
    static updateReferralCode: (req: RequestWithUser, res: Response) => Promise<void>;
    static updateItem: (req: RequestWithUser, res: Response) => Promise<void>;
    static delete: (req: RequestWithUser, res: Response) => Promise<void>;
}
