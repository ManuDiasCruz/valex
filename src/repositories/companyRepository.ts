import { connection } from "../database.js";
import {logs} from "../utils/logs.js"

export interface Company {
  id: number;
  name: string;
  apiKey?: string;
}

async function findByApiKey(apiKey: string) {
  logs.log("api", `Finding company by api key ${apiKey}`);
  const result = await connection.query<Company, [string]>(
    `SELECT * FROM companies WHERE "apiKey"=$1`,
    [apiKey]
  );

  return result.rows[0];
}

export const companyRepository = {
  findByApiKey
};