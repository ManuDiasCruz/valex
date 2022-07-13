import dotenv from "dotenv";
import app from "./app";
import chalk from "chalk";


dotenv.config();
const port = Number(process.env.PORT) || 5000;
app.listen(port, () => console.log(chalk.bold.green(`Server up on PORT number ${port}`)));