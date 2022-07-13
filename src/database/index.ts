import dotenv from "dotenv";
import pg from "pg";
import chalk from "chalk";

dotenv.config();
const DB_URL = process.env.DATABASE_URL;
console.log(chalk.blue(`[env] ${DB_URL}`));

const { Pool } = pg;

const databaseConfig = {
    connectionString: DB_URL,
};

const connection = new Pool(databaseConfig);
export {connection};