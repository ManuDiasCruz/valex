import { Request, Response } from "express";
import { cardsService } from "../services/cards.js";
import { logs } from "../utils/logs.js";
import { Company } from "../repositories/companyRepository";

async function sendCardBalance(req: Request, res: Response) {
    const {card} = res.locals;
    const data = await cardsService.getCardBalance(card);
    logs.log("controller", `Card ${card.id} balance sent`);
    res.status(200).send(data);
}

async function persistCardRecharge(req: Request, res: Response) {
    const {card, amount, company} = res.locals;
    await cardsService.newRecharge(company, card, amount);
    logs.log("controller", `Card ${card.id} recharged`);
    res.sendStatus(200);
}

async function persistCardPayment(req: Request, res: Response) {
    const {card, amount, business} = res.locals;
    await cardsService.newPayment(business, card, amount);
    logs.log("controller", `Card ${card.id} paid`);
    res.sendStatus(200);
}

export const transactionsController = {
    sendCardBalance,
    persistCardPayment, 
    persistCardRecharge
}