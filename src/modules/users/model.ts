import { Document } from "mongoose";
import { ModificationNote } from "../common/model";

export interface IUser {
    _id?: string;
    name: {
        first_name: string;
        middle_name: string;
        last_name: string;
    };
    email: string;
    password: string,
    is_deleted?: boolean;
    modification_notes: ModificationNote[]
}

export type UserDocument = IUser & Document