import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface Appointment {
  id: string;
  post: { id: string; title: string };
  requester: { id: string; fullname: string; avatar: string };
  receiver: { id: string; fullname: string; avatar: string };
  status: 'pending' | 'confirmed' | 'rejected' | 'completed' | 'cancelled' | 'rescheduled';
  appointmentTime: string;
  message?: string;
  duration: number;
}

interface ViewAppointmentDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  appointment: Appointment | null;
}

export default function ViewAppointmentDetailsDialog({ isOpen, onOpenChange, appointment }: ViewAppointmentDetailsDialogProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant='outline' className='bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100'>
            Chờ xử lý
          </Badge>
        );
      case 'confirmed':
        return (
          <Badge variant='outline' className='bg-green-50 text-green-600 border-green-200 hover:bg-green-100'>
            Đã xác nhận
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant='outline' className='bg-red-50 text-red-600 border-red-200 hover:bg-red-100'>
            Đã từ chối
          </Badge>
        );
      case 'completed':
        return (
          <Badge variant='outline' className='bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'>
            Hoàn thành
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge variant='outline' className='bg-yellow-50 text-yellow-600 border-yellow-200 hover:bg-yellow-100'>
            Đã hủy
          </Badge>
        );
      case 'rescheduled':
        return (
          <Badge variant='outline' className='bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100'>
            Đã dời lịch
          </Badge>
        );
      default:
        return <Badge variant='outline'>{status}</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-xl rounded-xl shadow-lg'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-semibold'>📋 Chi tiết lịch hẹn</DialogTitle>
        </DialogHeader>

        <div className='space-y-6 py-4'>
          {/* Mã cuộc hẹn */}
          <div className='space-y-2'>
            <Label htmlFor='appointmentId' className='text-base font-medium'>Mã cuộc hẹn</Label>
            <Input
              id='appointmentId'
              value={appointment?.id || ''}
              disabled
              className='w-full outline-none rounded-[6px] px-[12px] py-[8px] bg-gray-100'
            />
          </div>

          {/* Bài đăng */}
          <div className='space-y-2'>
            <Label htmlFor='postTitle' className='text-base font-medium'>Bài đăng</Label>
            <Input
              id='postTitle'
              value={appointment?.post.title || ''}
              disabled
              className='w-full outline-none rounded-[6px] px-[12px] py-[8px] bg-gray-100'
            />
          </div>

          {/* Người yêu cầu */}
          <div className='space-y-2'>
            <Label htmlFor='requesterName' className='text-base font-medium'>Người yêu cầu</Label>
            <Input
              id='requesterName'
              value={appointment?.requester.fullname || ''}
              disabled
              className='w-full outline-none rounded-[6px] px-[12px] py-[8px] bg-gray-100'
            />
          </div>

          {/* Người nhận */}
          <div className='space-y-2'>
            <Label htmlFor='receiverName' className='text-base font-medium'>Người nhận</Label>
            <Input
              id='receiverName'
              value={appointment?.receiver.fullname || ''}
              disabled
              className='w-full outline-none rounded-[6px] px-[12px] py-[8px] bg-gray-100'
            />
          </div>

          {/* Trạng thái */}
          <div className='space-y-2'>
            <Label className='text-base font-medium'>Trạng thái</Label>
            <div>{appointment ? getStatusBadge(appointment.status) : <Badge variant='outline'>Không có</Badge>}</div>
          </div>

          {/* Thời gian cuộc hẹn */}
          <div className='space-y-2'>
            <Label htmlFor='appointmentTime' className='text-base font-medium'>Thời gian</Label>
            <Input
              id='appointmentTime'
              value={appointment ? format(new Date(appointment.appointmentTime), 'dd/MM/yyyy HH:mm') : ''}
              disabled
              className='w-full outline-none rounded-[6px] px-[12px] py-[8px] bg-gray-100'
            />
          </div>

          {/* Thời lượng */}
          <div className='space-y-2'>
            <Label htmlFor='duration' className='text-base font-medium'>Thời lượng (phút)</Label>
            <Input
              id='duration'
              value={appointment?.duration || ''}
              disabled
              className='w-full outline-none rounded-[6px] px-[12px] py-[8px] bg-gray-100'
            />
          </div>

          {/* Tin nhắn */}
          <div className='space-y-2'>
            <Label htmlFor='message' className='text-base font-medium'>Tin nhắn</Label>
            <Input
              id='message'
              value={appointment?.message || 'Không có tin nhắn'}
              disabled
              className='w-full outline-none rounded-[6px] px-[12px] py-[8px] bg-gray-100'
            />
          </div>
        </div>

        <DialogFooter className='pt-4'>
          <Button
            variant={'outline'}
            onClick={() => onOpenChange(false)}
          >
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}