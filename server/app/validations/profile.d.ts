import { Request, Response, NextFunction } from 'express';
export default class ProfileValidate {
    static update(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
}
