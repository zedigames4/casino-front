import mongoose from 'mongoose';
declare const Wallet: mongoose.Model<{
    user: {
        prototype?: mongoose.Types.ObjectId;
        cacheHexString?: unknown;
        generate?: {};
        createFromTime?: {};
        createFromHexString?: {};
        isValid?: {};
    };
    minimumBalance: number;
    isMain: boolean;
    expenses: number;
    income: number;
    balance: number;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    user: {
        prototype?: mongoose.Types.ObjectId;
        cacheHexString?: unknown;
        generate?: {};
        createFromTime?: {};
        createFromHexString?: {};
        isValid?: {};
    };
    minimumBalance: number;
    isMain: boolean;
    expenses: number;
    income: number;
    balance: number;
}>>;
export default Wallet;
