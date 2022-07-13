import express, { json, Request, Response } from "express";
import cors from "cors";
import "express-async-errors";
import router from "./routers/index";
import { mws } from "./middlewares";
import errorHandlingMiddleware from "./utils/errorHandlerMiddleware.js";

const app = express();
app.use(cors());
app.use(json());


app.use(router);
app.get("/", mws.help.throwerrorApp, (req: Request, res: Response) => {
    res.json({ message: "Welcome to Valex" });
});

app.use(errorHandlingMiddleware);

export default app;