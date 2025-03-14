import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from "@/components/ui/scroll-area";

const users = [
  { id: 1, avatar: "https://i.pravatar.cc/40?img=1", name: "Nguyễn Văn A", email: "vana@example.com", order_count: 25 },
  { id: 2, avatar: "https://i.pravatar.cc/40?img=2", name: "Trần Thị B", email: "thib@example.com", order_count: 18 },
  { id: 3, avatar: "https://i.pravatar.cc/40?img=3", name: "Lê Minh C", email: "minhc@example.com", order_count: 15 },
  { id: 4, avatar: "https://i.pravatar.cc/40?img=4", name: "Phạm Văn D", email: "vand@example.com", order_count: 30 },
  { id: 5, avatar: "https://i.pravatar.cc/40?img=5", name: "Hoàng Thị E", email: "thie@example.com", order_count: 12 },
  { id: 6, avatar: "https://i.pravatar.cc/40?img=6", name: "Ngô Văn F", email: "vanf@example.com", order_count: 22 },
  { id: 7, avatar: "https://i.pravatar.cc/40?img=7", name: "Vũ Thị G", email: "thig@example.com", order_count: 19 },
  { id: 8, avatar: "https://i.pravatar.cc/40?img=8", name: "Đặng Minh H", email: "minhh@example.com", order_count: 16 },
  { id: 9, avatar: "https://i.pravatar.cc/40?img=9", name: "Trịnh Văn I", email: "vani@example.com", order_count: 27 },
  { id: 10, avatar: "https://i.pravatar.cc/40?img=10", name: "Bùi Thị J", email: "thij@example.com", order_count: 14 }
];

const RecentSales: React.FC = () => {
  return (
    <ScrollArea className="h-[380px] mt-[-10px]">
      {users.map((user) => (
        <div key={user.id} className="flex mt-[15px] items-center px-[20px]">
          <img
            className="object-cover border border-gray-200 w-[40px] h-[40px] rounded-full"
            src={user.avatar}
            alt={user.name}
          />
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div className="ml-auto font-medium">{user.order_count} bài</div>
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
