import chalk from "chalk";
import { NextFunction, Request, Response } from "express";


const types = {
    middleware: chalk.bold.magenta("  [Middleware]"),
    controller: chalk.bold.blueBright("[Controller]"),
    service: chalk.bold.magenta("    [Service]"),
    db: chalk.bold.blue("      [db]"),
    api: chalk.bold.blue("      [API]"),
    log: chalk.bold.gray.italic("[Log]"),
    route: chalk.bold.blueBright("[Route]"),
    server: chalk.bold.yellow("[Server]"),
    error: chalk.bold.red("[ERROR]")
};


function log (type: string, message: string) {
    console.log(`${types[type]} ${message}`);
}

function logObject (type: string, obj: object) {
    console.log(`${types[type]}`);
    console.log(obj);
}


function logMiddleware (type: string, message: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        log(type, message);
        next();
    };
}

export const logs = {
    log, logMiddleware, logObject
}