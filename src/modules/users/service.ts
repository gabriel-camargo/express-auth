import { IUser } from './model';
import users from './schema';
import * as bcrypt from "bcryptjs";

export default class UserService {
    
    static async createUser(user_params: IUser) {
        const session = new users(user_params);
        const user = await session.save();
        return user
    }

    static hashPassword(password: string): string {
        return bcrypt.hashSync(password, 8);
    }

    static filterUser(query: any, callback: any) {
        users.findOne(query, callback);
    }

    static isPasswordValid(password: string, hash: string) {
        return bcrypt.compareSync(password, hash);
      }

    public updateUser(user_params: IUser, callback: any) {
        const query = { _id: user_params._id };
        users.findOneAndUpdate(query, user_params, callback);
    }
    
    public deleteUser(_id: String, callback: any) {
        const query = { _id: _id };
        users.deleteOne(query, callback);
    }

}