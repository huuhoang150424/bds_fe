import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetPostTypeConversion } from '../hooks/use-post-conversion';

interface PostTypeConversionChartProps {
  year: number;
}

export function PostTypeConversionChart({ year }: PostTypeConversionChartProps) {
  const { data, isLoading, isError } = useGetPostTypeConversion(year);

  const chartData = isLoading || isError ? [] : data || [];

  return (
    <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
      <CardHeader className="pb-2 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-red-500"></span>
          Tỷ Lệ Chuyển Đổi Theo Loại Bài Đăng
        </CardTitle>
        <CardDescription className="text-xs">
          Số lịch hẹn và tỷ lệ ký hợp đồng theo loại bất động sản năm {year}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[250px]">
          {isLoading ? (
            <Skeleton className="h-[250px] w-full rounded-md" />
          ) : isError ? (
            <div className="h-[250px] flex items-center justify-center text-[14px] text-red-500">
              Lỗi tải dữ liệu tỷ lệ chuyển đổi
            </div>
          ) : (
            <ChartContainer
              config={{
                appointments: {
                  label: 'Lịch hẹn',
                  color: 'rgb(220, 38, 38)', // red-600
                },
                conversionRate: {
                  label: 'Tỷ lệ chuyển đổi (%)',
                  color: 'rgb(248, 113, 113)', // red-400
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                  <defs>
                    <linearGradient id="colorAppointments" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="rgb(220, 38, 38)" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="rgb(220, 38, 38)" stopOpacity={0.4} />
                    </linearGradient>
                    <linearGradient id="colorConversion" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="rgb(248, 113, 113)" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="rgb(248, 113, 113)" stopOpacity={0.4} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="type" axisLine={false} tickLine={false} tickMargin={8} tick={{ fontSize: 11 }} />
                  <YAxis
                    yAxisId="left"
                    axisLine={false}
                    tickLine={false}
                    tickMargin={8}
                    tick={{ fontSize: 11 }}
                    label={{ value: 'Số lịch hẹn', angle: -90, position: 'insideLeft', offset: -5, fontSize: 11 }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    axisLine={false}
                    tickLine={false}
                    tickMargin={8}
                    tick={{ fontSize: 11 }}
                    label={{ value: 'Tỷ lệ (%)', angle: 90, position: 'insideRight', offset: -5, fontSize: 11 }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
                  <Legend verticalAlign="top" height={36} />
                  <Bar
                    yAxisId="left"
                    dataKey="appointments"
                    name="Lịch hẹn"
                    fill="url(#colorAppointments)"
                    radius={[4, 4, 0, 0]}
                    barSize={20}
                    animationDuration={1500}
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="conversionRate"
                    name="Tỷ lệ chuyển đổi"
                    fill="url(#colorConversion)"
                    radius={[4, 4, 0, 0]}
                    barSize={20}
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