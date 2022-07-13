import { Router } from "express";
import { controllers } from "../controllers/index";
import { mws } from "../middlewares/index";
import { joiSchemas } from "../models/joi";
import { chalkLogger } from "../utils/chalkLogger";

const router = Router();

router.post("/recharge",
    chalkLogger.logMiddleware("route", "Recharge card"),
    mws.set.localsFromRequest([], ["amount", "cardId"], ["x-api-key"], []),
    mws.check.validateMultipleJoi([ { local: "amount", joiSchema: joiSchemas.amount }, { local: "cardId", joiSchema: joiSchemas.id } ]),
    mws.get.company.byApiKey,
    mws.get.card.byId,
    mws.validate.card.isActive,
    controllers.transactions.persistCardRecharge
)

router.post("/payment", 
    chalkLogger.logMiddleware("route", "Recharge card"),
    mws.set.localsFromRequest([], ["amount", "businessId", "password", "cardId"], [], []),
    mws.check.validateMultipleJoi([ { local: "amount", joiSchema: joiSchemas.amount }, { local: "businessId", joiSchema: joiSchemas.id }, { local: "password", joiSchema: joiSchemas.password } ]),
    mws.get.business.byId,
    mws.get.card.byId,
    mws.validate.card.isActive,
    mws.validate.card.passwordIsCorrect,
    controllers.transactions.persistCardPayment
)

export default router;