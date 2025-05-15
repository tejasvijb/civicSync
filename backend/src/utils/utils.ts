import { ZodSchema } from "zod";
import { NextFunction } from "express";

type Body = Record<string, any>;

export default function validateAndParseData(
    schema: ZodSchema,
    body: Body,
    next: NextFunction
) {
    const parsedData = schema.safeParse(body);

    if (!parsedData.success) {
        const errorMessages = parsedData.error.errors.map((err) => {
            const path = err.path?.join(".");
            return `${path}: ${err.message}`;
        });
        next(new Error(errorMessages.join(", ")));
        return false;
    }

    return true;
}
