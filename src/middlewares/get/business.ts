import { NextFunction, Request, Response } from "express";
import { repositories } from "../../repositories/index.js";
import { logs } from "../../utils/logs.js";
import { errorApp } from "../../utils/errors/errorApp.js";



async function byId (req: Request, res: Response, next: NextFunction) {

    const {businessId} = res.locals;
    const business = await repositories.business.findById(businessId);
    if (!business) {
        console.log("business not found!!");
        throw new errorApp(404, "Business not found");
    }
    res.locals.business = business;
    logs.log("middleware", `Business ${business.id} found`);
    next();
}

export const business = {
    byId,
}