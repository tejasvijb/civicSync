import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import EditPopover from "./editPopover"



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function IssuesTable({ issues }: { issues: any }) {

    console.log(issues)

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[150px]">Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Votes</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    issues?.data?.map((issue: any) => (
                        <TableRow key={issue._id}>
                            <TableCell className="font-medium">{issue.title.slice(0, 20)}...</TableCell>
                            <TableCell>{issue.category}</TableCell>
                            <TableCell>{issue.status}</TableCell>
                            <TableCell className="text-right">{issue.votes || ''}</TableCell>
                            <TableCell className="text-right">
                                <EditPopover issue={issue} />
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>

        </Table>
    )
}
