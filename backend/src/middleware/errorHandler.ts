import { Request, Response, NextFunction } from "express";
import { STATUS_CODES } from "../constants";

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    const stackTrace = process.env.NODE_ENV === "development" ? err.stack : null

    switch (statusCode) {
        case STATUS_CODES.VALIDATION_ERROR:
            res.status(statusCode).json({
                title: "Validation Failed",
                message: err.message,
                stackTrace,
            });
            break;

        case STATUS_CODES.UNAUTHORIZED:
            res.status(statusCode).json({
                title: "Unauthorized",
                message: err.message,
                stackTrace
            });
            break;

        case STATUS_CODES.NOT_FOUND:
            res.status(statusCode).json({
                title: "Not Found",
                message: err.message,
                stackTrace
            });
            break;

        case STATUS_CODES.FORBIDDEN:
            res.status(statusCode).json({
                title: "Forbidden",
                message: err.message,
                stackTrace
            });
            break;

        case STATUS_CODES.SERVER_ERROR:
            res.status(statusCode).json({
                title: "Server Error",
                message: err.message,
                stackTrace
            });
            break;

        default:
            console.log("No errors, All good!");
    }

}
