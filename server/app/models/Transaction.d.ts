import mongoose from 'mongoose';
declare const Transaction: mongoose.Model<{
    total: number;
    action: "withdraw" | "deposit" | "transfer";
    status: "FAILURE" | "PENDING" | "SUCCESSFUL" | "FAILED" | "UNKNOWN_ACCOUNT" | "TIMEOUT" | "DECLINED" | "ERRONEOUS" | "INVALID_PIN" | "ACCOUNT_NOT_ACTIVE" | "BELOW_MINIMUM_ALLOWED_AMOUNT" | "NO_SUFFICIENT_FUNDS" | "ACCOUNT_NOT_FOUND" | "ABOVE_MAXIMUM_ALLOWED_AMOUNT" | "DUPLICATED_TRANSACTION_ID";
    user: {
        prototype?: mongoose.Types.ObjectId;
        cacheHexString?: unknown;
        generate?: {};
        createFromTime?: {};
        createFromHexString?: {};
        isValid?: {};
    };
    currency: "RWF";
    amount: number;
    chargedCommission: number;
    paidAmount: number;
    commission: number;
    transferedAmount: number;
    receiver?: {
        prototype?: mongoose.Types.ObjectId;
        cacheHexString?: unknown;
        generate?: {};
        createFromTime?: {};
        createFromHexString?: {};
        isValid?: {};
    };
    referenceId?: string;
    mode?: string;
    adminWallet?: {
        prototype?: mongoose.Types.ObjectId;
        cacheHexString?: unknown;
        generate?: {};
        createFromTime?: {};
        createFromHexString?: {};
        isValid?: {};
    };
    withdrawRequestId?: {
        prototype?: mongoose.Types.ObjectId;
        cacheHexString?: unknown;
        generate?: {};
        createFromTime?: {};
        createFromHexString?: {};
        isValid?: {};
    };
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    total: number;
    action: "withdraw" | "deposit" | "transfer";
    status: "FAILURE" | "PENDING" | "SUCCESSFUL" | "FAILED" | "UNKNOWN_ACCOUNT" | "TIMEOUT" | "DECLINED" | "ERRONEOUS" | "INVALID_PIN" | "ACCOUNT_NOT_ACTIVE" | "BELOW_MINIMUM_ALLOWED_AMOUNT" | "NO_SUFFICIENT_FUNDS" | "ACCOUNT_NOT_FOUND" | "ABOVE_MAXIMUM_ALLOWED_AMOUNT" | "DUPLICATED_TRANSACTION_ID";
    user: {
        prototype?: mongoose.Types.ObjectId;
        cacheHexString?: unknown;
        generate?: {};
        createFromTime?: {};
        createFromHexString?: {};
        isValid?: {};
    };
    currency: "RWF";
    amount: number;
    chargedCommission: number;
    paidAmount: number;
    commission: number;
    transferedAmount: number;
    receiver?: {
        prototype?: mongoose.Types.ObjectId;
        cacheHexString?: unknown;
        generate?: {};
        createFromTime?: {};
        createFromHexString?: {};
        isValid?: {};
    };
    referenceId?: string;
    mode?: string;
    adminWallet?: {
        prototype?: mongoose.Types.ObjectId;
        cacheHexString?: unknown;
        generate?: {};
        createFromTime?: {};
        createFromHexString?: {};
        isValid?: {};
    };
    withdrawRequestId?: {
        prototype?: mongoose.Types.ObjectId;
        cacheHexString?: unknown;
        generate?: {};
        createFromTime?: {};
        createFromHexString?: {};
        isValid?: {};
    };
}>>;
export default Transaction;
