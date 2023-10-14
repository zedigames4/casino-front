import { Response } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
export default class PlaynowController {
    static play: (req: RequestWithUser, res: Response) => Promise<void>;
    static startGame: (req: RequestWithUser, res: Response) => Promise<void>;
}
