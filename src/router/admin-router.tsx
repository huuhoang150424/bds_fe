import { Route, Routes } from 'react-router-dom';
import { AdminLayout } from "@/components/layout";
import DashBroad from "@/page/admin/dasbroad";
import Post from '@/page/admin/post';
import UserManagement from '@/page/admin/user';
import ReportManagement from '@/page/admin/reports';
import NewsManagement from '@/page/admin/news/page/list-news';
import CreateNews from '@/page/admin/news/page/creat-news';
import ListPricing from '@/page/admin/pricing/page/list-pricing';
import ListCategory from '@/page/admin/category/page/list-category';
import ListBanner from '@/page/admin/banner/page/list-banner';
import ListNotification from '@/page/admin/notification/page/list-notification';
import CreateBanner from '@/page/admin/banner/page/create-banner';



export default function AdminRouter() {
  return (
    <Routes>
      <Route path='' element={<AdminLayout />}>
        <Route path="/dashboard" element={<DashBroad />} />
        <Route path="/user" element={<UserManagement />} />
        <Route path="/post" element={<Post />} />
        <Route path="/reports" element={<ReportManagement />} />
        <Route path="/news" element={<NewsManagement />} />
        <Route path="/create-news" element={<CreateNews />} />
        <Route path="/pricing" element={<ListPricing />} />
        <Route path="/categories" element={<ListCategory />} />
        <Route path="/notification" element={<ListNotification />} />
        <Route path="/banner" element={<ListBanner />} /> 
        <Route path="/create-banner" element={<CreateBanner />} /> 
      </Route>
    </Routes>
  );
}
