import { BrowserRouter as Routers, Route, Routes } from 'react-router-dom';
import AdminRouter from "./admin-router";
import MainRouter from "./main-router";

export default function Router() {
  return (
    <Routers>
      <Routes>
        {/* Admin routing */}
        <Route path="/admin/*" element={<AdminRouter />} />
        {/* Client routing */}
        <Route path="/*" element={<MainRouter />} />
      </Routes>
    </Routers>
  );
}
