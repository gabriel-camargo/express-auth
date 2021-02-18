import express, { Application, json, Request, Response } from "express";
import cors from "cors";
import { config } from "dotenv";
import mongoose from "mongoose";

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

    private database(): void {
        mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}` + 
        `@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority`, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (err) => {
            if(!err) {
                console.log('connected to database!')
            }
        })
    }

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