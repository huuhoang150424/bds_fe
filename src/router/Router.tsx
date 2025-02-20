
import DashBroad from '@/screen/admin/dasbroad';
import { BrowserRouter as Routers, Route, Routes } from 'react-router-dom';

export default function Router() {

  return (
    <Routers>
      <Routes>
        <Route path='/' element={<DashBroad/>}/>
      </Routes>
    </Routers>
  );
}
