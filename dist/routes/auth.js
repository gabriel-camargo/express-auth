"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const AuthController_1 = __importDefault(require("./../controllers/AuthController"));
const auth_1 = require("../middlewares/auth");
const requestValidator_1 = require("../middlewares/requestValidator");
const auth_2 = require("../validators/auth");
class AuthRoutes {
    route(app) {
        app.post("/sign-in", requestValidator_1.validate(auth_2.signIn()), AuthController_1.default.signIn);
        app.post("/sign-up", requestValidator_1.validate(auth_2.signUp()), AuthController_1.default.signUp);
        app.get('/dashbord', auth_1.checkJwt, AuthController_1.default.dashboard);
    }
}
exports.authRouter = new AuthRoutes();
