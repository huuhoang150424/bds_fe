'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useGetTopSearchRegions } from '../hooks/use-get-top-search-region';
import { string } from 'zod';

interface item {
  address: string;
  viewCount: number;
  fill: string;
}

export function Trend() {
  const { data, isLoading, isError } = useGetTopSearchRegions();
  // console.log('data satistical', data);

  const chartColors = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
    'hsl(var(--chart-6))',
    'hsl(var(--chart-7))',
    'hsl(var(--chart-8))',
  ];

  const areaColorMap = new Map<string, string>();
  let colorIndex = 0;

  const rawChartData = data?.map((item: any) => {
    const parts = item.address.split(',').map((part: string) => part.trim());
    const area = parts.length >= 2 ? parts[1] : item.address;

    // Gán màu cho mỗi khu vực nếu chưa có
    if (!areaColorMap.has(area)) {
      areaColorMap.set(area, chartColors[colorIndex % chartColors.length]);
      colorIndex++;
    }

    return {
      area,
      visitors: item.viewCount,
      fill: areaColorMap.get(area),
    };
  });

  // 🔥 Lọc bỏ các vùng trùng tên (giữ lại vùng đầu tiên)
  const uniqueChartData = rawChartData?.filter(
    (item: { area: any }, index: any, self: any[]) => index === self.findIndex((i) => i.area === item.area),
  );

  const chartConfig = {
    visitors: {
      label: 'Lượt tìm kiếm',
    },
  } satisfies ChartConfig;
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  return (
    <Card className='border border-gray-200 rounded-[10px] w-full '>
      <CardHeader>
        <CardTitle className='mb-[5px]'>Top khu vực tìm kiếm trong tháng qua</CardTitle>
        <CardDescription>Thống kê từ trong tháng {month}/{year}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={uniqueChartData}
            layout='vertical'
            width={350}
            height={200}
            margin={{ left: 10 }}
          >
            <YAxis dataKey='area' type='category' tickLine={false} tickMargin={5} axisLine={false} />
            <XAxis dataKey='visitors' type='number' hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey='visitors' layout='vertical' radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col items-start gap-2 text-sm'>
        <div className='flex gap-2 font-medium leading-none text-green-500'>
          {/* Tăng 5.2% so với tháng trước <TrendingUp className='h-4 w-4' /> */}
        </div>
        <div className='leading-none text-muted-foreground'>Dữ liệu từ khóa tìm kiếm tháng {month}/{year}</div>
      </CardFooter>
    </Card>
  );
}
