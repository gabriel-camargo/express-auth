import {
    Request,
    Response
} from "express";
import * as jwt from "jsonwebtoken";
import { mongoError, successResponse } from "./../modules/common/service";
import { IUser } from "./../modules/users/model";
import UserService from "./../modules/users/service";

class AuthController {
    static signIn = async (req: Request, res: Response) => {
        //Check if username and password are set
        let { email,  password } = req.body;
        
        if (!(email && password)) {
            res.status(400).send();
        }

        const user_filter = { email };
        UserService.filterUser(user_filter, (err: any, user_data: IUser) => {
            if (err) {
                mongoError(err, res);
            } else {
                if(user_data) {
                    if(!UserService.isPasswordValid(password, user_data.password)) {
                        res.status(401).send();
                    }
    
                    const token = jwt.sign({
                        userId: user_data._id,
                        username: user_data.email
                    },
                    process.env.SECRET ?? '', {
                        expiresIn: "1h"
                    });
    
                    res.status(200).send({token});
                } else {
                    res.status(404).send();
                }                
            }
        });
    };

    static signUp = async (req: Request, res: Response) => {
        const user_params: IUser = {
            name: {
                first_name: req.body.name.first_name,
                middle_name: req.body.name.middle_name,
                last_name: req.body.name.last_name
            },
            email: req.body.email,
            password: req.body.password,
            modification_notes: [{
                modified_on: new Date(Date.now()),
                modification_note: 'New user created'
            }]
        };

        user_params.password = UserService.hashPassword(user_params.password)

        UserService.createUser(user_params, (err: any, user_data: IUser) => {
            if (err) {
                mongoError(err, res);
            } else {
                successResponse('create user successfull', user_data, res);
            }
        });
    };

    static dashboard(req: Request, res: Response) {
        res.status(200).send({ 'message': 'welcome@'})
    }
}
export default AuthController;