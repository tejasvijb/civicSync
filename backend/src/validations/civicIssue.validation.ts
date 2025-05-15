import { z } from "zod";

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
    category: z.enum(["Road", "Water", "Sanitation", "Electricity", "Other"], {
        required_error: "Category is required",
    }),
    location: z
        .string({
            required_error: "Location is required",
        })
        .min(3, "Location must be at least 3 characters long"),
    imageUrl: z.string().optional(),
    status: z.enum(["Pending", "In Progress", "Resolved"]).optional(),
    user: z.string().min(1, "User is required"),
});

export type CreateCivicIssueType = z.infer<typeof createCivicIssueSchema>;
