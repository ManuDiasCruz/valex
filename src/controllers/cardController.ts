import { Request, Response } from "express";
import { cardsService } from "../services/cards.js";
import { logs } from "../utils/logs.js";
import { Company } from "../repositories/companyRepository";

async function sendCards(req: Request, res: Response) {
    const {employeeId, passwords} = res.locals;
    const data = await cardsService.getCardsByEmployeeId(employeeId, passwords);
    chalkLogger.log("controller", `Cards sent for employee ${employeeId}`);
    res.status(200).send(data);
}

async function createCard(req: Request, res: Response) {
    const {employee, type} = res.locals;
    await cardsService.createCard(employee, type);
    chalkLogger.log("controller", `Card created for employee ${employee.id}`);
    res.sendStatus(200);
}

async function activateCard(req: Request, res: Response) {
    const {card, password} = res.locals;
    await cardsService.activateCard(card, password);
    chalkLogger.log("controller", `Card ${card.id} activated`);
    res.sendStatus(200);
}

async function blockCard(req: Request, res: Response) {
    const {card} = res.locals;
    await cardsService.blockCard(card);
    chalkLogger.log("controller", `Card ${card.id} blocked`);
    res.sendStatus(200);
}

async function unblockCard(req: Request, res: Response) {
    const {card} = res.locals;
    await cardsService.unblockCard(card);
    chalkLogger.log("controller", `Card ${card.id} unblocked`);
    res.sendStatus(200);
}

export const cardController = {
    sendCards, 
    createCard, 
    activateCard, 
    blockCard, 
    unblockCard
}