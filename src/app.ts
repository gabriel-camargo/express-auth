import express, { Application, json, Request, Response } from "express";
import "colors";
import cors from "cors";
import { config } from "dotenv";

config();

const app: Application = express();

app.use(cors());
app.use(json());

const PORT: string | number = process.env.PORT || 5000;
const ENV: string = process.env.NODE_ENV || "development";

app.get("/", (_req: Request, res: Response) => {
  return res.send("API Running :D");
});

app.listen(PORT, () =>
  console.log(
    ` 📡 Backend server: `.inverse.yellow.bold +
      ` Running in ${ENV} mode on port ${PORT}`
  )
);