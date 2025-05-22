import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { ProcessingStatus } from '../reports-list';
import { useState } from 'react';
import { useUpdateReport } from '../../hooks/use-update-reports';

interface ResolveReportModalProps {
  report: any;
}

export function ResolveReportModal({ report }: ResolveReportModalProps) {
  const [reason, setReason] = useState('');
  const { mutate: updateReport } = useUpdateReport();

  const handleResolve = () => {
    updateReport(
      {
        reportId: report.id,
        data: {
          status: ProcessingStatus.Resolved,
          reason,
        },
      },
      {
        onSuccess: () => {
          
        },
        onError: (error) => {
          console.error('API resolveReport lỗi:', error);
        },
      }
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <CheckCircle2 className="mr-2 h-4 w-4" />
          Giải quyết báo cáo
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[35%]">
        <DialogHeader>
          <DialogTitle>Giải quyết báo cáo</DialogTitle>
          <DialogDescription>
            Đánh dấu báo cáo này là đã giải quyết và gửi lý do đến người báo cáo.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Textarea
            placeholder="Lý do gửi đến người báo cáo (ví dụ: Bài đăng đã bị xóa do vi phạm quy định)..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Hủy</Button>
          </DialogClose>
          <Button
            variant="outline"
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={handleResolve}
            disabled={!reason}
          >
            Đánh dấu đã giải quyết
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}