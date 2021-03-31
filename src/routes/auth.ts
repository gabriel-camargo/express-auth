import AuthController from "./../controllers/AuthController";
import { Application } from 'express';
import AuthMiddleware from "../middlewares/AuthMiddleware";
import RequestValidatorMiddleware from "../middlewares/RequestValidatorMiddleware";
import AuthValidator from "../validators/AuthValidator"

class AuthRoutes {

  public route(app: Application) {
    app.post("/sign-in", RequestValidatorMiddleware.validate(AuthValidator.signIn()), AuthController.signIn);
    app.post("/sign-up", RequestValidatorMiddleware.validate(AuthValidator.signUp()), AuthController.signUp);

    app.get('/dashbord', AuthMiddleware.checkJwt, AuthController.dashboard)
  }

}

export const authRouter = new AuthRoutes()