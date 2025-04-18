import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetTopUser } from '../hooks/use-get-top-use';



const RecentSales: React.FC = () => {
  const {data, isLoading, isError} = useGetTopUser();
  console.log("data top user", data);
  console.log("data top user .data", data?.data);

  
  return (
    <ScrollArea className="h-[380px] mt-[-10px]">
      {data?.map((user : any) => (
        <div key={user.id} className="flex mt-[15px] items-center px-[20px]">
          <img
            className="object-cover border border-gray-200 w-[40px] h-[40px] rounded-full"
            src={user.avatar}
            alt={user.fullname}
          />
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{user.fullname}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div className="ml-auto font-medium">{user.postCount} bài</div>
        </div>
      ))}
    </ScrollArea>
  );
};

const UserRecent: React.FC = () => {
  return (
    <Card className='col-span-1 lg:col-span-3 rounded-[6px] border border-gray-200 shadow-sm cursor-pointer dark:bg-colorDarkMode dark:border-borderDarkMode transition-all duration-500 ease-linear'>
      <CardHeader className='py-[15px]'>
        <CardTitle>Danh sách người dùng hoạt động nhiều nhất</CardTitle>
        <CardDescription>Top 10 người dùng đăng nhiều bài nhất.</CardDescription>
      </CardHeader>
      <CardContent className='pb-[25px] pt-0 px-0'>
        <RecentSales />
      </CardContent>
    </Card>
  );
};

export default UserRecent;
