import { Route, Routes } from "react-router-dom";
import { AdminLayout } from '@/components/layout';
import DashBroad from '@/screen/admin/dasbroad';

export default function AdminRouter() {
  return (
    <AdminLayout>
      <Routes>
        <Route path='/dashbroad' element={<DashBroad/>} />
      </Routes>
    </AdminLayout>
  )
}
