import useScrollToTopOnMount from '@/hooks/use-scroll-top';
import { UserTable } from "./components/user-table";

export default function UserManagement() {
  useScrollToTopOnMount();

  return (
    <div className="">
    <UserTable />
  </div>
  );
}
