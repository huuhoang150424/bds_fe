import useScrollToTopOnMount from '@/hooks/use-scroll-top';
import { UserTable } from "./components/user-table";

export default function UserManagement() {
  useScrollToTopOnMount();

  return (
    <div className="">
      <h1 className="text-[16px] font-[500] text-gray-700 ">Quản lý người dùng</h1>
      <UserTable />
  </div>
  );
}
