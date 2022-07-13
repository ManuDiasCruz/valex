import { NextFunction, Request, Response } from "express";
import { repositories } from "../../repositories/index.js";
import { logs } from "../../utils/logs.js";
import { errorApp } from "../../utils/errors/errorApp.js";


async function byApiKey (req: Request, res: Response, next: NextFunction) {
    const companyApiKey = res.locals["x-api-key"];
    const company = await repositories.company.findByApiKey(companyApiKey);
    if (!company) {
        throw new errorApp(401, "Invalid api key");
    }
    res.locals.company = company;
    logs.log("middleware", `Company ${company.name} found by api key`);
    next();
}

export const company = {
    byApiKey
}