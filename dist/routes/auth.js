"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const AuthController_1 = __importDefault(require("./../controllers/AuthController"));
const AuthMiddleware_1 = __importDefault(require("../middlewares/AuthMiddleware"));
const RequestValidatorMiddleware_1 = __importDefault(require("../middlewares/RequestValidatorMiddleware"));
const AuthValidator_1 = __importDefault(require("../validators/AuthValidator"));
class AuthRoutes {
    route(app) {
        app.post("/sign-in", RequestValidatorMiddleware_1.default.validate(AuthValidator_1.default.signIn()), AuthController_1.default.signIn);
        app.post("/sign-up", RequestValidatorMiddleware_1.default.validate(AuthValidator_1.default.signUp()), AuthController_1.default.signUp);
        app.get('/dashbord', AuthMiddleware_1.default.checkJwt, AuthController_1.default.dashboard);
    }
}
exports.authRouter = new AuthRoutes();
