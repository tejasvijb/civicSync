import { useAuth } from "@/store/useAuth";
import { CreateIssueForm } from "./components/createIssueForm";
import { IssuesTable } from "../../../components/common/issuesTable";
import { useQuery } from "@tanstack/react-query";
import { getCivicIssuesByUserId } from "@/api/civicIssuesApi";
import { useState } from "react";
import { DialogContent } from "@/components/ui/dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function Issues() {


    const [open, setOpen] = useState(false)

    const { user } = useAuth()

    const { data: issues } = useQuery({
        queryKey: ["issuesByUserId", user?.id],
        queryFn: () => getCivicIssuesByUserId(),
    })

    console.log(issues)


    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="text-2xl font-bold">My Issues</h1>
                    <p className="text-gray-500 text-sm">
                        Click on an issue to view details.
                    </p>
                </div>

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button size="sm">Report Issue</Button>
                    </DialogTrigger>
                    <DialogContent className="max-sm:max-w-[360px] w-[700px]">
                        <CreateIssueForm setOpen={setOpen} />
                    </DialogContent>
                </Dialog>
            </div>
            <div >
                <IssuesTable issues={issues?.data} />
            </div>
        </div>
    )
}