import mongoose from 'mongoose';
declare const Bet: mongoose.Model<{
    status: string;
    user: {
        prototype?: mongoose.Types.ObjectId;
        cacheHexString?: unknown;
        generate?: {};
        createFromTime?: {};
        createFromHexString?: {};
        isValid?: {};
    };
    game: {
        prototype?: mongoose.Types.ObjectId;
        cacheHexString?: unknown;
        generate?: {};
        createFromTime?: {};
        createFromHexString?: {};
        isValid?: {};
    };
    startTime?: Date;
    iWin?: number;
    iToBet?: number;
    playerData?: any;
    endingTime?: Date;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    status: string;
    user: {
        prototype?: mongoose.Types.ObjectId;
        cacheHexString?: unknown;
        generate?: {};
        createFromTime?: {};
        createFromHexString?: {};
        isValid?: {};
    };
    game: {
        prototype?: mongoose.Types.ObjectId;
        cacheHexString?: unknown;
        generate?: {};
        createFromTime?: {};
        createFromHexString?: {};
        isValid?: {};
    };
    startTime?: Date;
    iWin?: number;
    iToBet?: number;
    playerData?: any;
    endingTime?: Date;
}>>;
export default Bet;
export declare const getMonthlyTotals: (startDate: Date, endDate?: Date) => Promise<{
    totalIncome: number;
    totalExpense: number;
}>;
