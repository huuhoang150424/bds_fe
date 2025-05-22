
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
import { useGetSatisticalByMonth } from "../hooks/use-get-statiscal-by-month";

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
  const { data, isLoading, isError } = useGetSatisticalByMonth();
  console.log("data satistical month", data);

  const charDataMonth = data?.map((item: any) => {
    console.log("month", item.month);
    console.log("count", item.count);
    return {
      month: item.month,
      post: item.count,
    };
  });

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
            data={charDataMonth}
            width={500} 
            height={200}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={5}
              axisLine={false}
              tickFormatter={(value) => value.replace("Tháng ", "T")} 
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={5} 
              width={30} 
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="post" fill="red" radius={4} /> 
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