import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetAppointmentStatisticalByMonth } from '../hooks/use-appointment-mount';

interface MonthlyAppointmentsChartProps {
  year: number;
}

export function MonthlyAppointmentsChart({ year }: MonthlyAppointmentsChartProps) {
  const { data, isLoading, isError } = useGetAppointmentStatisticalByMonth(year);

  const chartData = isLoading || isError ? [] : data?.map((item) => ({
    month: item.month.replace('Tháng ', 'T'),
    appointments: item.count,
  }));

  return (
    <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
      <CardHeader className="pb-2 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-red-500"></span>
          Lịch Hẹn Theo Tháng
        </CardTitle>
        <CardDescription className="text-xs">
          Thống kê từ tháng 1 - tháng 12 năm {year}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[250px]">
          {isLoading ? (
            <Skeleton className="h-[250px] w-full rounded-md" />
          ) : isError ? (
            <div className="h-[250px] flex items-center justify-center text-[14px] text-red-500">
              Lỗi tải dữ liệu thống kê
            </div>
          ) : (
            <ChartContainer
              config={{
                appointments: {
                  label: 'Lịch hẹn',
                  color: 'rgb(239, 68, 68)', 
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id="colorAppointments" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="rgb(239, 68, 68)" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="rgb(239, 68, 68)" stopOpacity={0.4} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tickMargin={8}
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tickMargin={8}
                    tick={{ fontSize: 11 }}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                  />
                  <Bar
                    dataKey="appointments"
                    fill="url(#colorAppointments)"
                    radius={[4, 4, 0, 0]}
                    barSize={16}
                    animationDuration={1500}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}