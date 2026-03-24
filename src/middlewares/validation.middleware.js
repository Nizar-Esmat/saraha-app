import asyncHandler from "../utils/error/async-handler.js";

export const isValid = (schema) => {
    return asyncHandler(async (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            return next(new Error(error.message, { cause: 400 }));
        }
        next();
    });
}