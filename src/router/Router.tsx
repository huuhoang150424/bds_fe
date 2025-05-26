import { BrowserRouter as Routers, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import AdminRouter from "./admin-router";
import MainRouter from "./main-router";
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/authReducer';
import AgentRouter from './agent-router';
import { TwoFactorProvider, useTwoFactor } from '@/context/two-factor-context';
import { useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
function RouterGuard() {
  const { isTwoFactorDialogOpen } = useTwoFactor();
  const location = useLocation();

  useEffect(() => {
    if (isTwoFactorDialogOpen) {
      toast({
        variant: 'destructive',
        title: 'Vui lòng hoàn tất xác thực hai bước',
      });
    }
  }, [location, isTwoFactorDialogOpen]);

  return null;
}
export default function Router (){
  const user = useSelector( selectUser );

  return (
    <Routers>
      <TwoFactorProvider>
        <RouterGuard />
        <Routes>
          {/* Client routing */ }
          <Route path="/*" element={ <MainRouter /> } />
          {/* Admin routing */ }
          {
            user?.roles === 'Admin' ? ( <Route path="/admin/*" element={ <AdminRouter /> } /> ) : ( null )
          }
          {/* Agent routing */ }
          <Route  path="/agent/*" element={ <AgentRouter /> } />
        </Routes>
      </TwoFactorProvider>
    </Routers>
  );
}
