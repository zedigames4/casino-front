import { Response } from 'express';
export default class ContactController {
    static getAll: (req: any, res: Response) => Promise<void>;
    static getOne: (req: any, res: Response) => Promise<void>;
    static create: (req: any, res: Response) => Promise<void>;
    static updateItem: (req: any, res: Response) => Promise<void>;
    static delete: (req: any, res: Response) => Promise<void>;
}
