import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    fullName: string;
    email: string;
    password: string;
    createdAt?: Date;
}
export interface IUpdateUser extends Document {
    fullName?: string;
    email?: string;
    password?: string;
    updatedAt?: Date;
}

const UserSchema: Schema = new Schema({
    fullName: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    createdAt: {
        type: mongoose.Schema.Types.Date,
        default: Date.now,
    },
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;