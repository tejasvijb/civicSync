import { NextFunction, Request, Response } from "express";
import { CivicIssue } from "../models/CivicIssue";
import validateAndParseData from "../utils/utils";
import opencage from "opencage-api-client";

//import npm package types for opencage

import {
    createCivicIssueSchema,
    CreateCivicIssueType,
} from "../validations/civicIssue.validation";

export const createCivicIssue = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const issueData: CreateCivicIssueType = req.body;

        // Validate the data first
        if (!validateAndParseData(createCivicIssueSchema, issueData, next)) {
            return; // Let the error middleware handle the response
        }

        // Extract the actual issue data from the nested body structure

        const mockedLocation = await opencage.geocode({
            q: issueData.location,
        });

        const latitude = mockedLocation?.results[0]?.geometry?.lat as number;
        const longitude = mockedLocation?.results[0]?.geometry?.lng as number;

        // Create new civic issue with the correct structure
        const newIssue = await CivicIssue.create({
            ...issueData,
            status: "Pending", // Auto-set status to Pending
            createdAt: new Date(),
            user: issueData.user,
            latitude: latitude || 0,
            longitude: longitude || 0,
        });

        return res.status(201).json({
            success: true,
            data: newIssue,
        });
    } catch (error) {
        next(error); // Let the error middleware handle the error
        return;
    }
};

export const deleteCivicIssue = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const issue = await CivicIssue.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            success: true,
            data: issue,
            message: "Issue deleted successfully",
        });
    } catch (error) {
        next(error); // Let the error middleware handle the error
        return;
    }
};

export const updateCivicIssue = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const issueData: CreateCivicIssueType = req.body;

        // if (!validateAndParseData(createCivicIssueSchema, issueData, next)) {
        //     return; // Let the error middleware handle the response
        // }
        console.log("inside update issue", issueData);

        const issue = await CivicIssue.findByIdAndUpdate(
            req.params.id,
            issueData,
            {
                new: true,
                runValidators: true,
            }
        );

        return res.status(200).json({
            success: true,
            data: issue,
        });
    } catch (error) {
        next(error); // Let the error middleware handle the error
        return;
    }
};

export const getAllCivicIssues = async (req: Request, res: Response) => {
    try {
        const {
            page = 1,
            limit = 10,
            search = "",
            category,
            status,
            sortBy = "createdAt", // or "votes"
            sortOrder = "desc", // or "asc"
        } = req.query;

        const query: any = {};

        // Search by title (case-insensitive)
        if (search) {
            query.title = { $regex: search, $options: "i" };
        }

        // Filter by category
        if (category) {
            query.category = category;
        }

        // Filter by status
        if (status) {
            query.status = status;
        }

        // Sorting
        const sortOptions: any = {};
        sortOptions[sortBy as string] = sortOrder === "asc" ? 1 : -1;

        const issues = await CivicIssue.find(query)
            .populate("user", "name email")
            .sort(sortOptions)
            .skip((+page - 1) * +limit)
            .limit(+limit);

        const totalCount = await CivicIssue.countDocuments(query);

        return res.status(200).json({
            success: true,
            data: issues,
            pagination: {
                total: totalCount,
                page: +page,
                limit: +limit,
                totalPages: Math.ceil(totalCount / +limit),
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching civic issues",
            error:
                error instanceof Error
                    ? error.message
                    : "Unknown error occurred",
        });
    }
};

export const getUserCivicIssues = async (req: Request, res: Response) => {
    try {
        // @ts-ignore - user will be added by auth middleware
        const userId = req.user.id;

        const issues = await CivicIssue.find({ user: userId }).sort({
            createdAt: -1,
        });

        return res.status(200).json({
            success: true,
            data: issues,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching user's civic issues",
            error:
                error instanceof Error
                    ? error.message
                    : "Unknown error occurred",
        });
    }
};

export const getCivicIssueById = async (req: Request, res: Response) => {
    try {
        const issue = await CivicIssue.findById(req.params.id).populate(
            "user",
            "id"
        ); // Populate user details

        if (!issue) {
            return res.status(404).json({
                success: false,
                message: "Civic issue not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: issue,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching civic issue",
            error:
                error instanceof Error
                    ? error.message
                    : "Unknown error occurred",
        });
    }
};

export const voteIssue = async (req: Request, res: Response) => {
    const issueId = req.params.id;
    const userId = req.user?.id;

    const issue = await CivicIssue.findById(issueId);

    if (!issue) {
        return res.status(404).json({
            success: false,
            message: "Issue not found",
        });
    }

    if (issue.votedUsers.includes(userId)) {
        return res.status(400).json({
            success: false,
            message: "You have already voted on this issue",
        });
    }

    issue.votedUsers.push(userId);
    issue.votes++;
    await issue.save();

    return res.status(200).json({
        success: true,
        message: "Issue voted successfully",
    });
};
