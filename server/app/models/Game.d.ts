import mongoose from 'mongoose';
declare const Game: mongoose.Model<{
    images: any[];
    url?: string;
    title?: string;
    description?: string;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    images: any[];
    url?: string;
    title?: string;
    description?: string;
}>>;
export default Game;
