import { Route, Routes } from 'react-router-dom';
import { AdminLayout } from "@/components/layout";
import DashBroad from "@/page/admin/dasbroad";
import Post from '@/page/admin/post';
import UserManagement from '@/page/admin/user';
import ReportManagement from '@/page/admin/reports';
import NewsManagement from '@/page/admin/news';



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
