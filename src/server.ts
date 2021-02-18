import express, { Application, json, Request, Response } from "express";
import cors from "cors";
import { config } from "dotenv";

class App {

    public app: Application
    public port: string | number
    public mode: string

    private isDev: boolean

    constructor() {
        config()

        this.app = express()
        this.port = process.env.PORT || 5000;
        this.mode = process.env.NODE_ENV ?? 'development'

        this.isDev =this.mode !== `production`

        this.database()
        this.middlewares()
        this.routes()
    }

    private database(): void {}

    private middlewares(): void {
        this.app.use(cors());
        this.app.use(json());
    }

    private routes(): void {
        this.app.get("/", (_req: Request, res: Response) => {
            return res.json("API Running 😎");
        });
    }
}

export default new App()