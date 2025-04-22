import { Card, CardContent } from '@/components/ui/card';
import { FileTextIcon, ShoppingCartIcon, StarIcon, UsersIcon } from 'lucide-react';

interface StatsOverviewProps {
  user: any;
}

export default function StatsOverview({ user }: StatsOverviewProps) {
  const stats = [
    {
      title: 'Bài đăng',
      value: user.stats.posts,
      icon: <FileTextIcon className='h-4 w-4' />,
      color: 'bg-blue-100 text-blue-600',
      darkColor: 'dark:bg-blue-900/30 dark:text-blue-400',
    },
    {
      title: 'Giao dịch',
      value: user.stats.transactions,
      icon: <ShoppingCartIcon className='h-4 w-4' />,
      color: 'bg-green-100 text-green-600',
      darkColor: 'dark:bg-green-900/30 dark:text-green-400',
    },
    {
      title: 'Đánh giá',
      value: user.stats.ratings,
      icon: <StarIcon className='h-4 w-4' />,
      color: 'bg-amber-100 text-amber-600',
      darkColor: 'dark:bg-amber-900/30 dark:text-amber-400',
      suffix: '/5',
    },
    {
      title: 'Người theo dõi',
      value: user.stats.followers,
      icon: <UsersIcon className='h-4 w-4' />,
      color: 'bg-purple-100 text-purple-600',
      darkColor: 'dark:bg-purple-900/30 dark:text-purple-400',
    },
  ];

  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
      {stats.map((stat, index) => (
        <Card key={stat.title} className='overflow-hidden shadow-sm rounded-[8px] border border-gray-200 '>
          <CardContent className={`p-4 ${stat.color} ${stat.darkColor}`}>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-xs font-medium text-gray-600 dark:text-gray-300'>{stat.title}</p>
                <h3 className='text-base font-bold mt-1'>
                  {stat.value}
                  {stat.suffix || ''}
                </h3>
              </div>
              <div className='p-1.5 rounded-full bg-white/80 dark:bg-gray-800/80'>{stat.icon}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
