import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { X, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { getSeverityBadge, getStatusBadge, ProcessingStatus, SeverityStatus } from './reports-list';
import { DeletePostModal } from './modal/delete-post-modal';
import { RequestEditModal } from './modal/request-edit-modal';
import { LockPostModal } from './modal/lock-post-modal';
import { WarnUserModal } from './modal/warn-user-modal';
import { SuspendUserModal } from './modal/suspend-user-modal';
import { ResolveReportModal } from './modal/resolve-report-modal';
import { DismissReportModal } from './modal/dismiss-report-modal';
import { SendNotificationModal } from './modal/send-notification-modal';
import { useSendNotification } from '@/page/admin/notification/hooks/use-send-notification';
import { toast } from '@/hooks/use-toast';
import { useUpdateReport } from '../hooks/use-update-reports';

export type Report = {
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
    description: string;
    userId: string;
    slug: string;
  } | null;
  severity: string;
  adminNotes: string;
  resolvedAt?: Date;
  resolvedBy?: string;
  resolution?: string;
};

interface ReportDetailProps {
  report: Report;
  onClose: () => void;
}

export function ReportDetail({ report, onClose }: ReportDetailProps) {
  const navigate = useNavigate();
  const updateReportMutation = useUpdateReport();
  const sendNotificationMutation = useSendNotification();
  const [adminNotes, setAdminNotes] = useState(report.adminNotes || '');
  const [selectedSeverity, setSelectedSeverity] = useState(report.severity || '');
  const [activeTab, setActiveTab] = useState('details');
  const [isNotesSaved, setIsNotesSaved] = useState(false);
  const isResolved = report.status === ProcessingStatus.Resolved || report.status === ProcessingStatus.Rejected;
  const formattedReason = report.reason
    .split('_')
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(' ');

    console.log(report)
  const handleSaveNotes = async () => {
    if (!adminNotes.trim()) {
      toast({ title: 'Lỗi', description: 'Vui lòng nhập ghi chú trước khi lưu.', variant: 'destructive' });
      return;
    }

    try {
      await updateReportMutation.mutateAsync({
        reportId: report.id,
        data: {
          status: ProcessingStatus.Reviewing,
          reason: adminNotes,
        },
      });
      const notificationData = {
        message: `Báo cáo #${report.id} của bạn đang được xem xét.`,
        userId: report.userId,
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        priority: 2,
      };
      await sendNotificationMutation.mutateAsync(notificationData);
      setAdminNotes('');
      setIsNotesSaved(true);
      console.log(`Lưu ghi chú và cập nhật trạng thái cho báo cáo ${report.id}`);
    } catch (error) {
      console.error('Failed to save notes and update report status:', error);
    }
  };

  const handleChangeSeverity = (newSeverity: string) => {
    setSelectedSeverity(newSeverity);
    console.log(`Thay đổi mức độ nghiêm trọng của báo cáo ${report.id} thành ${newSeverity}`);
  };

  useEffect(() => {
    setSelectedSeverity(report.severity || '');
    setAdminNotes(report.adminNotes || '');
    setIsNotesSaved(false); // Reset success state when report changes
  }, [report]);

  return (
    <Card className="border border-gray-200 rounded-[8px]">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="text-xl">Báo cáo #{report.id}</CardTitle>
          <CardDescription>
            Đã gửi {formatDistanceToNow(report.createdAt, { addSuffix: true, locale: vi })} bởi {report.user.fullname}
          </CardDescription>
          <div className="flex flex-wrap gap-2 mt-2">
            {getSeverityBadge(report.severity)}
            {getStatusBadge(report.status)}
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 border border-gray-200 bg-transparent rounded-[8px]">
            <TabsTrigger
              className="data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:shadow-sm"
              value="details"
            >
              Chi tiết
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:shadow-sm"
              value="content"
            >
              Nội dung báo cáo
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:shadow-sm"
              value="actions"
            >
              Thực hiện hành động
            </TabsTrigger>
          </TabsList>

          {/* Details Tab */}
          <TabsContent value="details" className="space-y-4">
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <h3 className="font-[500] text-gray-700">Lý do báo cáo</h3>
                <p>{formattedReason}</p>
              </div>

              <div className="grid gap-2">
                <h3 className="font-[500] text-gray-700">Mô tả</h3>
                <p className="text-[14px]">{report.content}</p>
              </div>

              <div className="grid gap-2">
                <h3 className="font-[500] text-gray-700">Thông tin người báo cáo</h3>
                <div className="text-[14px]">
                  <p>
                    <span className="font-medium">Tên:</span> {report.user.fullname}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span> {report.user.email}
                  </p>
                </div>
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-[500] text-gray-700">Phân loại mức độ nghiêm trọng</h3>
                  <Select value={selectedSeverity} onValueChange={handleChangeSeverity}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Chọn mức độ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={SeverityStatus.Urgent}>
                        <div className="flex items-center">
                          <span className="mr-2">🔴</span> Khẩn cấp
                        </div>
                      </SelectItem>
                      <SelectItem value={SeverityStatus.Important}>
                        <div className="flex items-center">
                          <span className="mr-2">🟡</span> Quan trọng
                        </div>
                      </SelectItem>
                      <SelectItem value={SeverityStatus.Feedback}>
                        <div className="flex items-center">
                          <span className="mr-2">🔵</span> Góp ý
                        </div>
                      </SelectItem>
                      <SelectItem value={SeverityStatus.Suggestion}>
                        <div className="flex items-center">
                          <span className="mr-2">🟢</span> Đề xuất
                        </div>
                      </SelectItem>
                      <SelectItem value={SeverityStatus.Bug}>
                        <div className="flex items-center">
                          <span className="mr-2">🪲</span> Lỗi hệ thống
                        </div>
                      </SelectItem>
                      <SelectItem value={SeverityStatus.Inappropriate}>
                        <div className="flex items-center">
                          <span className="mr-2">⚠️</span> Nội dung không phù hợp
                        </div>
                      </SelectItem>
                      {/* <SelectItem value={SeverityStatus.AIFlagged}>
                        <div className="flex items-center">
                          <span className="mr-2">🤖</span> AI phát hiện
                        </div>
                      </SelectItem> */}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {
                report.status === 'pending' && ( <div className="grid gap-2">
                  <h3 className="font-[500] text-gray-700">Ghi chú xem xét của admin</h3>
                  { isNotesSaved ? (
                    <div className="rounded-md bg-green-50 p-4 text-[14px] text-green-800 flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      <p>Ghi chú đã được lưu và báo cáo đang được xem xét.</p>
                    </div>
                  ) : (
                    <>
                      <Textarea
                        placeholder="Thêm ghi chú về báo cáo này..."
                        value={ adminNotes }
                        onChange={ ( e ) => setAdminNotes( e.target.value ) }
                        className="min-h-[100px]"
                      />
                      <Button
                        variant="outline"
                        onClick={ handleSaveNotes }
                        className="w-full bg-red-500 hover:bg-red-600 text-white"
                        disabled={ updateReportMutation.isPending || sendNotificationMutation.isPending }
                      >
                        { updateReportMutation.isPending || sendNotificationMutation.isPending ? 'Đang xử lý...' : 'Lưu ghi chú' }
                      </Button>
                    </>
                  ) }
                </div> )
              }

            </div>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-4 mt-5">
            {report.post ? (
              <div className="space-y-4">
                <div className="grid gap-2">
                  <h3 className="font-[500] text-gray-700">Thông tin bài viết</h3>
                  <div className="text-[14px]">
                    <p>
                      <span className="font-medium">Tiêu đề:</span> {report.post.title}
                    </p>
                  </div>
                </div>

                <div className="grid gap-2">
                  <h3 className="font-[500] text-gray-700">Nội dung bài viết</h3>
                  <div className="rounded-md border p-4 bg-slate-50">
                    <p className="text-[14px] whitespace-pre-wrap">{report.post.description}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2">Báo cáo này không liên quan đến bài viết cụ thể nào.</p>
              </div>
            )}
          </TabsContent>

          {/* Actions Tab */}
          <TabsContent value="actions" className="space-y-4 mt-5">
            <div className="space-y-4">
              {isResolved ? (
                <div>
                  <h1>Báo cáo đã được giải quyết</h1>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="font-[500] text-gray-700">Hành động với bài viết</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {report.post && (
                      <>
                        <DeletePostModal report={report} />
                        <RequestEditModal report={report} />
                        <LockPostModal report={report} />
                      </>
                    )}
                  </div>

                  <h3 className="font-[500] text-gray-700 mt-6">Hành động với người dùng</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <WarnUserModal report={report} />
                    <SuspendUserModal report={report} />
                  </div>

                  <h3 className="font-[500] text-gray-700 mt-6 mb-5">Giải quyết báo cáo</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <ResolveReportModal report={report} />
                    <DismissReportModal report={report} />
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClose}>
          Đóng
        </Button>

        {report.status === ProcessingStatus.Pending || report.status === ProcessingStatus.Reviewing ? (
          <div className="flex items-center gap-[10px]">
            <Button variant="outline" onClick={() => navigate(`/post/${report?.post?.slug}`)}>
              Xem chi tiết bài viết
            </Button>
          </div>
        ) : null}
      </CardFooter>
    </Card>
  );
}