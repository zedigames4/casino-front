import { Response } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
export default class OltranzController {
    static requestPay: (req: RequestWithUser, res: Response) => Promise<void>;
    static handleRequestToPayCallback: (req: RequestWithUser, res: Response) => Promise<void>;
    static handleTransferCallback: (req: RequestWithUser, res: Response) => Promise<void>;
    static transfer: (req: RequestWithUser, res: Response) => Promise<void>;
}
