import { useState } from 'react';
import { Calendar, Clock, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { AppointmentTypesPieChart } from './appointment-types-pie-chart';
import { MonthlyAppointmentsChart } from './monthly-appointments-chart';
import { AppointmentTrendChart } from './appointment-trend-chart';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGetAppointmentSummary } from '../hooks/use-appointment-summary';
import { PostTypeConversionChart } from './weekday-distribution-chart';

export function AppointmentDashboard() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState<number>(currentYear);
  const [period, setPeriod] = useState<string>('year');
  const { data: summaryData, isLoading, error } = useGetAppointmentSummary(year);

  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);
  const periods = [
    { value: 'year', label: 'Cả năm' },
    { value: 'quarter', label: 'Quý gần nhất' },
    { value: 'month', label: 'Tháng gần nhất' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-center gap-6">
        <div className="flex items-center space-x-3">
          <label className="text-[14px] font-medium text-gray-700 dark:text-gray-300">
            Chọn năm thống kê:
          </label>
          <Select
            value={year.toString()}
            onValueChange={(value) => setYear(parseInt(value))}
          >
            <SelectTrigger
              className="w-[180px] text-[14px] rounded-md border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 focus:ring-2 focus:ring-red-500 focus:bg-red-50 dark:focus:bg-red-900/20"
            >
              <SelectValue placeholder="Chọn năm" />
            </SelectTrigger>
            <SelectContent className="rounded-md bg-white dark:bg-gray-700">
              {years.map((y) => (
                <SelectItem
                  key={y}
                  value={y.toString()}
                  className="text-[14px] hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-3">
          <label className="text-[14px] font-medium text-gray-700 dark:text-gray-300">
            Chọn khoảng thời gian:
          </label>
          <Select
            value={period}
            onValueChange={(value) => setPeriod(value)}
          >
            <SelectTrigger
              className="w-[180px] text-[14px] rounded-md border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 focus:ring-2 focus:ring-red-500 focus:bg-red-50 dark:focus:bg-red-900/20"
            >
              <SelectValue placeholder="Chọn khoảng" />
            </SelectTrigger>
            <SelectContent className="rounded-md bg-white dark:bg-gray-700">
              {periods.map((p) => (
                <SelectItem
                  key={p.value}
                  value={p.value}
                  className="text-[14px] hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm rounded-lg">
          <CardContent className="p-5">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/30">
                <Calendar className="h-5 w-5 text-red-500 dark:text-red-400" />
              </div>
              <div>
                <p className="text-[14px] font-medium text-gray-500 dark:text-gray-400">Tổng lịch hẹn</p>
                {isLoading ? (
                  <Skeleton className="h-7 w-20 mt-1" />
                ) : error ? (
                  <p className="text-[14px] text-red-500">Lỗi tải dữ liệu</p>
                ) : (
                  <h3 className="text-[18px] font-bold">
                    {summaryData?.totalAppointments.toLocaleString() || '0'}
                  </h3>
                )}
                <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">Số lịch hẹn trong năm</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm rounded-lg">
          <CardContent className="p-5">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/30">
                <TrendingUp className="h-5 w-5 text-red-500 dark:text-red-400" />
              </div>
              <div>
                <p className="text-[14px] font-medium text-gray-500 dark:text-gray-400">Tăng trưởng</p>
                {isLoading ? (
                  <Skeleton className="h-7 w-20 mt-1" />
                ) : error ? (
                  <p className="text-[14px] text-red-500">Lỗi tải dữ liệu</p>
                ) : (
                  <h3 className="text-[18px] font-bold text-red-500 dark:text-red-400">
                    {summaryData?.growthRate || '0.0%'}
                  </h3>
                )}
                <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">So với năm trước</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm rounded-lg">
          <CardContent className="p-5">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/30">
                <Clock className="h-5 w-5 text-red-500 dark:text-red-400" />
              </div>
              <div>
                <p className="text-[14px] font-medium text-gray-500 dark:text-gray-400">Trung bình/ngày</p>
                {isLoading ? (
                  <Skeleton className="h-7 w-20 mt-1" />
                ) : error ? (
                  <p className="text-[14px] text-red-500">Lỗi tải dữ liệu</p>
                ) : (
                  <h3 className="text-[18px] font-bold">
                    {summaryData?.averageDaily || '0.0'}
                  </h3>
                )}
                <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">Lịch hẹn trung bình mỗi ngày</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm rounded-lg">
          <CardContent className="p-5">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/30">
                <Users className="h-5 w-5 text-red-500 dark:text-red-400" />
              </div>
              <div>
                <p className="text-[14px] font-medium text-gray-500 dark:text-gray-400">Tỷ lệ hoàn thành</p>
                {isLoading ? (
                  <Skeleton className="h-7 w-20 mt-1" />
                ) : error ? (
                  <p className="text-[14px] text-red-500">Lỗi tải dữ liệu</p>
                ) : (
                  <h3 className="text-[18px] font-bold">
                    {summaryData?.completionRate || '0.0%'}
                  </h3>
                )}
                <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">Phần trăm lịch hẹn hoàn tất</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MonthlyAppointmentsChart year={year} />
        <AppointmentTypesPieChart year={year} />
        <AppointmentTrendChart year={year} period={period} />
        <PostTypeConversionChart year={year} />
      </div>
    </div>
  );
}