import mongoose from 'mongoose';
declare const Contact: mongoose.Model<{
    message: string;
    name: string;
    email: string;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    message: string;
    name: string;
    email: string;
}>>;
export default Contact;
