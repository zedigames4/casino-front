import { NextFunction, Request, Response } from 'express';
declare class AuthController {
    static signUp: (req: Request, res: Response) => Promise<void>;
    static logIn: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    static logOut: (req: any, res: Response) => Promise<void>;
    static createToken(id: string, email: string, role: string, firstName: string): {
        expiresIn: string;
        token: string;
    };
    static createCookie(tokenData: any): string;
    static decode: (token: string) => string | import("jsonwebtoken").JwtPayload;
    static forgettingPassword(req: Request, res: Response): Promise<void>;
    static resetingPassword(req: Request, res: Response): Promise<void>;
    static confirmAccount(req: Request, res: Response): Promise<void>;
    static generateReferralCode(): string;
}
export default AuthController;
