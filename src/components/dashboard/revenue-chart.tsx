import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import {
    ResponsiveContainer,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Area,
    AreaChart,
} from "recharts"

interface Props {
    data: {
        _id: number
        revenue: number
    }[]
}

const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
]

export default function RevenueChart({ data }: Props) {
    const chartData = data.map((item) => ({
        month: months[item._id],
        revenue: item.revenue,
    }))

    return (
        <Card className="gap-0">
            <CardHeader className="px-4 py-3">
                <CardTitle className="text-sm font-semibold">
                    Monthly Revenue
                </CardTitle>
            </CardHeader>

            <CardContent className="px-4 pb-4 pt-0">
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient
                                    id="revenue"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="#10b981"
                                        stopOpacity={0.35}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="#10b981"
                                        stopOpacity={0.03}
                                    />
                                </linearGradient>
                            </defs>

                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                stroke="#e5e7eb"
                            />

                            <XAxis
                                dataKey="month"
                                tick={{ fontSize: 11 }}
                                tickLine={false}
                                axisLine={false}
                            />

                            <YAxis
                                tick={{ fontSize: 11 }}
                                tickLine={false}
                                axisLine={false}
                                width={40}
                            />

                            <Tooltip
                                formatter={(value) => [
                                    `৳${Number(value).toLocaleString()}`,
                                    "Revenue",
                                ]}
                                contentStyle={{
                                    borderRadius: 6,
                                    border: "1px solid #e5e7eb",
                                    fontSize: 12,
                                }}
                            />

                            <Area
                                type="monotone"
                                dataKey="revenue"
                                fill="url(#revenue)"
                                stroke="#10b981"
                                strokeWidth={2}
                            />

                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="#10b981"
                                strokeWidth={2}
                                dot={{ r: 3 }}
                                activeDot={{ r: 5 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}