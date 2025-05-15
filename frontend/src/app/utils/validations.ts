import { z } from "zod";

// Custom password validation function
const strongPassword = z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" });

export const registerSchema = z
    .object({
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
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords must match",
        path: ["confirmPassword"],
    });

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email address" })
        .trim(),
    password: strongPassword,
});

export const civicIssueCategories = [
    { label: "Road", value: "Road" },
    { label: "Water", value: "Water" },
    { label: "Sanitation", value: "Sanitation" },
    { label: "Electricity", value: "Electricity" },
    { label: "Other", value: "Other" },
];

export const statusOptions = [
    { label: "Pending", value: "Pending" },
    { label: "In Progress", value: "In Progress" },
    { label: "Resolved", value: "Resolved" },
];

export const createCivicIssueSchema = z.object({
    title: z
        .string({
            required_error: "Title is required",
        })
        .min(3, "Title must be at least 3 characters long"),
    description: z
        .string({
            required_error: "Description is required",
        })
        .min(10, "Description must be at least 10 characters long"),
    category: z.enum(["Road", "Water", "Sanitation", "Electricity", "Other"]),
    location: z
        .string({
            required_error: "Location is required",
        })
        .min(3, "Location must be at least 3 characters long"),
    imageUrl: z.string(),
    status: z.enum(["Pending", "In Progress", "Resolved"]).optional(),
});

// Get types from Schema

// make category and status types as string in CreateCivicIssueType
export type CreateCivicIssueType = Omit<
    z.infer<typeof createCivicIssueSchema>,
    "category" | "status"
> & {
    category: string;
    status?: string;
};

// make user type as string in CreateCivicIssueType
export type CreateCivicIssueTypeApi = {
    title: string;
    description: string;
    category: string;
    location: string;
    imageUrl: string;
    status: string;
    user: string;
};

export type UpdateCivicIssueTypeApi = {
    title: string;
    description: string;
    category: string;
    location: string;
    imageUrl: string;
    status: string;
};

export type LoginType = z.infer<typeof loginSchema>;
export type UserType = z.infer<typeof registerSchema>;
