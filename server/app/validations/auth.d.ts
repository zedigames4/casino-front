import { Request, Response, NextFunction } from 'express';
export default class AuthValidate {
    static login(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    static signup(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    static update(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    static resetPassword(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    static forgetPassword(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    static verify(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
}
