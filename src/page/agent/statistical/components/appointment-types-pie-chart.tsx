import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetAppointmentTypesStats } from '../hooks/use-appointment-types';

interface AppointmentTypesPieChartProps {
  year: number;
}

export function AppointmentTypesPieChart({ year }: AppointmentTypesPieChartProps) {
  const { data, isLoading, isError } = useGetAppointmentTypesStats(year);

  const colors = [
    'rgb(239, 68, 68)', // red-500: Tư vấn mua
    'rgb(248, 113, 113)', // red-400: Tư vấn thuê
    'rgb(220, 38, 38)', // red-600: Xem nhà
    'rgb(185, 28, 28)', // red-700: Ký hợp đồng
  ];

  // Gán màu sắc cho dữ liệu
  const chartData:any = isLoading || isError ? [] : data?.map((item, index) => ({
    ...item,
    color: colors[index % colors.length],
  }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <p className="font-medium text-sm">{payload[0].name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            <span className="font-semibold text-gray-800 dark:text-gray-200">{payload[0].value}</span> lịch hẹn
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {((payload[0].value / chartData.reduce((sum:any, entry:any) => sum + entry.value, 0)) * 100).toFixed(1)}% tổng số
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom label
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-[10px] font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
      <CardHeader className="pb-2 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-red-500"></span>
          Phân Loại Lịch Hẹn
        </CardTitle>
        <CardDescription className="text-xs">Tỷ lệ các loại lịch hẹn trong năm {year}</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[250px] flex items-center justify-center">
          {isLoading ? (
            <Skeleton className="h-[250px] w-full rounded-md" />
          ) : isError ? (
            <div className="h-[250px] flex items-center justify-center text-[14px] text-red-500">
              Lỗi tải dữ liệu thống kê
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <defs>
                  {chartData.map((entry:any, index:number) => (
                    <linearGradient
                      key={`gradient-${index}`}
                      id={`colorGradient-${index}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor={entry.color} stopOpacity={0.9} />
                      <stop offset="100%" stopColor={entry.color} stopOpacity={0.6} />
                    </linearGradient>
                  ))}
                </defs>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  animationDuration={1500}
                  animationBegin={200}
                >
                  {chartData.map((entry:any, index:number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`url(#colorGradient-${index})`}
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
        {!isLoading && !isError && (
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {chartData.map((entry:any, index:number) => (
              <div key={index} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-[10px] text-gray-600 dark:text-gray-400">{entry.name}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}