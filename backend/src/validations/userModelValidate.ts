import { z } from "zod";

// Custom password validation function
const strongPassword = z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" });

export const userSchema = z.object({
    username: z
        .string()
        .min(1, { message: "Username is required" })
        .max(30, { message: "Username must be 30 or fewer characters" })
        .trim(),
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email address" })
        .trim(),
    password: strongPassword,
});

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email address" })
        .trim(),
    password: strongPassword,
});

// Get types from Schema

export type LoginType = z.infer<typeof loginSchema>;
export type UserType = z.infer<typeof userSchema>;
