import { NextFunction, Request, Response } from "express";
import { repositories } from "../../repositories/index.js";
import { logs } from "../../utils/logs.js";
import { errorApp } from "../../utils/errors/errorApp.js";
import { cardsService } from "../../services/cards.js";



async function passwordIsCorrect (req: Request, res: Response, next: NextFunction) {
    const {card, password} = res.locals; // password via bcrypt
    await cardsService.validatePassword(card, password);
    logs.log("middleware", `Card ${card.id} password validated`);
    next();
}

async function cvvIsCorrect (req: Request, res: Response, next: NextFunction) {
    const {card, cvv} = res.locals;
    cardsService.validateCVV(cvv, card);
    logs.log("middleware", `Card ${card.id} cvv validated`);
    next();
}

async function hasNotExpired (req: Request, res: Response, next: NextFunction) {
    const {card} = res.locals;
    const hasExpired = cardsService.cardHasExpired(card);
    if (hasExpired) {
        throw new errorApp(400, "Card has expired");
    }
    logs.log("middleware", `Card ${card.id} has not expired`);
    next();
}

async function isActive (req: Request, res: Response, next: NextFunction) {
    const {card} = res.locals;
    if (!cardsService.cardIsActive(card)) {
        throw new errorApp(400, "Card is not active");
    }
    logs.log("middleware", `Card ${card.id} is active`);
    next();
}

async function typeAlreadyExistsForUser (req: Request, res: Response, next: NextFunction) {
    const {employeeId, type} = res.locals;
    const userCard = await repositories.card.findByTypeAndEmployeeId(type, employeeId);
    if (userCard) {
        throw new errorApp(409, "Card type already created for user");
    }
    logs.log("middleware", `Card type ${type} not created for user`);
    next();
}

export const card = {
    passwordIsCorrect,
    cvvIsCorrect,
    typeAlreadyExistsForUser,
    hasNotExpired,
    isActive
}