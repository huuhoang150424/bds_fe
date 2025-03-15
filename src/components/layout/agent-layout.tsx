import { AppSidebar } from "@/components/agent/app-sidebar"
import
  {
    SidebarInset,
    SidebarProvider,
  } from "@/components/ui/sidebar"
import Header from "@/components/agent/header";
interface Props
{
  children?: React.ReactNode;
}


const AgentLayout: React.FC<Props> = ( { children } ) =>
{
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header/>
        <main >
          { children }
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
export default AgentLayout;