"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
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
  { month: "Tháng 1", post: 16 },
  { month: "Tháng 2", post: 30 },
  { month: "Tháng 3", post: 23 },
  { month: "Tháng 4", post: 33 },
  { month: "Tháng 5", post: 29 },
  { month: "Tháng 6", post: 24 },
  { month: "Tháng 7", post: 24 },
  { month: "Tháng 8", post: 24 },
  { month: "Tháng 9", post: 24 },
  { month: "Tháng 10", post: 24 },
  { month: "Tháng 11", post: 24 },
  { month: "Tháng 12", post: 24 },
];

const chartConfig = {
  post: {
    label: "Số bài đăng",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function PostByMonth() {
  return (
    <Card className="border border-gray-200 rounded-[10px] w-full ">
      <CardHeader>
        <CardTitle className="mb-[5px]">Số bài đăng theo tháng</CardTitle>
        <CardDescription>Thống kê từ tháng 1 - tháng 12 năm 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            width={500} // Thu nhỏ chiều rộng
            height={200} // Thu nhỏ chiều cao
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={5} // Giảm khoảng cách để vừa với biểu đồ nhỏ
              axisLine={false}
              tickFormatter={(value) => value.replace("Tháng ", "T")} // Hiển thị "T1", "T2", ...
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={5} // Giảm khoảng cách
              width={30} // Giảm chiều rộng trục Y cho gọn
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="post" fill="var(--color-post)" radius={4} /> {/* Giảm radius cho nhỏ gọn */}
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Hiển thị tổng số bài đăng trong 12 tháng qua
        </div>
      </CardFooter>
    </Card>
  );
}