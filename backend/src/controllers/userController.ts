import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
    loginSchema,
    LoginType,
    userSchema,
    UserType,
} from "../validations/userModelValidate";
import User from "../models/User";
import bcrypt from "bcrypt";
import validateAndParseData from "../utils/utils";

import jwt from "jsonwebtoken";
// Create a new quiz
export const registerUser = asyncHandler(
    async (req: Request, res: Response, next) => {
        const body: UserType = req.body;

        validateAndParseData(userSchema, body, next);

        const userAvailable = await User.findOne({ email: body.email });

        if (userAvailable) {
            res.status(400);
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(body.password, 10);

        const user = await User.create({
            username: body.username,
            email: body.email,
            password: hashedPassword,
        });

        console.log(`User Created ${user}`);

        if (user) {
            res.status(201).json({ _id: user.id, email: user.email });
        } else {
            res.status(400);
            throw new Error("User data is not valid");
        }
    }
);

export const loginUser = asyncHandler(
    async (req: Request, res: Response, next) => {
        const body: LoginType = req.body;

        validateAndParseData(loginSchema, body, next);

        const user = await User.findOne({ email: body.email });

        // compare password with hashed password
        if (user && (await bcrypt.compare(body.password, user.password))) {
            const accessToken = jwt.sign(
                {
                    user: {
                        username: user.username,
                        email: user.email,
                        id: user.id,
                    },
                },
                process.env.ACCESS_TOKEN_SECRET as string,
                {
                    expiresIn: "15m",
                }
            );
            // add username, email, id to the response
            res.status(200).json({
                accessToken,
                username: user.username,
                email: user.email,
                id: user.id,
            });
        } else {
            res.status(401);
            throw new Error("Invalid email or password");
        }
    }
);

export const currentUser = asyncHandler(
    async (req: Request, res: Response, next) => {
        res.json(req.user);
    }
);
