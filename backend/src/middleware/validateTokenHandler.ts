import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const validateToken = asyncHandler(async (req, res, next) => {
    console.log("validateToken middleware");
    let token: string | undefined;
    let authHeader = req.headers.authorization;

    if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];

        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET as string,
            (err, decoded) => {
                if (err) {
                    res.status(401);
                    throw new Error("User is not authorized");
                }
                console.log(decoded);
                req.user = (
                    decoded as {
                        user: { username: string; email: string; id: string };
                    }
                ).user;
                console.log("after decoded");
                next();
            }
        );

        if (!token) {
            res.status(401);
            throw new Error("User is not authorized or token is missing");
        }
    } else {
        res.status(401);
        throw new Error("User is not authorized or token is missing");
    }
});

export default validateToken;
