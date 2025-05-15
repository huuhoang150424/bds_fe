import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { XCircle } from 'lucide-react';
import { ProcessingStatus } from '../reports-list';
import { useUpdateReport } from '../../hooks/use-update-reports';
import { useState } from 'react';

interface DismissReportModalProps {
  report: any;
}

export function DismissReportModal({ report }: DismissReportModalProps) {
  const [reason, setReason] = useState('');
  const { mutate: updateReport } = useUpdateReport();

  const handleDismiss = () => {
    updateReport(
      {
        reportId: report.id,
        data: {
          status: ProcessingStatus.Rejected,
          reason,
        },
      },
      {
        onSuccess: () => {

        },
      }
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <XCircle className="mr-2 h-4 w-4" />
          Bỏ qua báo cáo
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[35%]">
        <DialogHeader>
          <DialogTitle>Bỏ qua báo cáo</DialogTitle>
          <DialogDescription>
            Bỏ qua báo cáo này và gửi lý do đến người báo cáo.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Textarea
            placeholder="Lý do gửi đến người báo cáo (ví dụ: Báo cáo không đủ bằng chứng)..."
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
            onClick={handleDismiss}
            disabled={!reason}
          >
            Bỏ qua báo cáo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
