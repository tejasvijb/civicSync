import { ZodSchema } from "zod";
import { NextFunction } from "express";

// import { Request } from "express"

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
        throw new Error("Invalid Data");
    }

    return;
}

// export function generateSecureKey(): Buffer {
//     return crypto.randomBytes(64);
//   }

// export function getSecretObject() {

//     const secretObject: Secret = {
//       key: "secretkey",
//       passphrase: process.env.ACCESS_TOKEN_SECRET as string
//     };

//     return secretObject
// }
