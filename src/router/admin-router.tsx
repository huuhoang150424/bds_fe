import { Route, Routes } from 'react-router-dom';
import { AdminLayout } from "@/components/layout";
import DashBroad from "@/screen/admin/dasbroad";
import User from '@/screen/admin/user';
import Post from '@/screen/admin/post';



export default function AdminRouter() {
  return (
    <Routes>
      <Route path='' element={<AdminLayout />}>
        <Route path="/dashboard" element={<DashBroad />} />
        <Route path="/user" element={<User />} />
        <Route path="/post" element={<Post />} />
      </Route>
    </Routes>
  );
}
