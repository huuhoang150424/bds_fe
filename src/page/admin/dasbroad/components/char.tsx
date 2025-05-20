import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useState } from 'react';
import { useGetMonthlyRevenue } from '../hooks/use-get-monthly-revenue';

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const Overview: React.FC<{ year: number }> = ({ year }) => {
  const { data, isLoading, error } = useGetMonthlyRevenue(year);

  // Skeleton Loading Component
  const SkeletonChart = () => (
    <div className="animate-pulse">
      <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
      <div className="h-[350px] w-full bg-gray-200 dark:bg-gray-700 rounded-lg" />
    </div>
  );

  if (isLoading) return <SkeletonChart />;
  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertTitle>Lỗi</AlertTitle>
        <AlertDescription>Không thể tải dữ liệu doanh thu. Vui lòng thử lại sau.</AlertDescription>
      </Alert>
    );
  }

  const chartData = data?.data?.monthlyRevenue?.map((item: { month: number; revenue: number }) => ({
    name: monthNames[item.month - 1],
    total: item.revenue,
  })) || [];

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
        <CartesianGrid vertical={false} stroke="#ccc" strokeDasharray="5 5" />
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={10}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value.toLocaleString()} `}
        />
        <Tooltip
          cursor={{ fill: 'transparent' }}
          formatter={(value: number) => [`Total: ${value.toLocaleString()} vnđ`, '']}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

const Chart: React.FC = () => {
  const [sizePage, setSizePage] = useState(2025);

  return (
    <Card className="self-start col-span-1 lg:col-span-4 rounded-lg border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Doanh thu của từng tháng</CardTitle>
        <Select
          value={`${sizePage}`}
          onValueChange={(value) => {
            setSizePage(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-[70px] shadow-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent side="top">
            {[2020, 2021, 2022, 2023, 2024, 2025].map((pageSize) => (
              <SelectItem className="text-textColor" key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pl-2">
        <Overview year={sizePage} />
      </CardContent>
    </Card>
  );
};

export default Chart;