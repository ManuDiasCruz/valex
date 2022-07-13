import { NextFunction, Request, Response } from "express";
import { repositories } from "../../repositories/index.js";
import { logs } from "../../utils/logs.js";
import { errorApp } from "../../utils/errors/errorApp.js";



async function byId (req: Request, res: Response, next: NextFunction) {
    const {employeeId} = res.locals;
    const employee = await repositories.employee.findById(employeeId);
    if (!employee) {
        throw new errorApp(404, "Employee not found");
    }
    res.locals.employee = employee;
    logs.log("middleware", `Employee ${employee.id} found`);
    next();
}

export const employee = {
    byId
}