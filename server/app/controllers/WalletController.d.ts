import { Response } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
export default class WalletController {
    static getAll: (req: RequestWithUser, res: Response) => Promise<void>;
    static getMyWallet: (req: RequestWithUser, res: Response) => Promise<void>;
    static getOne: (req: any, res: Response) => Promise<void>;
    static create: (req: RequestWithUser, res: Response) => Promise<void>;
    static topup: (req: RequestWithUser, res: Response) => Promise<void>;
    static withdraw: (req: RequestWithUser, res: Response) => Promise<void>;
    static setMinimuBalance(req: RequestWithUser, res: Response): Promise<void>;
    static setMainWallet(req: RequestWithUser, res: Response): Promise<void>;
}
