import useScrollToTopOnMount from '@/hooks/use-scroll-top';
import { ArrowUpIcon, Building2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Treemap,
} from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatCurrency } from '../../pricing/components/column';

const propertyTypeData = [
  { name: 'Căn hộ', value: 35 },
  { name: 'Nhà phố', value: 25 },
  { name: 'Biệt thự', value: 15 },
  { name: 'Đất nền', value: 25 },
];

const propertyRegionData = [
  { name: 'Hà Nội', value: 30 },
  { name: 'TP.HCM', value: 35 },
  { name: 'Đà Nẵng', value: 15 },
  { name: 'Khác', value: 20 },
];

const propertyPriceRangeData = [
  { name: '<1 tỷ', value: 10 },
  { name: '1-2 tỷ', value: 25 },
  { name: '2-5 tỷ', value: 35 },
  { name: '5-10 tỷ', value: 20 },
  { name: '>10 tỷ', value: 10 },
];

const propertyTrendData = [
  { month: 'T1', listings: 85, sold: 42, price: 2500000000 },
  { month: 'T2', listings: 90, sold: 46, price: 2550000000 },
  { month: 'T3', listings: 95, sold: 49, price: 2600000000 },
  { month: 'T4', listings: 100, sold: 52, price: 2650000000 },
  { month: 'T5', listings: 105, sold: 55, price: 2700000000 },
  { month: 'T6', listings: 110, sold: 59, price: 2750000000 },
  { month: 'T7', listings: 115, sold: 62, price: 2800000000 },
  { month: 'T8', listings: 120, sold: 65, price: 2850000000 },
  { month: 'T9', listings: 125, sold: 68, price: 2900000000 },
  { month: 'T10', listings: 130, sold: 72, price: 2950000000 },
  { month: 'T11', listings: 135, sold: 75, price: 3000000000 },
  { month: 'T12', listings: 140, sold: 78, price: 3050000000 },
];

const propertyFunnelData = [
  { value: 100, name: 'Xem', fill: '#3b82f6' },
  { value: 80, name: 'Liên hệ', fill: '#10b981' },
  { value: 50, name: 'Xem nhà', fill: '#f59e0b' },
  { value: 30, name: 'Đàm phán', fill: '#8b5cf6' },
  { value: 20, name: 'Giao dịch', fill: '#ef4444' },
];

const topPropertiesData = [
  { id: 1, title: 'Căn hộ cao cấp view sông', price: 3500000000, views: 1250, type: 'Căn hộ' },
  { id: 2, title: 'Nhà phố trung tâm thành phố', price: 5200000000, views: 980, type: 'Nhà phố' },
  { id: 3, title: 'Biệt thự vườn ngoại ô', price: 8700000000, views: 870, type: 'Biệt thự' },
  { id: 4, title: 'Đất nền khu đô thị mới', price: 2800000000, views: 760, type: 'Đất nền' },
  { id: 5, title: 'Căn hộ studio giá rẻ', price: 1500000000, views: 650, type: 'Căn hộ' },
];

const propertySunburstData = {
  name: 'Bất động sản',
  children: [
    {
      name: 'Căn hộ',
      children: [
        { name: '1 phòng ngủ', size: 10, color: '#ef4444' },
        { name: '2 phòng ngủ', size: 15, color: '#ef4444' },
        { name: '3 phòng ngủ', size: 8, color: '#ef4444' },
        { name: 'Penthouse', size: 2, color: '#ef4444' },
      ],
    },
    {
      name: 'Nhà phố',
      children: [
        { name: 'Nhà mặt tiền', size: 10, color: '#3b82f6' },
        { name: 'Nhà trong hẻm', size: 8, color: '#3b82f6' },
        { name: 'Nhà phố thương mại', size: 7, color: '#3b82f6' },
      ],
    },
    {
      name: 'Biệt thự',
      children: [
        { name: 'Biệt thự đơn lập', size: 5, color: '#10b981' },
        { name: 'Biệt thự song lập', size: 4, color: '#10b981' },
        { name: 'Biệt thự liền kề', size: 6, color: '#10b981' },
      ],
    },
    {
      name: 'Đất nền',
      children: [
        { name: 'Đất thổ cư', size: 12, color: '#f59e0b' },
        { name: 'Đất nền dự án', size: 8, color: '#f59e0b' },
        { name: 'Đất nông nghiệp', size: 5, color: '#f59e0b' },
      ],
    },
  ],
};

const COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
export default function Statistical() {
  useScrollToTopOnMount();
  return (
    <Card className='col-span-3' id='properties'>
      <CardHeader className='pb-2'>
        <CardTitle className='text-base text-red-500'>Thống Kê Bất Động Sản</CardTitle>
        <CardDescription className='text-xs'>Phân tích dữ liệu bất động sản theo loại hình và khu vực</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-xs font-medium'>Tổng Bất Động Sản</CardTitle>
              <Building2 className='h-4 w-4 text-red-500' />
            </CardHeader>
            <CardContent>
              <div className='text-sm font-bold'>2,845</div>
              <p className='text-xs text-muted-foreground'>
                <span className='text-green-500 flex items-center'>
                  <ArrowUpIcon className='h-3 w-3 mr-1' />
                  +5.2%
                </span>{' '}
                so với tháng trước
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-xs font-medium'>Giá Trung Bình</CardTitle>
              <Building2 className='h-4 w-4 text-red-500' />
            </CardHeader>
            <CardContent>
              <div className='text-sm font-bold'>{formatCurrency(3050000000)}</div>
              <p className='text-xs text-muted-foreground'>
                <span className='text-green-500 flex items-center'>
                  <ArrowUpIcon className='h-3 w-3 mr-1' />
                  +1.7%
                </span>{' '}
                so với tháng trước
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-xs font-medium'>Tỷ Lệ Bán</CardTitle>
              <Building2 className='h-4 w-4 text-red-500' />
            </CardHeader>
            <CardContent>
              <div className='text-sm font-bold'>55.7%</div>
              <p className='text-xs text-muted-foreground'>
                <span className='text-green-500 flex items-center'>
                  <ArrowUpIcon className='h-3 w-3 mr-1' />
                  +2.3%
                </span>{' '}
                so với tháng trước
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-xs font-medium'>Thời Gian B��n TB</CardTitle>
              <Building2 className='h-4 w-4 text-red-500' />
            </CardHeader>
            <CardContent>
              <div className='text-sm font-bold'>45 ngày</div>
              <p className='text-xs text-muted-foreground'>
                <span className='text-green-500 flex items-center'>
                  <ArrowUpIcon className='h-3 w-3 mr-1' />
                  -3 ngày
                </span>{' '}
                so với tháng trước
              </p>
            </CardContent>
          </Card>
        </div>

        <div className='grid gap-4 md:grid-cols-3 mt-4'>
          <Card className='col-span-1'>
            <CardHeader>
              <CardTitle className='text-xs'>Phân Bổ Theo Loại Hình</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='h-[250px]'>
                <ResponsiveContainer width='100%' height='100%'>
                  <PieChart>
                    <Pie
                      data={propertyTypeData}
                      cx='50%'
                      cy='50%'
                      labelLine={false}
                      innerRadius={60}
                      outerRadius={80}
                      fill='#8884d8'
                      paddingAngle={5}
                      dataKey='value'
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {propertyTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend
                      verticalAlign='bottom'
                      height={36}
                      formatter={(value) => <span className='text-xs'>{value}</span>}
                    />
                    <Tooltip formatter={(value) => [`${value}%`, '']} contentStyle={{ fontSize: '10px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card className='col-span-1'>
            <CardHeader>
              <CardTitle className='text-xs'>Phân Bổ Theo Khu Vực</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='h-[250px]'>
                <ResponsiveContainer width='100%' height='100%'>
                  <PieChart>
                    <Pie
                      data={propertyRegionData}
                      cx='50%'
                      cy='50%'
                      labelLine={false}
                      innerRadius={60}
                      outerRadius={80}
                      fill='#8884d8'
                      paddingAngle={5}
                      dataKey='value'
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {propertyRegionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend
                      verticalAlign='bottom'
                      height={36}
                      formatter={(value) => <span className='text-xs'>{value}</span>}
                    />
                    <Tooltip formatter={(value) => [`${value}%`, '']} contentStyle={{ fontSize: '10px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card className='col-span-1'>
            <CardHeader>
              <CardTitle className='text-xs'>Phân Bổ Theo Giá</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='h-[250px]'>
                <ResponsiveContainer width='100%' height='100%'>
                  <BarChart data={propertyPriceRangeData} layout='vertical'>
                    <CartesianGrid strokeDasharray='3 3' horizontal={true} vertical={false} stroke='#f5f5f5' />
                    <XAxis type='number' tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                    <YAxis dataKey='name' type='category' tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                    <Tooltip formatter={(value) => [`${value}%`, '']} contentStyle={{ fontSize: '10px' }} />
                    <Bar dataKey='value' radius={[0, 4, 4, 0]}>
                      {propertyPriceRangeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className='mt-4'>
          <CardHeader>
            <CardTitle className='text-xs'>Xu Hướng Bất Động Sản Theo Tháng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='h-[300px]'>
              <ResponsiveContainer width='100%' height='100%'>
                <ComposedChart data={propertyTrendData}>
                  <CartesianGrid strokeDasharray='3 3' vertical={false} stroke='#f5f5f5' />
                  <XAxis dataKey='month' tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                  <YAxis yAxisId='left' tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                  <YAxis
                    yAxisId='right'
                    orientation='right'
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${(value / 1000000000).toFixed(1)}B`}
                  />
                  <Tooltip
                    formatter={(value, name) => {
                      if (name === 'price') return [formatCurrency(value as number), 'Giá trung bình'];
                      if (name === 'listings') return [value, 'Số tin đăng'];
                      if (name === 'sold') return [value, 'Số đã bán'];
                      return [value, name];
                    }}
                    contentStyle={{ fontSize: '10px' }}
                  />
                  <Legend
                    formatter={(value) => {
                      if (value === 'price') return 'Giá trung bình';
                      if (value === 'listings') return 'Số tin đăng';
                      if (value === 'sold') return 'Số đã bán';
                      return value;
                    }}
                    wrapperStyle={{ fontSize: '10px' }}
                  />
                  <Bar dataKey='listings' barSize={20} fill='#3b82f6' yAxisId='left' />
                  <Bar dataKey='sold' barSize={20} fill='#10b981' yAxisId='left' />
                  <Line
                    type='monotone'
                    dataKey='price'
                    stroke='#ef4444'
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                    yAxisId='right'
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className='w-full '>
          <Card className='col-span-1'>
            <CardHeader>
              <CardTitle className='text-xs'>Bất Động Sản Nổi Bật</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='w-[50px] text-xs'>ID</TableHead>
                    <TableHead className='text-xs'>Tiêu Đề</TableHead>
                    <TableHead className='text-xs'>Loại</TableHead>
                    <TableHead className='text-right text-xs'>Giá</TableHead>
                    <TableHead className='text-right text-xs'>Lượt Xem</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topPropertiesData.map((property) => (
                    <TableRow key={property.id}>
                      <TableCell className='text-xs'>{property.id}</TableCell>
                      <TableCell className='text-xs'>{property.title}</TableCell>
                      <TableCell className='text-xs'>{property.type}</TableCell>
                      <TableCell className='text-right text-xs'>{formatCurrency(property.price)}</TableCell>
                      <TableCell className='text-right text-xs'>{property.views}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
