import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
declare class UsersController {
    static getReferrals(req: Request, res: Response): Promise<void>;
    static getUsers: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    static getUserById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    static createUser: (req: Request, res: Response) => Promise<void>;
    static updateUser: (req: RequestWithUser, res: Response) => Promise<void>;
    static deleteUser: (req: Request, res: Response) => Promise<void>;
}
export default UsersController;
