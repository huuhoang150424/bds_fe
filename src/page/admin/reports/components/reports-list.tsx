import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Pagination } from '@/components/user/pagination';
import { Loading } from '@/components/common';

export enum ProcessingStatus {
  Pending = 'pending',
  Resolved = 'resolved',
  Rejected = 'rejected',
  Reviewing = 'reviewing',
}

export enum SeverityStatus {
  Important = 'quan trọng',
  Urgent = 'khẩn cấp',
  Feedback = 'góp ý',
  Suggestion = 'đề xuất',
  Bug = 'lỗi hệ thống',
  Inappropriate = 'nội dung không phù hợp',
  AIFlagged = 'AI phát hiện',
}


interface ReportsListProps {
  reports: any;
  selectedReportId: string | null;
  onSelectReport: (id: string) => void;
  selectedReports: string[];
  onSelectMultiple: (ids: string[]) => void;
  handleChangePage:any;
  isLoading:boolean
}

export function ReportsList({
  reports,
  selectedReportId,
  onSelectReport,
  selectedReports,
  onSelectMultiple,
  handleChangePage,
  isLoading
}: ReportsListProps) {

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case SeverityStatus.Urgent:
        return (
          <Badge variant='outline' className='bg-red-100 text-red-800'>
            🔴 Khẩn cấp
          </Badge>
        );
      case SeverityStatus.Important:
        return (
          <Badge variant='outline' className='bg-yellow-100 text-yellow-800'>
            🟡 Quan trọng
          </Badge>
        );
      case SeverityStatus.Feedback:
        return (
          <Badge variant='outline' className='bg-blue-100 text-blue-800'>
            🔵 Góp ý
          </Badge>
        );
      case SeverityStatus.Suggestion:
        return (
          <Badge variant='outline' className='bg-green-100 text-green-800'>
            💡 Đề xuất
          </Badge>
        );
      case SeverityStatus.Bug:
        return (
          <Badge variant='outline' className='bg-pink-100 text-pink-800'>
            🐞 Lỗi hệ thống
          </Badge>
        );
      case SeverityStatus.Inappropriate:
        return (
          <Badge variant='outline' className='bg-orange-100 text-orange-800'>
            🚫 Nội dung không phù hợp
          </Badge>
        );
      case SeverityStatus.AIFlagged:
        return (
          <Badge variant='outline' className='bg-purple-100 text-purple-800'>
            🤖 AI phát hiện
          </Badge>
        );
      default:
        return null;
    }
  };
  

  const getStatusBadge = (status: string) => {
    switch (status) {
      case ProcessingStatus.Pending:
        return (
          <Badge variant='outline' className='bg-gray-100 text-gray-800'>
            ⏳ Chờ xử lý
          </Badge>
        );
      case ProcessingStatus.Reviewing:
        return (
          <Badge variant='outline' className='bg-yellow-100 text-yellow-800'>
            🔍 Đang xem xét
          </Badge>
        );
      case ProcessingStatus.Resolved:
        return (
          <Badge variant='outline' className='bg-green-100 text-green-800'>
            ✅ Đã giải quyết
          </Badge>
        );
      case ProcessingStatus.Rejected:
        return (
          <Badge variant='outline' className='bg-red-100 text-red-800'>
            ❌ Đã từ chối
          </Badge>
        );
      default:
        return null;
    }
  };
  

  const handleCheckboxChange = (reportId: string, checked: boolean) => {
    if (checked) {
      onSelectMultiple([...selectedReports, reportId]);
    } else {
      onSelectMultiple(selectedReports.filter((id) => id !== reportId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectMultiple(reports?.data?.data.map((report:any) => report.id));
    } else {
      onSelectMultiple([]);
    }
  };

  return (
    <div className='divide-y relative'>
      {
        isLoading?(<Loading className='my-[250px] '/>):(      <div className="">
          {reports?.data?.data.length > 0 ? (
            <>
              <div className='p-2 bg-slate-50 flex items-center sticky top-0 z-10 border-b'>
                <Checkbox
                  checked={reports?.data?.data.length > 0 && selectedReports.length === reports?.data?.data.length}
                  onCheckedChange={handleSelectAll}
                  className='ml-2 mr-4'
                />
                <span className='text-sm font-medium'>Chọn tất cả</span>
              </div>
              <div className='max-h-[600px] overflow-y-auto'>
                {reports?.data?.data.map((report:any) => (
                  <div
                    key={report.id}
                    className={`p-4 hover:bg-slate-50 ${selectedReportId === report.id ? 'bg-slate-100' : ''}`}
                  >
                    <div className='flex items-start'>
                      <Checkbox
                        checked={selectedReports.includes(report.id)}
                        onCheckedChange={(checked) => handleCheckboxChange(report.id, !!checked)}
                        className='mt-1 mr-4'
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className='flex-1 cursor-pointer' onClick={() => onSelectReport(report.id)}>
                        <div className='flex justify-between items-start mb-2'>
                          <div className='font-medium truncate'>{report.post ? report.post.title : 'Góp ý chung'}</div>
                          <div className='text-xs text-muted-foreground'>
                            {formatDistanceToNow(report.createdAt, { addSuffix: true, locale: vi })}
                          </div>
                        </div>
                        <div className='text-sm text-muted-foreground line-clamp-2 mb-2'>{report.content}</div>
                        <div className='flex flex-wrap gap-2 mt-2'>
                          {getSeverityBadge(report.severity)}
                          {getStatusBadge(report.status)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className='p-4 text-center text-muted-foreground'>Không tìm thấy báo cáo nào</div>
          )}
        </div>)
      }

      <div className='flex items-center justify-between px-4 py-3 border-t w-full'>
        <div className='text-xs text-gray-500'>Hiển thị {reports?.data?.totalItems} báo cáo của hệ thống</div>
        <Pagination currentPage={reports?.data?.currentPage} totalPages={reports?.data?.totalPages} onPageChange={handleChangePage} className='mt-0' />
      </div>
    </div>
  );
}
