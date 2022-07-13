import { Router } from "express";
import cardsRouter from "./cards";
import transactionsRouter from "./transactions";

const router = Router();
router.use("/cards", cardsRouter);
router.use("/transactions", transactionsRouter);

export default router;