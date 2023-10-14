import { Request, Response, NextFunction } from 'express';
export default class SettingValidate {
    static create(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    static update(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
}
