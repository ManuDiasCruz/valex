import { NextFunction, Request, Response } from "express";
import { repositories } from "../../repositories/index.js";
import { logs } from "../../utils/logs.js";
import { errorApp } from "../../utils/errors/errorApp.js";



async function byId (req: Request, res: Response, next: NextFunction) {
    const {cardId} = res.locals;
    const card = await repositories.card.findById(cardId);
    if (!card) {
        throw new errorApp(404, "Card not found");
    }
    res.locals.card = card;
    logs.log("middleware", `Card ${card.id} found`);
    next()
}

export const card = {
    byId
}