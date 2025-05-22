import useScrollToTopOnMount from '@/hooks/use-scroll-top';
import { ArrowUpIcon, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Area,
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
  ScatterChart,
  Scatter,
  ZAxis,
} from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const postStatusData = [
  { name: 'Đã đăng', value: 60 },
  { name: 'Đang chờ', value: 15 },
  { name: 'Bản nháp', value: 20 },
  { name: 'Hết hạn', value: 5 },
];

const postTimelineData = [
  { stage: 'Nháp → Chờ duyệt', time: 2.5 },
  { stage: 'Chờ duyệt → Đã đăng', time: 1.2 },
  { stage: 'Trung bình', time: 3.7 },
];

const postTrendData = [
  { month: 'T1', posts: 85, views: 4250, engagement: 15 },
  { month: 'T2', posts: 90, views: 4500, engagement: 16 },
  { month: 'T3', posts: 95, views: 4750, engagement: 17 },
  { month: 'T4', posts: 100, views: 5000, engagement: 18 },
  { month: 'T5', posts: 105, views: 5250, engagement: 19 },
  { month: 'T6', posts: 110, views: 5500, engagement: 20 },
  { month: 'T7', posts: 115, views: 5750, engagement: 21 },
  { month: 'T8', posts: 120, views: 6000, engagement: 22 },
  { month: 'T9', posts: 125, views: 6250, engagement: 23 },
  { month: 'T10', posts: 130, views: 6500, engagement: 24 },
  { month: 'T11', posts: 135, views: 6750, engagement: 25 },
  { month: 'T12', posts: 140, views: 7000, engagement: 26 },
];

const topViewedPostsData = [
  { id: 1, title: 'Căn hộ cao cấp view sông', views: 1250, status: 'Đã đăng' },
  { id: 2, title: 'Nhà phố trung tâm thành phố', views: 980, status: 'Đã đăng' },
  { id: 3, title: 'Biệt thự vườn ngoại ô', views: 870, status: 'Đã đăng' },
  { id: 4, title: 'Đất nền khu đô thị mới', views: 760, status: 'Đã đăng' },
  { id: 5, title: 'Căn hộ studio giá rẻ', views: 650, status: 'Đã đăng' },
];

const mostReportedPostsData = [
  { id: 1, title: 'Căn hộ giá rẻ quận 9', reports: 15, status: 'Đã đăng' },
  { id: 2, title: 'Đất nền giá đầu tư', reports: 12, status: 'Đã đăng' },
  { id: 3, title: 'Nhà trọ sinh viên', reports: 10, status: 'Đã đăng' },
  { id: 4, title: 'Căn hộ cho thuê ngắn hạn', reports: 8, status: 'Đã đăng' },
  { id: 5, title: 'Nhà mặt tiền đường lớn', reports: 7, status: 'Đã đăng' },
];

const postHeatmapData = [
  { hour: '00:00', day: 'CN', value: 5 },
  { hour: '06:00', day: 'CN', value: 10 },
  { hour: '12:00', day: 'CN', value: 15 },
  { hour: '18:00', day: 'CN', value: 20 },
  { hour: '00:00', day: 'T2', value: 2 },
  { hour: '06:00', day: 'T2', value: 15 },
  { hour: '12:00', day: 'T2', value: 25 },
  { hour: '18:00', day: 'T2', value: 30 },
  { hour: '00:00', day: 'T3', value: 3 },
  { hour: '06:00', day: 'T3', value: 18 },
  { hour: '12:00', day: 'T3', value: 28 },
  { hour: '18:00', day: 'T3', value: 35 },
  { hour: '00:00', day: 'T4', value: 4 },
  { hour: '06:00', day: 'T4', value: 20 },
  { hour: '12:00', day: 'T4', value: 30 },
  { hour: '18:00', day: 'T4', value: 40 },
  { hour: '00:00', day: 'T5', value: 5 },
  { hour: '06:00', day: 'T5', value: 22 },
  { hour: '12:00', day: 'T5', value: 35 },
  { hour: '18:00', day: 'T5', value: 45 },
  { hour: '00:00', day: 'T6', value: 10 },
  { hour: '06:00', day: 'T6', value: 25 },
  { hour: '12:00', day: 'T6', value: 40 },
  { hour: '18:00', day: 'T6', value: 50 },
  { hour: '00:00', day: 'T7', value: 15 },
  { hour: '06:00', day: 'T7', value: 20 },
  { hour: '12:00', day: 'T7', value: 30 },
  { hour: '18:00', day: 'T7', value: 35 },
];

