import useScrollToTopOnMount from '@/hooks/use-scroll-top';
import { ArrowUpIcon, CheckCircle, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Treemap,
  Sankey,
  Rectangle,
} from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import ActiveUsersTable from '../components/active-users';
import DemographicStats from '../components/demographic-stats';

const userGrowthData = [
  { month: 'T1', admin: 5, agent: 25, user: 120 },
  { month: 'T2', admin: 5, agent: 30, user: 150 },
  { month: 'T3', admin: 6, agent: 35, user: 180 },
  { month: 'T4', admin: 6, agent: 40, user: 210 },
  { month: 'T5', admin: 7, agent: 45, user: 240 },
  { month: 'T6', admin: 7, agent: 50, user: 270 },
  { month: 'T7', admin: 8, agent: 55, user: 300 },
  { month: 'T8', admin: 8, agent: 60, user: 330 },
  { month: 'T9', admin: 9, agent: 65, user: 360 },
  { month: 'T10', admin: 9, agent: 70, user: 390 },
  { month: 'T11', admin: 10, agent: 75, user: 420 },
  { month: 'T12', admin: 10, agent: 80, user: 450 },
];

const emailVerificationData = [
  { name: 'Đã xác thực', value: 75 },
  { name: 'Chưa xác thực', value: 25 },
];

const genderData = [
  { name: 'Nam', value: 60 },
  { name: 'Nữ', value: 35 },
  { name: 'Khác', value: 5 },
];

const ageData = [
  { name: '18-24', value: 15 },
  { name: '25-34', value: 35 },
  { name: '35-44', value: 25 },
  { name: '45-54', value: 15 },
  { name: '55+', value: 10 },
];

const regionData = [
  {
    name: 'Miền Bắc',
    children: [
      { name: 'Hà Nội', size: 30 },
      { name: 'Hải Phòng', size: 10 },
      { name: 'Quảng Ninh', size: 5 },
      { name: 'Khác', size: 5 },
    ],
  },
  {
    name: 'Miền Trung',
    children: [
      { name: 'Đà Nẵng', size: 15 },
      { name: 'Huế', size: 5 },
      { name: 'Nha Trang', size: 5 },
      { name: 'Khác', size: 5 },
    ],
  },
  {
    name: 'Miền Nam',
    children: [
      { name: 'TP.HCM', size: 35 },
      { name: 'Cần Thơ', size: 5 },
      { name: 'Vũng Tàu', size: 5 },
      { name: 'Khác', size: 5 },
    ],
  },
];

const activeUsersData = [
  { id: 1, name: 'Nguyễn Văn A', posts: 45, interactions: 320 },
  { id: 2, name: 'Trần Thị B', posts: 38, interactions: 280 },
  { id: 3, name: 'Lê Văn C', posts: 32, interactions: 250 },
  { id: 4, name: 'Phạm Thị D', posts: 28, interactions: 210 },
  { id: 5, name: 'Hoàng Văn E', posts: 25, interactions: 190 },
];

