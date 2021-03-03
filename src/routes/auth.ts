import AuthController from "./../controllers/AuthController";
import { Application } from 'express';
import { checkJwt } from "../middlewares/auth";
import { validate } from "../middlewares/requestValidator";
import { signIn, signUp } from "../validators/auth"

class AuthRoutes {

   

  public route(app: Application) {
    app.post("/sign-in", validate(signIn()), AuthController.signIn);
    app.post("/sign-up", validate(signUp()), AuthController.signUp);

    app.get('/dashbord', checkJwt, AuthController.dashboard)
  }

}

export const authRouter = new AuthRoutes()