import api from "./api";
import { CreateCivicIssueTypeApi } from "../app/utils/validations";

interface ApiResponse {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
}

interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

interface ApiResponseWithPagination {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    pagination: Pagination;
}

const URLS = {
    createIssue: "civic-issues/create",
    getAllIssues: "civic-issues/all",
    getIssuesByUserId: "civic-issues/user/issues",
    getIssueById: "civic-issues/:id",
    updateIssue: "civic-issues/:id",
    deleteIssue: "civic-issues/:id",
    voteIssue: "civic-issues/:id/vote",
};

export const createCivicIssue = (body: CreateCivicIssueTypeApi) => {
    return api.post(URLS.createIssue, body);
};

export const getAllCivicIssues = (params: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    status?: string;
}) => {
    return api.get<ApiResponseWithPagination>(URLS.getAllIssues, { params });
};

export const getCivicIssueById = (id: string) => {
    return api.get<ApiResponse>(URLS.getIssueById.replace(":id", id));
};

export const getCivicIssuesByUserId = () => {
    return api.get(URLS.getIssuesByUserId);
};

export const updateCivicIssue = (id: string, data: CreateCivicIssueTypeApi) => {
    return api.put(URLS.updateIssue.replace(":id", id), data);
};

export const deleteCivicIssue = (id: string) => {
    return api.delete(URLS.deleteIssue.replace(":id", id));
};

export const voteCivicIssue = (id: string) => {
    return api.post(URLS.voteIssue.replace(":id", id), {});
};
