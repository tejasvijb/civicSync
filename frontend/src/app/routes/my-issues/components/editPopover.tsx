import { Button } from "@/components/ui/button"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { EllipsisVertical } from "lucide-react"
// import { ViewIssueDialog } from "../../../../components/common/viewIssueDialog"
// import { CreateIssueForm } from "./createIssueForm"
import DeleteIssue from "./deleteIssue"
import { ViewIssueDialog } from "@/components/common/viewIssueDialog"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function EditPopover({ issue }: { issue: any }) {




    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">
                    {/* add three dot icon for edit */}
                    <EllipsisVertical />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-30">
                <div className="grid gap-4">
                    {/* add lucide icons without buttons for View, edit , delete */}
                    <ViewIssueDialog issue={issue} />
                    {/* <CreateIssueForm issue={issue} /> */}
                    <DeleteIssue issue={issue} />
                </div>
            </PopoverContent>
        </Popover>
    )
}
