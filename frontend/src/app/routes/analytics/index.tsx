import { DonutChart } from "./components/donutChart";
import { useQuery } from "@tanstack/react-query";
import { getAllCivicIssues } from "@/api/civicIssuesApi";



export default function Analytics() {
    const { data: issues } = useQuery({
        queryFn: getAllCivicIssues,
        queryKey: ["publicCivicIssues"],
    })

    const categories = ["Road", "Water", "Sanitation", "Electricity", "Other"];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chartColors: any = {
        Road: "hsl(var(--chart-1))",
        Water: "hsl(var(--chart-2))",
        Sanitation: "hsl(var(--chart-3))",
        Electricity: "hsl(var(--chart-4))",
        Other: "hsl(var(--chart-5))"
    };

    const result = categories.map(category => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const count = issues?.data?.data?.filter((issue: any) => issue.category === category).length;
        return {
            Category: category,
            issues: count,
            fill: chartColors[category]
        };
    });

    console.log(result)


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Add your analytics components here */}
                <DonutChart chartData={result} />
            </div>
        </div>
    );
}