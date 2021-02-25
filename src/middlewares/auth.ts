import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {

    const token = < string > req.headers["authorization"]?.split(' ')[1];
    const jwtSecret = process.env.SECRET ?? '';

    let jwtPayload;
    
    try {
        jwtPayload = <any> jwt.verify(token, jwtSecret);
        res.locals.jwtPayload = jwtPayload;
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

