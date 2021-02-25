"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwt = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const checkJwt = (req, res, next) => {
    var _a, _b;
    const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    const jwtSecret = (_b = process.env.SECRET) !== null && _b !== void 0 ? _b : '';
    let jwtPayload;
    try {
        jwtPayload = jwt.verify(token, jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    }
    catch (error) {
        res.status(401).send();
        return;
    }
    const { userId, username } = jwtPayload;
    console.log('opa', userId, username);
    const newToken = jwt.sign({
        userId,
        username
    }, jwtSecret, {
        expiresIn: "1h"
    });
    res.setHeader("token", newToken);
    next();
};
exports.checkJwt = checkJwt;
