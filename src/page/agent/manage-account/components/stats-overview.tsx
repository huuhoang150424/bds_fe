import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Star, FileText, DollarSign, Heart } from 'lucide-react';

interface StatsOverviewProps {
  user: any;
}

export default function StatsOverview({ user }: StatsOverviewProps) {
  const { stats } = user;
  console.log(stats)
  return (
    <Card className="border border-gray-200 rounded-[8px] shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2 text-gray-800 dark:text-gray-200">
          <div className="p-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
            <Users className="h-4 w-4" />
          </div>
          Thống kê
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
            <FileText className="h-5 w-5 text-purple-500" />
            <div>
              <div className="text-xs text-gray-500">Bài đăng</div>
              <div className="font-medium text-sm">{stats?.posts}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
            <Star className="h-5 w-5 text-yellow-500" />
            <div>
              <div className="text-xs text-gray-500">Đánh giá</div>
              <div className="font-medium text-sm">{stats?.ratings.toFixed(1)}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
            <DollarSign className="h-5 w-5 text-green-500" />
            <div>
              <div className="text-xs text-gray-500">Giao dịch</div>
              <div className="font-medium text-sm">{stats?.transactions}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}