import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useNavigate } from "react-router-dom";
// import EditPopover from "../../app/routes/my-issues/components/editPopover"

// import { ViewIssueDialog } from "./viewIssueDialog"



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function IssuesTable({ issues, isPublic }: { issues: any, isPublic?: boolean }) {

    const navigate = useNavigate();

    const handleIssueClick = (id: string) => {
        navigate(`/my-issues/${id}`);
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[150px]">Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Votes</TableHead>
                    {/* <TableHead className="text-right">Actions</TableHead> */}
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    issues?.data?.map((issue: any) => (
                        <TableRow className="cursor-pointer" onClick={() => handleIssueClick(issue._id)} key={issue._id}>
                            <TableCell className="font-medium">{issue.title.slice(0, 20)}...</TableCell>
                            <TableCell>{issue.category}</TableCell>
                            <TableCell>{issue.status}</TableCell>
                            <TableCell>{issue.votes}</TableCell>
                            {/* <TableCell className="text-right">
                                {isPublic ? <ViewIssueDialog issue={issue} isPublic={isPublic} /> : <EditPopover issue={issue} />}
                            </TableCell> */}
                        </TableRow>
                    ))
                }
            </TableBody>

        </Table>
    )
}
