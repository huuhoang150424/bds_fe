"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { area: "Đống Đa", visitors: 275, fill: "hsl(var(--chart-1))" },
  { area: "Cầu Giấy", visitors: 200, fill: "hsl(var(--chart-2))" },
  { area: "Thanh Xuân", visitors: 187, fill: "hsl(var(--chart-3))" },
  { area: "Hà Đông", visitors: 173, fill: "hsl(var(--chart-4))" },
  { area: "Long Biên", visitors: 90, fill: "hsl(var(--chart-5))" },
];

const chartConfig = {
  visitors: {
    label: "Lượt tìm kiếm",
  },
  "Đống Đa": { color: "hsl(var(--chart-1))" },
  "Cầu Giấy": { color: "hsl(var(--chart-2))" },
  "Thanh Xuân": { color: "hsl(var(--chart-3))" },
  "Hà Đông": { color: "hsl(var(--chart-4))" },
  "Long Biên": { color: "hsl(var(--chart-5))" },
} satisfies ChartConfig;

export function Trend() {
  return (
    <Card className="border border-gray-200 rounded-[10px] w-full ">
      <CardHeader>
        <CardTitle className="mb-[5px]">Top khu vực tìm kiếm trong tháng qua</CardTitle>
        <CardDescription>Thống kê từ ngày 1/3 - 31/3/2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            width={350}
            height={200}
            margin={{ left: 0 }}
          >
            <YAxis
              dataKey="area"
              type="category"
              tickLine={false}
              tickMargin={5}
              axisLine={false}
            />
            <XAxis dataKey="visitors" type="number" hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="visitors" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none text-green-500">
          Tăng 5.2% so với tháng trước <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Dữ liệu từ khóa tìm kiếm tháng 3/2025
        </div>
      </CardFooter>
    </Card>
  );
}