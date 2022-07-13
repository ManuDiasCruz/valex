import Joi from "joi";

const password = Joi.string().pattern(new RegExp("^[0-9]{4}$"));
const cvv = Joi.string().pattern(new RegExp("^[0-9]{3}$"));
const amount = Joi.number().min(0);
const id = Joi.number().min(0);
const type = Joi.string().valid("groceries", "restaurants", "transport", "education", "health");

export const joiSchemas = {
    password,
    cvv,
    amount,
    id,
    type
}