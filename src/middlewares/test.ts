import { NextFunction, Request, Response } from "express";
import { errorApp } from "../utils/errors/errorApp.js";

async function throwerrorApp (req: Request, res: Response, next: NextFunction) {
    throw new errorApp(500, "Test error in middleware");
}

export const help = {
    throwerrorApp
}