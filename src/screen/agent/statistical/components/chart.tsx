"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Dữ liệu mẫu theo nguồn truy cập
const chartData = [
  { date: "2024-04-01", organic: 120, paid: 50, social: 30, direct: 20 },
  { date: "2024-04-02", organic: 150, paid: 70, social: 40, direct: 25 },
  { date: "2024-04-03", organic: 130, paid: 60, social: 35, direct: 22 },
  { date: "2024-04-04", organic: 200, paid: 90, social: 50, direct: 30 },
  { date: "2024-04-05", organic: 180, paid: 85, social: 45, direct: 28 },
  { date: "2024-04-06", organic: 160, paid: 75, social: 38, direct: 26 },
  { date: "2024-04-07", organic: 140, paid: 65, social: 32, direct: 23 },
  { date: "2024-04-08", organic: 210, paid: 95, social: 55, direct: 35 },
  { date: "2024-04-09", organic: 190, paid: 80, social: 48, direct: 29 },
  { date: "2024-04-10", organic: 170, paid: 70, social: 42, direct: 27 },
  { date: "2024-04-11", organic: 220, paid: 100, social: 60, direct: 40 },
  { date: "2024-04-12", organic: 230, paid: 110, social: 65, direct: 42 },
  { date: "2024-04-13", organic: 200, paid: 90, social: 50, direct: 33 },
  { date: "2024-04-14", organic: 180, paid: 85, social: 45, direct: 30 },
  { date: "2024-04-15", organic: 250, paid: 120, social: 70, direct: 45 },
  { date: "2024-04-16", organic: 240, paid: 115, social: 68, direct: 43 },
  { date: "2024-04-17", organic: 210, paid: 95, social: 55, direct: 35 },
  { date: "2024-04-18", organic: 260, paid: 125, social: 75, direct: 50 },
  { date: "2024-04-19", organic: 230, paid: 105, social: 62, direct: 38 },
  { date: "2024-04-20", organic: 200, paid: 90, social: 50, direct: 32 },
  { date: "2024-04-21", organic: 180, paid: 80, social: 45, direct: 28 },
  { date: "2024-04-22", organic: 270, paid: 130, social: 80, direct: 55 },
  { date: "2024-04-23", organic: 250, paid: 120, social: 70, direct: 45 },
  { date: "2024-04-24", organic: 220, paid: 100, social: 60, direct: 40 },
  { date: "2024-04-25", organic: 280, paid: 135, social: 85, direct: 60 },
  { date: "2024-04-26", organic: 260, paid: 125, social: 75, direct: 50 },
  { date: "2024-04-27", organic: 240, paid: 110, social: 65, direct: 45 },
  { date: "2024-04-28", organic: 200, paid: 95, social: 55, direct: 35 },
  { date: "2024-04-29", organic: 290, paid: 140, social: 90, direct: 65 },
  { date: "2024-04-30", organic: 270, paid: 130, social: 80, direct: 55 },
];

// Cấu hình biểu đồ
const chartConfig = {
  visitors: {
    label: "Người truy cập",
  },
  organic: {
    label: "Tìm kiếm tự nhiên",
    color: "hsl(var(--chart-1))", // Màu xanh dương
  },
  paid: {
    label: "Quảng cáo trả phí",
    color: "hsl(var(--chart-2))", // Màu đỏ
  },
  social: {
    label: "Mạng xã hội",
    color: "hsl(var(--chart-3))", // Màu vàng
  },
  direct: {
    label: "Truy cập trực tiếp",
    color: "hsl(var(--chart-4))", // Màu xanh lá
  },
} satisfies ChartConfig;

export function DashboardCharts() {
  const [timeRange, setTimeRange] = React.useState("30d"); // Mặc định là 30 ngày để khớp với dữ liệu

  // Lọc dữ liệu theo khoảng thời gian
  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-04-30"); // Ngày cuối cùng trong dữ liệu
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="border  rounded-[10px] border-gray-200 ">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Biểu đồ nguồn truy cập</CardTitle>
          <CardDescription>
            Hiển thị tổng số người truy cập theo nguồn trong khoảng thời gian đã chọn
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Chọn khoảng thời gian"
          >
            <SelectValue placeholder="30 ngày qua" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              90 ngày qua
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              30 ngày qua
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              7 ngày qua
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillOrganic" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-organic)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-organic)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillPaid" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-paid)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-paid)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillSocial" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-social)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-social)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillDirect" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-direct)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-direct)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("vi-VN", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("vi-VN", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="organic"
              type="natural"
              fill="url(#fillOrganic)"
              stroke="var(--color-organic)"
              stackId="a"
            />
            <Area
              dataKey="paid"
              type="natural"
              fill="url(#fillPaid)"
              stroke="var(--color-paid)"
              stackId="a"
            />
            <Area
              dataKey="social"
              type="natural"
              fill="url(#fillSocial)"
              stroke="var(--color-social)"
              stackId="a"
            />
            <Area
              dataKey="direct"
              type="natural"
              fill="url(#fillDirect)"
              stroke="var(--color-direct)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default DashboardCharts;