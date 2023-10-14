import { Request, Response } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
export default class GameController {
    static getAll: (req: Request, res: Response) => Promise<void>;
    static getOne: (req: Request, res: Response) => Promise<void>;
    static create: (req: RequestWithUser, res: Response) => Promise<void>;
    static updateItem: (req: RequestWithUser, res: Response) => Promise<void>;
    static delete: (req: Request, res: Response) => Promise<void>;
}
