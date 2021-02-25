import AuthController from "./../controllers/AuthController";
import { Application } from 'express';
import { checkJwt } from "../middlewares/auth";

class AuthRoutes {

  public route(app: Application) {
    app.post("/sign-in", AuthController.signIn);
    app.post("/sign-up", AuthController.signUp);

    app.get('/dashbord', checkJwt, AuthController.dashboard)
  }

}

export const authRouter = new AuthRoutes()