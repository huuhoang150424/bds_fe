import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetAppointmentTrend } from '../hooks/use-appointment-trend';

interface AppointmentTrendChartProps {
  year: number;
  period: string; // year, quarter, month
}

export function AppointmentTrendChart({ year, period }: AppointmentTrendChartProps) {
  const { data, isLoading, isError } = useGetAppointmentTrend(year, period);

  const chartData = isLoading || isError ? [] : data || [];

  return (
    <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
      <CardHeader className="pb-2 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-red-500"></span>
          Xu Hướng Lịch Hẹn
        </CardTitle>
        <CardDescription className="text-xs">
          So sánh với {period === 'year' ? 'năm trước' : period === 'quarter' ? 'quý trước' : 'tháng trước'} trong năm {year}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[250px]">
          {isLoading ? (
            <Skeleton className="h-[250px] w-full rounded-md" />
          ) : isError ? (
            <div className="h-[250px] flex items-center justify-center text-[14px] text-red-500">
              Lỗi tải dữ liệu xu hướng
            </div>
          ) : (
            <ChartContainer
              config={{
                current: {
                  label: 'Năm nay',
                  color: 'rgb(239, 68, 68)', // red-500
                },
                previous: {
                  label: 'Năm trước',
                  color: 'rgb(248, 113, 113)', // red-400
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                  <defs>
                    <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="rgb(239, 68, 68)" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="rgb(239, 68, 68)" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="colorPrevious" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="rgb(248, 113, 113)" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="rgb(248, 113, 113)" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tickMargin={8} tick={{ fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tickMargin={8} tick={{ fontSize: 11 }} />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    cursor={{ stroke: 'rgba(0, 0, 0, 0.1)', strokeWidth: 1, strokeDasharray: '3 3' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="current"
                    stroke="rgb(239, 68, 68)"
                    strokeWidth={2}
                    fill="url(#colorCurrent)"
                    activeDot={{ r: 6, strokeWidth: 0 }}
                    animationDuration={1500}
                  />
                  <Area
                    type="monotone"
                    dataKey="previous"
                    stroke="rgb(248, 113, 113)"
                    strokeWidth={2}
                    fill="url(#colorPrevious)"
                    activeDot={{ r: 6, strokeWidth: 0 }}
                    animationDuration={1500}
                    animationBegin={300}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}