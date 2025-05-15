import { useAuth } from "@/store/useAuth";
import { CreateIssueForm } from "./components/createIssueForm";
import { IssuesTable } from "./components/issuesTable";
import { useQuery } from "@tanstack/react-query";
import { getCivicIssuesByUserId } from "@/api/civicIssuesApi";

export default function Issues() {

    const { user } = useAuth()

    const { data: issues } = useQuery({
        queryKey: ["issuesByUserId", user?.id],
        queryFn: () => getCivicIssuesByUserId(),
    })

    console.log(issues)


    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold mb-4">My Issues</h1>
                <CreateIssueForm />
            </div>
            <div >
                <IssuesTable issues={issues?.data} />
            </div>
        </div>
    )
}