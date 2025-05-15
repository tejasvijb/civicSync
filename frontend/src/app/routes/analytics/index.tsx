import { DonutChart } from "./components/donutChart";
import { useQuery } from "@tanstack/react-query";
import { getAllCivicIssues } from "@/api/civicIssuesApi";
import { LinearChart } from "./components/lineChart";
import { BarChartComponent } from "./components/barChart";



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

    const donutResult = categories.map(category => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const count = issues?.data?.data?.filter((issue: any) => issue.category === category).length;
        return {
            Category: category,
            issues: count,
            fill: chartColors[category]
        };
    });

    console.log(issues)


    const getDateKey = (date: Date) => {
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    };

    const today = new Date();
    const last7Days = [...Array(7)].map((_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() - (6 - i));
        return {
            date: d,
            key: getDateKey(d),
            count: 0
        };
    });

    // Count issues created on each of the last 7 days
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    issues?.data?.data?.forEach((issue: any) => {
        const createdAt = new Date(issue.createdAt);
        const issueKey = getDateKey(createdAt);
        const match = last7Days.find(d => getDateKey(d.date) === issueKey);
        if (match) match.count += 1;
    });

    const lineResult = last7Days.map(day => ({
        day: day.key,
        issueCount: day.count
    }));

    const barResult = categories.map(category => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const maxVotes = issues?.data?.data?.filter((issue: any) => issue.category === category).length ?? 0;

        return {
            category,
            votes: maxVotes,
            fill: chartColors[category]
        };
    });

    // Add loading check
    if (!issues?.data?.data) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>
                <div className="flex items-center justify-center h-64">
                    Loading...
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Add your analytics components here */}
                <DonutChart chartData={donutResult} />
                <LinearChart chartData={lineResult} />
                <BarChartComponent chartData={barResult} />
            </div>
        </div>
    );
}