import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FaDollarSign, FaUserPlus, FaShoppingCart, FaFileAlt } from 'react-icons/fa';
import { useGetMonthlyStats } from '../hooks/use-get-monthly-stats';

const ListCards: React.FC = () => {
  const { data, isLoading, error } = useGetMonthlyStats();

  const SkeletonCard = () => (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, index) => (
        <Card
          key={index}
          className="rounded-lg border border-gray-200 shadow-sm dark:border-gray-700 dark:bg-gray-800 animate-pulse"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
          </CardContent>
        </Card>
      ))}
    </div>
  );

  if (isLoading) return <SkeletonCard />;
  if (error) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto">
        <AlertTitle>Lỗi</AlertTitle>
        <AlertDescription>Không thể tải dữ liệu thống kê. Vui lòng thử lại sau.</AlertDescription>
      </Alert>
    );
  }

  const cardData = [
    {
      id: 1,
      title: 'Doanh thu',
      specific: `${data.totalRevenue.toLocaleString()} vnđ`,
      Icon: FaDollarSign,
    },
    {
      id: 2,
      title: 'Người dùng mới',
      specific: data.newUsers.toLocaleString(),
      Icon: FaUserPlus,
    },
    {
      id: 3,
      title: 'Sản phẩm bán ra',
      specific: data.soldPricings.toLocaleString(),
      Icon: FaShoppingCart,
    },
    {
      id: 4,
      title: 'Bài đăng mới',
      specific: data.newPosts.toLocaleString(),
      Icon: FaFileAlt,
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cardData.map((item) => {
        const IconComponent = item.Icon;
        return (
          <Card
            key={item.id}
            className="rounded-lg border border-gray-200 shadow-sm dark:border-gray-700 dark:bg-gray-800"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-xs font-semibold text-gray-800 dark:text-gray-100">
                {item.title}
              </CardTitle>
              <IconComponent className="text-lg text-gray-500 dark:text-gray-300" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-gray-800 dark:text-gray-100">
                {item.specific}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ListCards;