import { CartesianGrid, Line, LineChart as RechartsLineChart, XAxis, YAxis, ResponsiveContainer } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartTooltip,
} from "@/components/ui/chart"

interface ChartDataPoint {
    day: string;
    issueCount: number;
}

interface LinearChartProps {
    chartData: ChartDataPoint[];
}



export function LinearChart({ chartData }: LinearChartProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Daily Issues</CardTitle>
                <CardDescription>Last 7 Days</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart
                        data={chartData}
                        margin={{
                            top: 5,
                            right: 10,
                            left: 10,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <ChartTooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="flex flex-col">
                                                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                        Day
                                                    </span>
                                                    <span className="font-bold text-muted-foreground">
                                                        {payload[0].payload.day}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                        Issues
                                                    </span>
                                                    <span className="font-bold">
                                                        {payload[0].value}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                return null
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="issueCount"
                            stroke="hsl(var(--chart-1))"
                            strokeWidth={2}
                            dot={{
                                r: 4,
                                fill: "hsl(var(--chart-1))",
                                strokeWidth: 2,
                            }}
                            activeDot={{
                                r: 6,
                                fill: "hsl(var(--chart-1))",
                                strokeWidth: 2,
                            }}
                        />
                    </RechartsLineChart>
                </ResponsiveContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="leading-none text-muted-foreground">
                    Showing daily issue creation trends for the last 7 days
                </div>
            </CardFooter>
        </Card>
    )
}
