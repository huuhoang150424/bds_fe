import { AppSidebar } from '@/components/agent/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import Header from '@/components/agent/header';
import { Outlet } from 'react-router-dom';

const AgentLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main>
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
export default AgentLayout;
