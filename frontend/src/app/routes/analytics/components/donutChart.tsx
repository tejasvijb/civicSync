import * as React from "react"
import { Cell, Label, Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

interface ChartDataItem {
    Category: string
    issues: number
    fill: string
}

interface DonutChartProps {
    chartData: ChartDataItem[]
}

const chartConfig = {
    issues: {
        label: "Issues",
    },
    Road: {
        label: "Road",
        color: "hsl(var(--chart-1))",
    },
    Water: {
        label: "Water",
        color: "hsl(var(--chart-2))",
    },
    Sanitation: {
        label: "Sanitation",
        color: "hsl(var(--chart-3))",
    },
    Electricity: {
        label: "Electricity",
        color: "hsl(var(--chart-4))",
    },
    Other: {
        label: "Other",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig

export function DonutChart({ chartData }: DonutChartProps) {
    const totalIssues = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + (curr.issues || 0), 0)
    }, [chartData])

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Issues Per Category</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="issues"
                            nameKey="Category"
                            innerRadius={60}
                            strokeWidth={5}
                            fill="#8884d8"
                            stroke="hsl(var(--background))"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalIssues.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Issues
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
            </CardFooter>
        </Card>
    )
}
