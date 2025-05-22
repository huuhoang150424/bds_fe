import useScrollToTopOnMount from '@/hooks/use-scroll-top';
import { ReportsAdminDashboard } from '../components/reports-dashboard';

export default function ReportManagement() {
  useScrollToTopOnMount();

  return (
    <div className=''>
      <div>
        <h1 className='text-[18px] font-[700] tracking-tight text-gray-700 '>Quản Lý Báo Cáo</h1>
        <p className='text-muted-foreground text-[15px]'>Xem xét và xử lý báo cáo từ người dùng</p>
      </div>

      <ReportsAdminDashboard />
    </div>
  );
}
