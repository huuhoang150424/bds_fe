import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

// These should match your backend enums
enum ProcessingStatus {
  PENDING = 'CHỜ_XỬ_LÝ',
  IN_PROGRESS = 'ĐANG_XỬ_LÝ',
  RESOLVED = 'ĐÃ_GIẢI_QUYẾT',
  REJECTED = 'ĐÃ_TỪ_CHỐI',
}

// Severity levels for admin classification
enum Severity {
  EMERGENCY = 'KHẨN_CẤP',
  IMPORTANT = 'QUAN_TRỌNG',
  FEEDBACK = 'GÓP_Ý',
}

type Report = {
  id: string;
  userId: string;
  postId: string | null;
  reason: string;
  content: string;
  status: string;
  createdAt: Date;
  user: {
    id: string;
    fullname: string;
    email: string;
  };
  post: {
    id: string;
    title: string;
    content: string;
    userId: string;
  } | null;
  severity: string;
  adminNotes: string;
  resolvedAt?: Date;
  resolvedBy?: string;
  resolution?: string;
};

interface ReportsListProps {
  reports: Report[];
  selectedReportId: string | null;
  onSelectReport: (id: string) => void;
  selectedReports: string[];
  onSelectMultiple: (ids: string[]) => void;
}

export function ReportsList({
  reports,
  selectedReportId,
  onSelectReport,
  selectedReports,
  onSelectMultiple,
}: ReportsListProps) {
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case Severity.EMERGENCY:
        return (
          <Badge variant='outline' className='bg-red-100 text-red-800'>
            🔴 Khẩn cấp
          </Badge>
        );
      case Severity.IMPORTANT:
        return (
          <Badge variant='outline' className='bg-yellow-100 text-yellow-800'>
            🟡 Quan trọng
          </Badge>
        );
      case Severity.FEEDBACK:
        return (
          <Badge variant='outline' className='bg-blue-100 text-blue-800'>
            🔵 Góp ý
          </Badge>
        );
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case ProcessingStatus.PENDING:
        return (
          <Badge variant='outline' className='bg-gray-100'>
            Chờ xử lý
          </Badge>
        );
      case ProcessingStatus.IN_PROGRESS:
        return (
          <Badge variant='outline' className='bg-blue-100 text-blue-800'>
            Đang xử lý
          </Badge>
        );
      case ProcessingStatus.RESOLVED:
        return (
          <Badge variant='outline' className='bg-green-100 text-green-800'>
            Đã giải quyết
          </Badge>
        );
      case ProcessingStatus.REJECTED:
        return (
          <Badge variant='outline' className='bg-red-100 text-red-800'>
            Đã từ chối
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
      onSelectMultiple(reports.map((report) => report.id));
    } else {
      onSelectMultiple([]);
    }
  };

  return (
    <div className='divide-y relative'>
      {reports.length > 0 ? (
        <>
          <div className='p-2 bg-slate-50 flex items-center sticky top-0 z-10 border-b'>
            <Checkbox
              checked={reports.length > 0 && selectedReports.length === reports.length}
              onCheckedChange={handleSelectAll}
              className='ml-2 mr-4'
            />
            <span className='text-sm font-medium'>Chọn tất cả</span>
          </div>
          <div className='max-h-[600px] overflow-y-auto'>
            {reports.map((report) => (
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
    </div>
  );
}
