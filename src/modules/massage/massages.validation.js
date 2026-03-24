import Joi from "joi";
import { isValidId } from "../../middlewares/validation.middleware.js";

export const massagesSchema = Joi.object({
    content: Joi.string().required(),
    receiver: Joi.string().required().custom(isValidId),
    sender: Joi.string().required().custom(isValidId),
});

export const deleteMassage = Joi.object({
    id: Joi.string().required().custom(isValidId),
});