const userFlowData = {
  nodes: [
    { name: 'Khách truy cập' },
    { name: 'Đăng ký' },
    { name: 'Xác thực' },
    { name: 'Tìm kiếm' },
    { name: 'Liên hệ' },
    { name: 'Đặt lịch hẹn' },
    { name: 'Giao dịch' },
  ],
  links: [
    { source: 0, target: 1, value: 100 },
    { source: 1, target: 2, value: 75 },
    { source: 2, target: 3, value: 70 },
    { source: 3, target: 4, value: 45 },
    { source: 4, target: 5, value: 30 },
    { source: 5, target: 6, value: 20 },
    { source: 0, target: 3, value: 25 },
    { source: 3, target: 6, value: 5 },
  ],
};
const COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
export default function StatisticalUser() {
  useScrollToTopOnMount();
  return (
    <Card className='col-span-3' id='users'>
      <CardHeader className='pb-2'>
        <CardTitle className='text-base text-red-500'>Thống Kê Người Dùng</CardTitle>
        <CardDescription className='text-xs'>Phân tích dữ liệu người dùng và hoạt động</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-xs font-medium'>Tổng Người Dùng</CardTitle>
              <Users className='h-4 w-4 text-red-500' />
            </CardHeader>
            <CardContent>
              <div className='text-sm font-bold'>540</div>
              <p className='text-xs text-muted-foreground'>
                <span className='text-green-500 flex items-center'>
                  <ArrowUpIcon className='h-3 w-3 mr-1' />
                  +7.2%
                </span>{' '}
                so với tháng trước
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-xs font-medium'>Người Dùng Mới</CardTitle>
              <Users className='h-4 w-4 text-red-500' />
            </CardHeader>
            <CardContent>
              <div className='text-sm font-bold'>48</div>
              <p className='text-xs text-muted-foreground'>
                <span className='text-green-500 flex items-center'>
                  <ArrowUpIcon className='h-3 w-3 mr-1' />
                  +12.5%
                </span>{' '}
                so với tháng trước
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-xs font-medium'>Tỷ Lệ Xác Thực Email</CardTitle>
              <CheckCircle className='h-4 w-4 text-red-500' />
            </CardHeader>
            <CardContent>
              <div className='text-sm font-bold'>75%</div>
              <p className='text-xs text-muted-foreground'>
                <span className='text-green-500 flex items-center'>
                  <ArrowUpIcon className='h-3 w-3 mr-1' />
                  +5.3%
                </span>{' '}
                so với tháng trước
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-xs font-medium'>Tỷ Lệ Giữ Chân</CardTitle>
              <Users className='h-4 w-4 text-red-500' />
            </CardHeader>
            <CardContent>
              <div className='text-sm font-bold'>68%</div>
              <p className='text-xs text-muted-foreground'>
                <span className='text-green-500 flex items-center'>
                  <ArrowUpIcon className='h-3 w-3 mr-1' />
                  +2.1%
                </span>{' '}
                so với tháng trước
              </p>
            </CardContent>
          </Card>
        </div>

        <div className='grid gap-4 md:grid-cols-2 mt-4'>
          <Card className='col-span-1'>
            <CardHeader>
              <CardTitle className='text-xs'>Tăng Trưởng Người Dùng Theo Thời Gian</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='h-[300px]'>
                <ResponsiveContainer width='100%' height='100%'>
                  <AreaChart data={userGrowthData}>
                    <defs>
                      <linearGradient id='colorAdmin' x1='0' y1='0' x2='0' y2='1'>
                        <stop offset='5%' stopColor='#ef4444' stopOpacity={0.8} />
                        <stop offset='95%' stopColor='#ef4444' stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id='colorAgent' x1='0' y1='0' x2='0' y2='1'>
                        <stop offset='5%' stopColor='#3b82f6' stopOpacity={0.8} />
                        <stop offset='95%' stopColor='#3b82f6' stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id='colorUser' x1='0' y1='0' x2='0' y2='1'>
                        <stop offset='5%' stopColor='#10b981' stopOpacity={0.8} />
                        <stop offset='95%' stopColor='#10b981' stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray='3 3' vertical={false} stroke='#f5f5f5' />
                    <XAxis dataKey='month' tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                    <Tooltip
                      formatter={(value, name) => {
                        if (name === 'admin') return [value, 'Admin'];
                        if (name === 'agent') return [value, 'Agent'];
                        if (name === 'user') return [value, 'User'];
                        return [value, name];
                      }}
                      contentStyle={{ fontSize: '10px' }}
                    />
                    <Legend
                      formatter={(value) => {
                        if (value === 'admin') return 'Admin';
                        if (value === 'agent') return 'Agent';
                        if (value === 'user') return 'User';
                        return value;
                      }}
                      wrapperStyle={{ fontSize: '10px' }}
                    />
                    <Area type='monotone' dataKey='admin' stroke='#ef4444' fillOpacity={1} fill='url(#colorAdmin)' />
                    <Area type='monotone' dataKey='agent' stroke='#3b82f6' fillOpacity={1} fill='url(#colorAgent)' />
                    <Area type='monotone' dataKey='user' stroke='#10b981' fillOpacity={1} fill='url(#colorUser)' />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card className='col-span-1'>
            <CardHeader>
              <CardTitle className='text-xs'>Tỷ Lệ Xác Thực Email</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='h-[300px]'>
                <ResponsiveContainer width='100%' height='100%'>
                  <PieChart>
                    <Pie
                      data={emailVerificationData}
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
                      {emailVerificationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? '#10b981' : '#ef4444'} />
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
        </div>
        <DemographicStats/>

        <div className='mt-4'>
          <ActiveUsersTable/>
        </div>

      </CardContent>
    </Card>
  );
}
