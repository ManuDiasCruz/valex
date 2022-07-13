import { Router } from "express";
import { controllers } from "../controllers/index";
import { mws } from "../middlewares/index";
import { joiSchemas } from "../models/joi";
import { chalkLogger } from "../utils/chalkLogger";

const router = Router();

router.get("/", 
    chalkLogger.logMiddleware("route", "Get all cards"),
    mws.set.localsFromRequest([],["passwords", "employeeId"],[],[]),
    mws.check.validateMultipleJoi([{local: "employeeId", joiSchema: joiSchemas.id}]),
    controllers.card.sendCards
)

router.post("/", 
    chalkLogger.logMiddleware("route", "Create new card"),
    mws.set.localsFromRequest([], ["employeeId", "type"], ["x-api-key"], []),
    mws.check.validateMultipleJoi([{local: "employeeId", joiSchema: joiSchemas.id}, {local: "type", joiSchema: joiSchemas.type}]),
    mws.get.company.byApiKey,
    mws.get.employee.byId,
    mws.validate.card.typeAlreadyExistsForUser,
    controllers.card.createCard
)

router.post("/:cardId/activate",
    chalkLogger.logMiddleware("route", "Activate card"),
    mws.set.localsFromRequest(["cardId"], ["password", "cvv"], [], []),
    mws.check.validateMultipleJoi([{local: "cardId", joiSchema: joiSchemas.id}, {local: "password", joiSchema: joiSchemas.password}, {local: "cvv", joiSchema: joiSchemas.cvv}]),
    mws.get.card.byId,
    mws.validate.card.cvvIsCorrect,
    controllers.card.activateCard
)

router.post("/:cardId/block", 
    chalkLogger.logMiddleware("route", "Block card"),
    mws.set.localsFromRequest(["cardId"], ["password"], [], []),
    mws.check.validateMultipleJoi([{local: "cardId", joiSchema: joiSchemas.id}, {local: "password", joiSchema: joiSchemas.password}]),
    mws.get.card.byId,
    mws.validate.card.passwordIsCorrect,
    controllers.card.blockCard
)

router.post("/:cardId/unblock", 
    chalkLogger.logMiddleware("route", "Block card"),
    mws.set.localsFromRequest(["cardId"], ["password"], [], []),
    mws.check.validateMultipleJoi([{local: "cardId", joiSchema: joiSchemas.id}, {local: "password", joiSchema: joiSchemas.password}]),
    mws.get.card.byId,
    mws.validate.card.passwordIsCorrect,
    controllers.card.unblockCard
)

router.get("/:cardId/balance", 
    chalkLogger.logMiddleware("route", "Get card balance"),
    mws.set.localsFromRequest(["cardId"], [], [], []),
    mws.check.validateMultipleJoi([{local: "cardId", joiSchema: joiSchemas.id}]),
    mws.get.card.byId,
    controllers.transactions.sendCardBalance
)

export default router;