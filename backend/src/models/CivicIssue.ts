import { Schema, model, Document, Types } from "mongoose";

export interface ICivicIssue extends Document {
    title: string;
    description: string;
    category: "Road" | "Water" | "Sanitation" | "Electricity" | "Other";
    location: string;
    imageUrl?: string;
    status: "Pending" | "In Progress" | "Resolved";
    createdAt: Date;
    user: Types.ObjectId;
}

const civicIssueSchema = new Schema<ICivicIssue>({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ["Road", "Water", "Sanitation", "Electricity", "Other"],
    },
    location: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: true,
        enum: ["Pending", "In Progress", "Resolved"],
        default: "Pending",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

export const CivicIssue = model<ICivicIssue>("CivicIssue", civicIssueSchema);
