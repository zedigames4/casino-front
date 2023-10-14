import mongoose from 'mongoose';
declare const User: mongoose.Model<{
    referrer: mongoose.Types.ObjectId;
    role: "user" | "admin" | "manager";
    firstName: string;
    verified: boolean;
    email: string;
    password: string;
    referralCode: string;
    invitedFriends: mongoose.Types.ObjectId[];
    lastName?: string;
    phoneNumber?: string;
    avatar?: string;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    referrer: mongoose.Types.ObjectId;
    role: "user" | "admin" | "manager";
    firstName: string;
    verified: boolean;
    email: string;
    password: string;
    referralCode: string;
    invitedFriends: mongoose.Types.ObjectId[];
    lastName?: string;
    phoneNumber?: string;
    avatar?: string;
}>>;
export default User;
