import { Request, Response } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
export default class BetController {
    static getAll: (req: RequestWithUser, res: Response) => Promise<void>;
    static publicGetAll: (req: Request, res: Response) => Promise<void>;
    static getOne: (req: RequestWithUser, res: Response) => Promise<void>;
    static create: (req: RequestWithUser, res: Response) => Promise<void>;
    static updateItem: (req: RequestWithUser, res: Response) => Promise<void>;
    static delete: (req: RequestWithUser, res: Response) => Promise<void>;
}
