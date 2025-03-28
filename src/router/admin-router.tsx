import { Route, Routes } from 'react-router-dom';
import { AdminLayout } from "@/components/layout";
import DashBroad from "@/screen/admin/dasbroad";
import Post from '@/screen/admin/post';
import UserManagement from '@/screen/admin/user';
import ReportManagement from '@/screen/admin/reports';
import NewsManagement from '@/screen/admin/news';



export default function AdminRouter() {
  return (
    <Routes>
      <Route path='' element={<AdminLayout />}>
        <Route path="/dashboard" element={<DashBroad />} />
        <Route path="/user" element={<UserManagement />} />
        <Route path="/post" element={<Post />} />
        <Route path="/reports" element={<ReportManagement />} />
        <Route path="/news" element={<NewsManagement />} />
      </Route>
    </Routes>
  );
}
