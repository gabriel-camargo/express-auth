import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

class AuthMiddleware {
    public checkJwt(req: Request, res: Response, next: NextFunction) {

        const token = < string > req.headers["authorization"]?.split(' ')[1];
        const jwtSecret = process.env.SECRET ?? '';
    
        let jwtPayload;
        
        try {
            jwtPayload = <any> jwt.verify(token, jwtSecret);
            res.locals.user = {
                _id : jwtPayload.user._id,
                name : jwtPayload.user.name,
                email : jwtPayload.user.email,
            };
        } catch (error) {
            res.status(401).send();
            return;
        }
        
        const { userId, username } = jwtPayload;
        console.log('opa', userId, username)
    
        const newToken = jwt.sign({
            userId,
            username
        }, jwtSecret, {
            expiresIn: "1h"
        });
    
        res.setHeader("token", newToken);
    
        next();
    };
}

export default new AuthMiddleware()