import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useGetTopUser } from '../hooks/use-get-top-use';

const RecentSales: React.FC = () => {
  const { data, isLoading, isError } = useGetTopUser();

  // Skeleton Loading Component
  const SkeletonSales = () => (
    <ScrollArea className="h-[380px] mt-[-10px]">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="flex mt-[10px] items-center px-[20px] animate-pulse">
          <div className="w-[40px] h-[40px] rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="ml-4 space-y-2 flex-1">
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-3 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
          <div className="ml-auto h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      ))}
    </ScrollArea>
  );

  if (isLoading) return <SkeletonSales />;
  if (isError) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertTitle>Lỗi</AlertTitle>
        <AlertDescription>Không thể tải danh sách người dùng. Vui lòng thử lại sau.</AlertDescription>
      </Alert>
    );
  }

  return (
    <ScrollArea className="h-[380px] mt-[-10px]">
      {data?.map((user: any) => (
        <div
          key={user.id}
          className="flex items-center px-[20px] py-2"
        >
          <img
            className="object-cover border border-gray-200 w-[40px] h-[40px] rounded-full"
            src={user.avatar}
            alt={user.fullname}
          />
          <div className="ml-4 space-y-1 flex-1">
            <p className="text-xs font-semibold text-gray-800 dark:text-gray-100">{user.fullname}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
          </div>
          <div className="ml-auto font-medium text-xs text-gray-800 dark:text-gray-100">
            {user.postCount} bài
          </div>
        </div>
      ))}
    </ScrollArea>
  );
};

const UserRecent: React.FC = () => {
  return (
    <Card className="col-span-1 lg:col-span-3 rounded-lg border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <CardHeader className="py-[15px]">
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Danh sách người dùng hoạt động nhiều nhất
        </CardTitle>
        <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
          Top 10 người dùng đăng nhiều bài nhất.
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-[25px] pt-0 px-0">
        <RecentSales />
      </CardContent>
    </Card>
  );
};

export default UserRecent;