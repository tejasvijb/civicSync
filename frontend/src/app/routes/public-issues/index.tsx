import { useQuery } from "@tanstack/react-query";
import { getAllCivicIssues } from "@/api/civicIssuesApi";
import { IssuesTable } from "@/components/common/issuesTable";

export default function Issues() {


    const { data: issues } = useQuery({
        queryFn: () => getAllCivicIssues(),
        queryKey: ["publicCivicIssues"],
    })

    console.log(issues)


    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold mb-4">Public Issues</h1>
            </div>
            <div >
                <IssuesTable isPublic={true} issues={issues?.data} />
            </div>
        </div>
    )
}