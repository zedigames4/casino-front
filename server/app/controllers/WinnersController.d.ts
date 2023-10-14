import { Response } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
export default class WinnersController {
    static encryptUser(user: Record<string, any>): string;
    static biggest: (req: RequestWithUser, res: Response) => Promise<void>;
    static latest: (req: RequestWithUser, res: Response) => Promise<void>;
}
