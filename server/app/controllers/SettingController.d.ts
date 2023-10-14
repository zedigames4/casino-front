import { Response } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
export default class SettingController {
    static getAll: (req: RequestWithUser, res: Response) => Promise<void>;
    static getOne: (req: RequestWithUser, res: Response) => Promise<void>;
    static create: (req: RequestWithUser, res: Response) => Promise<void>;
    static updateItem: (req: RequestWithUser, res: Response) => Promise<void>;
    static delete: (req: RequestWithUser, res: Response) => Promise<void>;
}
