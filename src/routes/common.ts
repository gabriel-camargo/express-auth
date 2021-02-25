import { Application, Request, Response } from 'express';

class CommonRoutes {

  public route(app: Application) {

    app.all('*', function(req: Request, res: Response) {
      res.status(404).send({error: true, message: `Oops, it looks like you're lost`})
    })

  }
}

export const commonRouter = new CommonRoutes()