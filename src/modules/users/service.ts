import { IUser, UserDocument } from './model';
import users from './schema';
import * as bcrypt from "bcryptjs";

export default class UserService {
    
    static async create(userParams: IUser) {
        const document = new users(userParams);
        const user = await document.save();
        return user
    }

    static async find(query: any) {
        const document = <UserDocument> await users.findOne(query)
        
        if(!document) {
            throw new Error("Usuário não encontrado")
        }

        return document
    }

    static hashPassword(password: string): string {
        return bcrypt.hashSync(password, 8);
    }

    static isPasswordValid(password: string, hash: string) {
        return bcrypt.compareSync(password, hash);
    }

    public async updateUser(id: string, user_params: IUser) {
        const query = { _id: id };
        const document = <UserDocument> await users.findOneAndUpdate(query, user_params);

        return document;
    }
    
    public async deleteUser(id: String): Promise<void> {
        const query = { _id: id };
        await users.deleteOne(query);
    }

}