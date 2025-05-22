import { useQuery } from "@tanstack/react-query";
import { getAllCivicIssues } from "@/api/civicIssuesApi";
import { formatDistanceToNow } from "date-fns";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { categorySelectOptions, statusSelectOptions } from "@/app/types/issues";
import { useState } from "react";
import { Pagination, PaginationEllipsis, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";

export default function Issues() {

    const [categoryKey, setCategoryKey] = useState(0)
    const [statusKey, setStatusKey] = useState(1)

    // add all the query keys to url params 
    const [searchParams] = useSearchParams()

    const page = searchParams.get("page")
    const limit = searchParams.get("limit")
    const search = searchParams.get("search")
    const category = searchParams.get("category")
    const status = searchParams.get("status")


    const { data: issues } = useQuery({
        queryFn: () => getAllCivicIssues({ page: page ? parseInt(page) : 1, limit: limit ? parseInt(limit) : 6, search: search || undefined, category: category || undefined, status: status || undefined }),
        queryKey: ["publicCivicIssues", page, limit, search, category, status],
    })

    const navigate = useNavigate()

    const handleIssueClick = (id: string) => {
        navigate(`/public-issues/${id}`)
    }


    const onFilterChange = (value: string | number, key: string) => {
        searchParams.set(key, value.toString())
        navigate(`/public-issues?${searchParams.toString()}`)
    }

    const onClearFilters = () => {
        searchParams.delete("category")
        searchParams.delete("status")
        searchParams.delete("search")
        setCategoryKey(categoryKey + 1)
        setStatusKey(statusKey + 2)
        navigate(`/public-issues?${searchParams.toString()}`)
    }

    console.log(issues)

    // pagination : {total: 8, page: 1, limit: 6, totalPages: 2}



    return (
        <div className="container flex flex-col justify-between h-[calc(100vh-100px)] mx-auto p-4">
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold mb-4">Public Issues</h1>
                </div>
                {/* add search, filter, sort */}
                <div className="flex items-center  ml-4">
                    <div className="flex items-center gap-4">
                        <Input type="text" placeholder="Search" value={search || ''} onChange={(e) => onFilterChange(e.target.value, "search")} />
                        <Select key={categoryKey} value={category || undefined} onValueChange={(value) => onFilterChange(value, "category")}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categorySelectOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select key={statusKey} value={status || undefined} onValueChange={(value) => onFilterChange(value, "status")}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a status" />
                            </SelectTrigger>
                            <SelectContent>
                                {statusSelectOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {/* clear all filters */}
                        <Button variant="outline" onClick={() => onClearFilters()}>Clear Filters</Button>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {issues?.data?.data?.map((issue: any) => (
                        <div
                            key={issue._id}
                            className="bg-white shadow-md rounded-2xl p-4 border hover:shadow-lg transition cursor-pointer"
                            onClick={() => handleIssueClick(issue._id)}
                        >
                            <h2 className="text-xl font-semibold mb-2">{issue.title}</h2>
                            <p className="text-sm text-gray-600 mb-1">
                                <span className="font-medium">Category:</span> {issue.category}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                                <span className="font-medium">Location:</span> {issue.location}
                            </p>
                            <p className="text-sm mb-1">
                                <span className="font-medium">Status:</span>{" "}
                                <span
                                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${issue.status === "Resolved"
                                        ? "bg-green-100 text-green-700"
                                        : issue.status === "In Progress"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {issue.status}
                                </span>
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                                <span className="font-medium">Votes:</span> {issue.votes}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                                Reported {formatDistanceToNow(new Date(issue.createdAt))} ago
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-auto">
                <Pagination>
                    <PaginationContent>
                        {/* Previous button */}
                        {Number(page) > 1 && (
                            <PaginationItem>
                                <PaginationPrevious onClick={() => onFilterChange(Number(page) - 1, "page")} />
                            </PaginationItem>
                        )}

                        {/* Page numbers */}
                        {Array.from({ length: issues?.data?.pagination?.totalPages ?? 0 }).map((_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    isActive={Number(page) === index + 1}
                                    onClick={() => onFilterChange(index + 1, "page")}
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        {/* Next button */}
                        {Number(page) < (issues?.data?.pagination?.totalPages ?? 1) && (
                            <PaginationItem>
                                <PaginationNext onClick={() => onFilterChange(Number(page) + 1, "page")} />
                            </PaginationItem>
                        )}
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    )
}