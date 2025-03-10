import { Route, Routes } from 'react-router-dom';
import { AdminLayout } from "@/components/layout";
import DashBroad from "@/screen/admin/dasbroad";



export default function AdminRouter() {
  return (
    <Routes>
      <Route path='' element={<AdminLayout />}>
        <Route path="/dashboard" element={<DashBroad />} />
      </Route>
    </Routes>
  );
}
