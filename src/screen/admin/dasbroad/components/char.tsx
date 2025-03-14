import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { useState } from 'react';

const data = [
  { name: 'Jan', total: 12000000 },
  { name: 'Feb', total: 9000000 },
  { name: 'Mar', total: 15000000 },
  { name: 'Apr', total: 11000000 },
  { name: 'May', total: 17000000 },
  { name: 'Jun', total: 14000000 },
  { name: 'Jul', total: 18000000 },
  { name: 'Aug', total: 16000000 },
  { name: 'Sep', total: 13000000 },
  { name: 'Oct', total: 19000000 },
  { name: 'Nov', total: 20000000 },
  { name: 'Dec', total: 22000000 },
]

const Overview: React.FC = () => {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <BarChart data={data}>
        <CartesianGrid vertical={false} stroke="#ccc" strokeDasharray="5 5" />
        <XAxis
          dataKey='name'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke='#888888'
          fontSize={10}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value.toLocaleString()} `}
        />
        <Tooltip
          cursor={{ fill: 'transparent' }}
          formatter={(value) => [`Total: ${value.toLocaleString()} vnđ`, '']} 
        />
        <Bar
          dataKey='total'
          fill='currentColor'
          radius={[4, 4, 0, 0]}
          className='fill-primary'
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

const Chart: React.FC=()=> {

  const [sizePage, setSizePage] = useState(2025);
  
  return (
    <Card className='self-start col-span-1 lg:col-span-4 rounded-[6px] border border-gray-200 shadow-sm cursor-pointer dark:bg-colorDarkMode dark:border-borderDarkMode transition-all duration-500 ease-linear'>
    <CardHeader className='flex flex-row items-center justify-between '>
      <CardTitle>Doanh thu của từng tháng</CardTitle>
      <Select
          value={`${sizePage}`}
          onValueChange={(value) => {
            setSizePage(Number(value))
          }}
        >
          <SelectTrigger className='h-8 w-[70px]  shadow-none '>
            <SelectValue />
          </SelectTrigger>
          <SelectContent side='top'>
            {[2020, 2021, 2022, 2023, 2024,2025].map((pageSize) => (
              <SelectItem className="text-textColor" key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
    </CardHeader>
    <CardContent className='pl-2'>
      <Overview />
    </CardContent>
  </Card>
  )
}
export default Chart;
