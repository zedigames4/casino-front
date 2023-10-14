import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
declare const authMiddleware: (req: any, res: Response, next: NextFunction) => Promise<void>;
export declare const allowedRoles: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
export default authMiddleware;
