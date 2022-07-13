import { connection } from "../database.js";
import { logs } from "../utils/logs.js"

export interface Recharge {
  id: number;
  cardId: number;
  timestamp: Date;
  amount: number;
}

export type RechargeInsertData = Omit<Recharge, "id" | "timestamp">;

async function findByCardId(cardId: number) {
  const result = await connection.query<Recharge, [number]>(
    `SELECT * FROM recharges WHERE "cardId"=$1`,
    [cardId]
  );

  return result.rows;
}

async function insert(rechargeData: RechargeInsertData) {
  const { cardId, amount } = rechargeData;

  connection.query<any, [number, number]>(
    `INSERT INTO recharges ("cardId", amount) VALUES ($1, $2)`,
    [cardId, amount]
  );

  logs.log("api", `Recharge created`);
}

export const rechargeRepository = {
  findByCardId,
  insert
};