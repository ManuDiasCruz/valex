import { NextFunction, Request, Response } from "express";
import { logs } from "../utils/logs.js";
import { errorApp } from "../utils/errors/errorApp.js";


function localsFromRequest (params: string[], body: string[], headers: string[], query: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {

        const locals = {...res.locals};
        params.forEach(param => {
            if (!req.params[param]) {
                throw new errorApp(400, `Missing ${param}`);
            }
            locals[param] = req.params[param];
        }
        );
        body.forEach(param => {
            if (!req.body[param]) {
                throw new errorApp(400, `Missing ${param}`);
            }
            locals[param] = req.body[param];
        }
        );
        query.forEach(param => {
            if (!req.query[param]) {
                throw new errorApp(400, `Missing ${param}`);
            }
            locals[param] = req.query[param];
        }
        );
        headers.forEach(param => {
            if (!req.headers[param]) {
                throw new errorApp(400, `Missing ${param}`);
            }
            locals[param] = req.headers[param];
        }
        );
        res.locals = locals;
        logs.log("middleware", `Request data set to locals`);
        next();
    }
}

async function apiKey (req: Request, res: Response, next: NextFunction) {
    const companyApiKey = req.headers["x-api-key"] ?? null;

    if (!companyApiKey) {
        throw new errorApp(401, "No api key provided");
    }
    res.locals.companyApiKey = companyApiKey;
    logs.log("middleware", `Company api key ${companyApiKey} not empty`);
    next();
}


export const set = {
    localsFromRequest,
    apiKey
}