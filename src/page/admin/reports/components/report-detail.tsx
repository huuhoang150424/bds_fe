import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import {
  AlertTriangle,
  X,
  Trash2,
  Edit,
  Lock,
  AlertCircle,
  Ban,
  CheckCircle2,
  XCircle,
  Send,
  Clock,
} from 'lucide-react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

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

interface ReportDetailProps {
  report: Report;
  onClose: () => void;
  onStatusChange: (reportId: string, newStatus: string) => void;
}

export function ReportDetail({ report, onClose, onStatusChange }: ReportDetailProps) {
  const [adminNotes, setAdminNotes] = useState(report.adminNotes || '');
  const [selectedSeverity, setSelectedSeverity] = useState(report.severity);
  const [activeTab, setActiveTab] = useState('details');
  const formattedReason = report.reason
    .split('_')
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(' ');

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

  const handleSaveNotes = () => {
    console.log(`Lưu ghi chú cho báo cáo ${report.id}: ${adminNotes}`);
  };

  const handleChangeSeverity = (newSeverity: string) => {
    setSelectedSeverity(newSeverity);
    console.log(`Thay đổi mức độ nghiêm trọng của báo cáo ${report.id} thành ${newSeverity}`);
  };

  const handleTakeAction = (action: string, details: any) => {
    console.log(`Thực hiện hành động ${action} trên báo cáo ${report.id}:`, details);
  };

  return (
    <Card className='border border-gray-200 rounded-[8px] '>
      <CardHeader className='flex flex-row items-start justify-between space-y-0'>
        <div>
          <CardTitle className='text-xl'>Báo cáo #{report.id}</CardTitle>
          <CardDescription>
            Đã gửi {formatDistanceToNow(report.createdAt, { addSuffix: true, locale: vi })} bởi {report.user.fullname}
          </CardDescription>

          <div className='flex flex-wrap gap-2 mt-2'>
            {getSeverityBadge(report.severity)}
            {getStatusBadge(report.status)}
          </div>
        </div>
        <Button variant='ghost' size='icon' onClick={onClose}>
          <X className='h-4 w-4' />
        </Button>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue='details' value={activeTab} onValueChange={setActiveTab}>
          <TabsList className='grid w-full grid-cols-3 border border-gray-200 bg-transparent rounded-[8px] '>
            <TabsTrigger className='data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:shadow-sm' value='details'>Chi tiết</TabsTrigger>
            <TabsTrigger className='data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:shadow-sm' value='content'>Nội dung báo cáo</TabsTrigger>
            <TabsTrigger className='data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:shadow-sm' value='actions'>Thực hiện hành động</TabsTrigger>
          </TabsList>

          {/* Details Tab */}
          <TabsContent value='details' className='space-y-4'>
            <div className='grid gap-4 py-4'>
              <div className='grid gap-2'>
                <h3 className='font-[500] text-gray-700 '>Lý do báo cáo</h3>
                <p>{formattedReason}</p>
              </div>

              <div className='grid gap-2'>
                <h3 className='font-[500] text-gray-700 '>Mô tả</h3>
                <p className='text-[14px] '>{report.content}</p>
              </div>

              <div className='grid gap-2'>
                <h3 className='font-[500] text-gray-700 '>Thông tin người báo cáo</h3>
                <div className='text-[14px] '>
                  <p>
                    <span className='font-medium'>Tên:</span> {report.user.fullname}
                  </p>
                  <p>
                    <span className='font-medium'>Email:</span> {report.user.email}
                  </p>
                </div>
              </div>

              <div className='grid gap-2'>
                <div className='flex items-center justify-between'>
                  <h3 className='font-[500] text-gray-700 '>Phân loại mức độ nghiêm trọng</h3>
                  <Select value={selectedSeverity} onValueChange={handleChangeSeverity}>
                    <SelectTrigger className='w-[180px]'>
                      <SelectValue placeholder='Chọn mức độ' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={Severity.EMERGENCY}>
                        <div className='flex items-center'>
                          <span className='mr-2'>🔴</span> Khẩn cấp
                        </div>
                      </SelectItem>
                      <SelectItem value={Severity.IMPORTANT}>
                        <div className='flex items-center'>
                          <span className='mr-2'>🟡</span> Quan trọng
                        </div>
                      </SelectItem>
                      <SelectItem value={Severity.FEEDBACK}>
                        <div className='flex items-center'>
                          <span className='mr-2'>🔵</span> Góp ý
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className='grid gap-2'>
                <h3 className='font-[500] text-gray-700 '>Ghi chú của admin</h3>
                <Textarea
                  placeholder='Thêm ghi chú về báo cáo này...'
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  className='min-h-[100px]'
                />
                <Button variant={'outline'} onClick={handleSaveNotes} className='w-full bg-red-500 hover:bg-red-600 text-white' >
                  Lưu ghi chú
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value='content' className='space-y-4 mt-5'>
            {report.post ? (
              <div className='space-y-4'>
                <div className='grid gap-2'>
                  <h3 className='font-[500] text-gray-700 '>Thông tin bài viết</h3>
                  <div className='text-[14px] '>
                    <p>
                      <span className='font-medium'>Tiêu đề:</span> {report.post.title}
                    </p>
                  </div>
                </div>

                <div className='grid gap-2'>
                  <h3 className='font-[500] text-gray-700 '>Nội dung bài viết</h3>
                  <div className='rounded-md border p-4 bg-slate-50'>
                    <p className='text-[14px]  whitespace-pre-wrap'>{report.post.content}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className='text-center py-8'>
                <AlertCircle className='mx-auto h-8 w-8 text-muted-foreground' />
                <p className='mt-2'>Báo cáo này không liên quan đến bài viết cụ thể nào.</p>
              </div>
            )}
          </TabsContent>

          {/* Actions Tab */}
          <TabsContent value='actions' className='space-y-4 mt-5'>
            <div className='space-y-4'>
              <h3 className='font-[500] text-gray-700 '>Hành động với bài viết</h3>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                {report.post && (
                  <>
                    <Dialog >
                      <DialogTrigger asChild>
                        <Button variant='outline' className='w-full'>
                          <Trash2 className='mr-2 h-4 w-4' />
                          Xóa bài viết
                        </Button>
                      </DialogTrigger>
                      <DialogContent className='w-[35%] '>
                        <DialogHeader>
                          <DialogTitle>Xóa bài viết</DialogTitle>
                          <DialogDescription>
                            Bạn có chắc chắn muốn xóa bài viết này? Hành động này không thể hoàn tác.
                          </DialogDescription>
                        </DialogHeader>
                        <div className='space-y-4 py-4'>
                          <div className='rounded-md bg-red-50 p-4 text-[14px]  text-red-800'>
                            <div className='flex items-center'>
                              <AlertTriangle className='mr-2 h-4 w-4' />
                              <p>Điều này sẽ xóa vĩnh viễn bài viết và thông báo cho tác giả.</p>
                            </div>
                          </div>
                          <Textarea placeholder='Lý do xóa (sẽ được gửi đến tác giả)...' className='min-h-[100px]' />
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant='outline'>Hủy</Button>
                          </DialogClose>
                          <Button
                            variant='destructive'
                            onClick={() => handleTakeAction('deletePost', { postId: report.post?.id })}
                          >
                            Xóa bài viết
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant='outline' className='w-full'>
                          <Edit className='mr-2 h-4 w-4' />
                          Yêu cầu chỉnh sửa
                        </Button>
                      </DialogTrigger>
                      <DialogContent className='w-[35%] '>
                        <DialogHeader>
                          <DialogTitle>Yêu cầu chỉnh sửa bài viết</DialogTitle>
                          <DialogDescription>
                            Yêu cầu tác giả chỉnh sửa bài viết để tuân thủ quy định.
                          </DialogDescription>
                        </DialogHeader>
                        <div className='space-y-4 py-4'>
                          <Textarea
                            placeholder='Giải thích những gì cần thay đổi và lý do...'
                            className='min-h-[100px]'
                          />
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant='outline'>Hủy</Button>
                          </DialogClose>
                          <Button variant={'outline'} className='bg-red-500 hover:bg-red-600 text-white' onClick={() => handleTakeAction('requestEdit', { postId: report.post?.id })}>
                            Gửi yêu cầu
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant='outline' className='w-full '>
                          <Lock className='mr-2 h-4 w-4' />
                          Khóa bài viết
                        </Button>
                      </DialogTrigger>
                      <DialogContent className='w-[35%] '>
                        <DialogHeader>
                          <DialogTitle>Khóa bài viết</DialogTitle>
                          <DialogDescription>Tạm thời khóa bài viết này trong quá trình điều tra.</DialogDescription>
                        </DialogHeader>
                        <div className='space-y-4 py-4'>
                          <RadioGroup defaultValue='temporary'>
                            <div className='flex items-center space-x-2'>
                              <RadioGroupItem value='temporary' id='temporary' />
                              <Label htmlFor='temporary'>Khóa tạm thời (24 giờ)</Label>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <RadioGroupItem value='indefinite' id='indefinite' />
                              <Label htmlFor='indefinite'>Khóa vô thời hạn (cho đến khi giải quyết)</Label>
                            </div>
                          </RadioGroup>
                          <Textarea placeholder='Lý do khóa (sẽ hiển thị trên bài viết)...' className='min-h-[100px]' />
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant='outline'>Hủy</Button>
                          </DialogClose>
                          <Button variant={'outline'} className='bg-red-500 hover:bg-red-600 text-white' onClick={() => handleTakeAction('lockPost', { postId: report.post?.id })}>
                            Khóa bài viết
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </>
                )}
              </div>

              <h3 className='font-[500] text-gray-700  mt-6'>Hành động với người dùng</h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant='outline' className='w-full'>
                      <AlertCircle className='mr-2 h-4 w-4' />
                      Cảnh báo người dùng
                    </Button>
                  </DialogTrigger>
                  <DialogContent className='w-[35%] '>
                    <DialogHeader>
                      <DialogTitle>Gửi cảnh báo</DialogTitle>
                      <DialogDescription>Gửi cảnh báo đến người dùng về nội dung của họ.</DialogDescription>
                    </DialogHeader>
                    <div className='space-y-4 py-4'>
                      <Textarea placeholder='Nội dung cảnh báo gửi đến người dùng...' className='min-h-[100px]' />
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant='outline'>Hủy</Button>
                      </DialogClose>
                      <Button variant={'outline'} className='bg-red-500 hover:bg-red-600 text-white' onClick={() => handleTakeAction('warnUser', { userId: report.post?.userId })}>
                        Gửi cảnh báo
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant='outline' className='w-full'>
                      <Ban className='mr-2 h-4 w-4' />
                      Khóa tài khoản
                    </Button>
                  </DialogTrigger>
                  <DialogContent className='w-[35%] '>
                    <DialogHeader>
                      <DialogTitle>Khóa tài khoản người dùng</DialogTitle>
                      <DialogDescription>Tạm thời hoặc vĩnh viễn khóa tài khoản người dùng này.</DialogDescription>
                    </DialogHeader>
                    <div className='space-y-4 py-4'>
                      <RadioGroup defaultValue='temporary'>
                        <div className='flex items-center space-x-2'>
                          <RadioGroupItem value='temporary' id='temp-suspend' />
                          <Label htmlFor='temp-suspend'>Khóa tạm thời (7 ngày)</Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <RadioGroupItem value='permanent' id='perm-suspend' />
                          <Label htmlFor='perm-suspend'>Khóa vĩnh viễn</Label>
                        </div>
                      </RadioGroup>
                      <Textarea
                        placeholder='Lý do khóa tài khoản (sẽ được gửi đến người dùng)...'
                        className='min-h-[100px]'
                      />
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant='outline'>Hủy</Button>
                      </DialogClose>
                      <Button
                        variant='destructive'
                        onClick={() => handleTakeAction('suspendUser', { userId: report.post?.userId })}
                      >
                        Khóa tài khoản
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <h3 className='font-[500] text-gray-700  mt-6 mb-5'>Giải quyết báo cáo</h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-3 '>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant='outline' className='w-full'>
                      <CheckCircle2 className='mr-2 h-4 w-4' />
                      Giải quyết báo cáo
                    </Button>
                  </DialogTrigger>
                  <DialogContent className='w-[35%] '>
                    <DialogHeader>
                      <DialogTitle>Giải quyết báo cáo</DialogTitle>
                      <DialogDescription>
                        Đánh dấu báo cáo này là đã giải quyết sau khi thực hiện hành động thích hợp.
                      </DialogDescription>
                    </DialogHeader>
                    <div className='space-y-4 py-4'>
                      <Textarea placeholder='Chi tiết giải quyết (cho hồ sơ nội bộ)...' className='min-h-[100px]' />
                      <div className='flex items-center space-x-2'>
                        <input type='checkbox' id='notify-reporter' />
                        <Label htmlFor='notify-reporter'>Thông báo cho người báo cáo về việc giải quyết</Label>
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant='outline'>Hủy</Button>
                      </DialogClose>
                      <Button
                        variant={'outline'}
                        className='bg-red-500 hover:bg-red-600 text-white'
                        onClick={() => {
                          handleTakeAction('resolveReport', { reportId: report.id });
                          onStatusChange(report.id, ProcessingStatus.RESOLVED);
                        }}
                      >
                        Đánh dấu đã giải quyết
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant='outline' className='w-full'>
                      <XCircle className='mr-2 h-4 w-4' />
                      Bỏ qua báo cáo
                    </Button>
                  </DialogTrigger>
                  <DialogContent className='w-[35%] '>
                    <DialogHeader>
                      <DialogTitle>Bỏ qua báo cáo</DialogTitle>
                      <DialogDescription>
                        Bỏ qua báo cáo này nếu nó không hợp lệ hoặc không cần hành động.
                      </DialogDescription>
                    </DialogHeader>
                    <div className='space-y-4 py-4'>
                      <Textarea placeholder='Lý do bỏ qua (cho hồ sơ nội bộ)...' className='min-h-[100px]' />
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant='outline'>Hủy</Button>
                      </DialogClose>
                      <Button
                        variant={'outline'}
                        className='bg-red-500 hover:bg-red-600 text-white'
                        onClick={() => {
                          handleTakeAction('dismissReport', { reportId: report.id });
                          onStatusChange(report.id, ProcessingStatus.REJECTED);
                        }}
                      >
                        Bỏ qua báo cáo
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className='flex justify-between'>
        <Button variant='outline' onClick={onClose}>
          Đóng
        </Button>

        {report.status === ProcessingStatus.PENDING && (
          <Button onClick={() => onStatusChange(report.id, ProcessingStatus.IN_PROGRESS)}>
            <Clock className='mr-2 h-4 w-4' />
            Đánh dấu đang xử lý
          </Button>
        )}

        {report.status === ProcessingStatus.IN_PROGRESS && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={'outline'} className='bg-red-500 hover:bg-red-600 text-white'>
                <div className="flex items-center gap-[8px] ">
                  <Send className='mr-2 h-4 w-4' />
                  <span className="">Gửi thông báo</span>
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent className='w-[35%] '>
              <DialogHeader>
                <DialogTitle>Gửi thông báo</DialogTitle>
                <DialogDescription>Gửi thông báo đến người báo cáo hoặc người bị báo cáo.</DialogDescription>
              </DialogHeader>
              <div className='space-y-4 py-4'>
                <RadioGroup defaultValue='reporter'>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='reporter' id='reporter' />
                    <Label htmlFor='reporter'>Thông báo cho người báo cáo</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='reported' id='reported' />
                    <Label htmlFor='reported'>Thông báo cho người bị báo cáo</Label>
                  </div>
                </RadioGroup>
                <Textarea placeholder='Nội dung thông báo...' className='min-h-[100px]' />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant='outline'>Hủy</Button>
                </DialogClose>
                <Button variant={'outline'} className='bg-red-500 hover:bg-red-600 text-white' onClick={() => handleTakeAction('sendNotification', { reportId: report.id })}>
                  Gửi thông báo
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </CardFooter>
    </Card>
  );
}
