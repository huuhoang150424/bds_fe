import { BrowserRouter as Routers, Route, Routes } from 'react-router-dom';
import AdminRouter from "./admin-router";
import MainRouter from "./main-router";
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/authReducer';

export default function Router ()
{
  const user = useSelector( selectUser );

  return (
    <Routers>
      <Routes>
        {/* Client routing */ }
        <Route path="/*" element={ <MainRouter /> } />
        {/* Admin routing */ }
        {
          user?.roles === 'Admin' ? ( <Route path="/admin/*" element={ <AdminRouter /> } /> ) : ( null )
        }
      </Routes>
    </Routers>
  );
}