const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
const hours = ['00:00', '06:00', '12:00', '18:00'];

const COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#ef4444'];
export default function StatisticalPost() {
  useScrollToTopOnMount();
  return (
    <Card className='col-span-3' id='posts'>
      <CardHeader className='pb-2'>
        <CardTitle className='text-base text-red-500'>Thống Kê Bài Đăng Chi Tiết</CardTitle>
        <CardDescription className='text-xs'>Phân tích dữ liệu bài đăng và hiệu suất</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-xs font-medium'>Tổng Bài Đăng</CardTitle>
              <FileText className='h-4 w-4 text-red-500' />
            </CardHeader>
            <CardContent>
              <div className='text-sm font-bold'>1,245</div>
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
              <CardTitle className='text-xs font-medium'>Bài Đăng Mới</CardTitle>
              <FileText className='h-4 w-4 text-red-500' />
            </CardHeader>
            <CardContent>
              <div className='text-sm font-bold'>128</div>
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
              <CardTitle className='text-xs font-medium'>Tỷ Lệ Duyệt</CardTitle>
              <FileText className='h-4 w-4 text-red-500' />
            </CardHeader>
            <CardContent>
              <div className='text-sm font-bold'>85%</div>
              <p className='text-xs text-muted-foreground'>
                <span className='text-green-500 flex items-center'>
                  <ArrowUpIcon className='h-3 w-3 mr-1' />
                  +3.1%
                </span>{' '}
                so với tháng trước
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-xs font-medium'>Tỷ Lệ Hết Hạn</CardTitle>
              <FileText className='h-4 w-4 text-red-500' />
            </CardHeader>
            <CardContent>
              <div className='text-sm font-bold'>5%</div>
              <p className='text-xs text-muted-foreground'>
                <span className='text-green-500 flex items-center'>
                  <ArrowUpIcon className='h-3 w-3 mr-1' />
                  -1.2%
                </span>{' '}
                so với tháng trước
              </p>
            </CardContent>
          </Card>
        </div>

        <div className='grid gap-4 md:grid-cols-2 mt-4'>
          <Card className='col-span-1'>
            <CardHeader>
              <CardTitle className='text-xs'>Tỷ Lệ Bài Đăng Theo Trạng Thái</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='h-[300px]'>
                <ResponsiveContainer width='100%' height='100%'>
                  <PieChart>
                    <Pie
                      data={postStatusData}
                      cx='50%'
                      cy='50%'
                      labelLine={false}
                      innerRadius={60}
                      outerRadius={100}
                      fill='#8884d8'
                      paddingAngle={5}
                      dataKey='value'
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {postStatusData.map((entry, index) => (
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
              <CardTitle className='text-xs'>Thời Gian Trung Bình Xử Lý Bài Đăng (ngày)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='h-[300px]'>
                <ResponsiveContainer width='100%' height='100%'>
                  <BarChart data={postTimelineData} layout='vertical'>
                    <CartesianGrid strokeDasharray='3 3' horizontal={true} vertical={false} stroke='#f5f5f5' />
                    <XAxis type='number' tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                    <YAxis
                      dataKey='stage'
                      type='category'
                      tick={{ fontSize: 10 }}
                      tickLine={false}
                      axisLine={false}
                      width={120}
                    />
                    <Tooltip formatter={(value) => [`${value} ngày`, '']} contentStyle={{ fontSize: '10px' }} />
                    <Bar dataKey='time' radius={[0, 4, 4, 0]}>
                      {postTimelineData.map((entry, index) => (
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
            <CardTitle className='text-xs'>Xu Hướng Bài Đăng & Lượt Xem</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='h-[300px]'>
              <ResponsiveContainer width='100%' height='100%'>
                <ComposedChart data={postTrendData}>
                  <CartesianGrid strokeDasharray='3 3' vertical={false} stroke='#f5f5f5' />
                  <XAxis dataKey='month' tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                  <YAxis yAxisId='left' tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                  <YAxis
                    yAxisId='right'
                    orientation='right'
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip contentStyle={{ fontSize: '10px' }} />
                  <Legend wrapperStyle={{ fontSize: '10px' }} />
                  <Area
                    type='monotone'
                    dataKey='views'
                    fill='#ef4444'
                    stroke='#ef4444'
                    fillOpacity={0.3}
                    yAxisId='right'
                  />
                  <Bar dataKey='posts' barSize={20} fill='#3b82f6' yAxisId='left' />
                  <Line
                    type='monotone'
                    dataKey='engagement'
                    stroke='#10b981'
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                    yAxisId='left'
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className='grid gap-4 md:grid-cols-2 mt-4'>
          <Card className='col-span-1'>
            <CardHeader>
              <CardTitle className='text-xs'>Bài Đăng Có Lượt Xem Cao Nhất</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='w-[50px] text-xs'>ID</TableHead>
                    <TableHead className='text-xs'>Tiêu Đề</TableHead>
                    <TableHead className='text-xs'>Trạng Thái</TableHead>
                    <TableHead className='text-right text-xs'>Lượt Xem</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topViewedPostsData.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className='text-xs'>{post.id}</TableCell>
                      <TableCell className='text-xs'>{post.title}</TableCell>
                      <TableCell className='text-xs'>
                        <span className='inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800'>
                          {post.status}
                        </span>
                      </TableCell>
                      <TableCell className='text-right text-xs'>{post.views}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card className='col-span-1'>
            <CardHeader>
              <CardTitle className='text-xs'>Bài Đăng Bị Report Nhiều Nhất</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='w-[50px] text-xs'>ID</TableHead>
                    <TableHead className='text-xs'>Tiêu Đề</TableHead>
                    <TableHead className='text-xs'>Trạng Thái</TableHead>
                    <TableHead className='text-right text-xs'>Số Report</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mostReportedPostsData.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className='text-xs'>{post.id}</TableCell>
                      <TableCell className='text-xs'>{post.title}</TableCell>
                      <TableCell className='text-xs'>
                        <span className='inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800'>
                          {post.status}
                        </span>
                      </TableCell>
                      <TableCell className='text-right text-xs'>{post.reports}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <Card className='mt-4'>
          <CardHeader>
            <CardTitle className='text-xs'>Biểu Đồ Nhiệt Bài Đăng Theo Thời Gian</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='h-[350px]'>
              <ResponsiveContainer width='100%' height='100%'>
                <ScatterChart
                  margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis
                    dataKey='hour'
                    type='category'
                    name='Giờ'
                    allowDuplicatedCategory={false}
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    dataKey='day'
                    type='category'
                    name='Ngày'
                    allowDuplicatedCategory={false}
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <ZAxis dataKey='value' type='number' range={[50, 500]} name='Số lượng bài đăng' />
                  <Tooltip
                    cursor={{ strokeDasharray: '3 3' }}
                    formatter={(value, name) => {
                      if (name === 'Số lượng bài đăng') return [value, name];
                      return [value, name];
                    }}
                    contentStyle={{ fontSize: '10px' }}
                  />
                  <Scatter
                    name='Bài đăng'
                    data={postHeatmapData}
                    fill='#ef4444'
                    shape={(props: any) => {
                      const { cx, cy, r, fill, value } = props;
                      const opacity = value / 50; // Normalize opacity based on value
                      return (
                        <circle
                          cx={cx}
                          cy={cy}
                          r={r}
                          fill={fill}
                          fillOpacity={opacity > 1 ? 1 : opacity}
                          stroke='none'
                        />
                      );
                    }}
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
