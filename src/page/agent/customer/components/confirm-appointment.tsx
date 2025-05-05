import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/authReducer';
import { useConfirmAppointment } from '../hook/use-confirm-appointment';


enum AppointmentStatus {
  Pending = "pending",
  Confirmed = "confirmed",
  Rejected = "rejected",
  Completed = "completed",
  Cancelled = "cancelled",
  Rescheduled = "rescheduled",
}


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

interface UpdateAppointmentStatusDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  appointment: Appointment | null;
}

export default function UpdateAppointmentStatusDialog({ isOpen, onOpenChange, appointment }: UpdateAppointmentStatusDialogProps) {
  const user = useSelector(selectUser);
  const [formData, setFormData] = useState<{
    status: AppointmentStatus;
    changeReason: string;
  }>({
    status: (appointment?.status as AppointmentStatus) || AppointmentStatus.Pending,
    changeReason: '',
  });

    useEffect(()=>{
      setFormData({
        status: (appointment?.status as AppointmentStatus) || AppointmentStatus.Pending,
        changeReason: '',
      })
    },[appointment])

  const { mutate: confirmAppointment, isPending: isUpdating } = useConfirmAppointment
  ();

  const handleUpdateStatus = () => {
    if (!appointment) {
      toast({
        title: 'Lỗi',
        description: 'Không có lịch hẹn được chọn.',
        variant: 'destructive',
      });
      return;
    }

    if (!user?.id) {
      toast({
        title: 'Lỗi',
        description: 'Không xác định được người dùng.',
        variant: 'destructive',
      });
      return;
    }

    // Client-side validation
    if (formData.status === AppointmentStatus.Confirmed || formData.status === AppointmentStatus.Rejected) {
      if (appointment.receiver.id !== user.id) {
        toast({
          title: 'Không có quyền',
          description: 'Chỉ người nhận cuộc hẹn có thể xác nhận hoặc từ chối.',
          variant: 'destructive',
        });
        return;
      }
      if (appointment.status !== AppointmentStatus.Pending) {
        toast({
          title: 'Lỗi',
          description: 'Cuộc hẹn phải ở trạng thái chờ xác nhận để xác nhận hoặc từ chối.',
          variant: 'destructive',
        });
        return;
      }
    }

    if (formData.status === AppointmentStatus.Completed) {
      if (appointment.receiver.id !== user.id) {
        toast({
          title: 'Không có quyền',
          description: 'Chỉ người nhận cuộc hẹn có thể đánh dấu hoàn thành.',
          variant: 'destructive',
        });
        return;
      }
      if (appointment.status !== AppointmentStatus.Confirmed) {
        toast({
          title: 'Lỗi',
          description: 'Cuộc hẹn phải ở trạng thái đã xác nhận để đánh dấu hoàn thành.',
          variant: 'destructive',
        });
        return;
      }
    }

    if (formData.status === AppointmentStatus.Cancelled) {
      if (appointment.status === AppointmentStatus.Completed) {
        toast({
          title: 'Lỗi',
          description: 'Không thể hủy cuộc hẹn đã hoàn thành.',
          variant: 'destructive',
        });
        return;
      }
      if (appointment.status === AppointmentStatus.Cancelled) {
        toast({
          title: 'Lỗi',
          description: 'Cuộc hẹn đã bị hủy trước đó.',
          variant: 'destructive',
        });
        return;
      }
    }

    if (formData.status === AppointmentStatus.Rescheduled) {
      if (appointment.status === AppointmentStatus.Completed || appointment.status === AppointmentStatus.Cancelled) {
        toast({
          title: 'Lỗi',
          description: 'Không thể lên lịch lại cho cuộc hẹn đã hoàn thành hoặc đã hủy.',
          variant: 'destructive',
        });
        return;
      }
    }

    confirmAppointment(
      {
        appointmentId: appointment.id,
        status: formData.status,
        changeReason: formData.changeReason || undefined,
      },
      {
        onSuccess: () => {
          toast({
            title: 'Thành công',
            description: 'Cập nhật trạng thái lịch hẹn thành công!',
          });
          onOpenChange(false);
        },
        onError: (error: any) => {
          toast({
            title: 'Lỗi',
            description: error.message || 'Cập nhật trạng thái thất bại!',
            variant: 'destructive',
          });
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-xl rounded-xl shadow-lg'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-semibold'>🗓️ Cập nhật trạng thái lịch hẹn</DialogTitle>
        </DialogHeader>

        <div className='space-y-6 py-4'>
          <div className='space-y-2'>
            <Label htmlFor='postTitle' className='text-base font-medium'>Bài đăng</Label>
            <Input
              id='postTitle'
              value={appointment?.post.title || ''}
              disabled
              className='w-full outline-none rounded-[6px] px-[12px] py-[8px] bg-gray-100'
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='receiverName' className='text-base font-medium'>Người nhận</Label>
            <Input
              id='receiverName'
              value={appointment?.receiver.fullname || ''}
              disabled
              className='w-full outline-none rounded-[6px] px-[12px] py-[8px] bg-gray-100'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='status' className='text-base font-medium'>Trạng thái</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value as AppointmentStatus })}
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Chọn trạng thái' />
              </SelectTrigger>
              <SelectContent className='z-[99999]'>
                <SelectItem value={AppointmentStatus.Pending}>🕒 Chờ xử lý</SelectItem>
                <SelectItem value={AppointmentStatus.Confirmed}>✅ Đã xác nhận</SelectItem>
                <SelectItem value={AppointmentStatus.Rejected}>❌ Đã từ chối</SelectItem>
                <SelectItem value={AppointmentStatus.Completed}>🏁 Hoàn thành</SelectItem>
                <SelectItem value={AppointmentStatus.Cancelled}>🚫 Đã hủy</SelectItem>
                <SelectItem value={AppointmentStatus.Rescheduled}>🔁 Đã dời lịch</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='changeReason' className='text-base font-medium'>Lý do thay đổi (tùy chọn)</Label>
            <Input
              id='changeReason'
              placeholder='Nhập lý do thay đổi (nếu có)'
              value={formData.changeReason}
              onChange={(e) => setFormData({ ...formData, changeReason: e.target.value })}
              className='w-full outline-none rounded-[6px] px-[12px] py-[8px]'
            />
          </div>
        </div>

        <DialogFooter className='pt-4'>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button
            className='bg-red-500 hover:bg-red-600 text-white'
            variant={'outline'}
            onClick={handleUpdateStatus}
            disabled={isUpdating}
          >
            {isUpdating ? 'Đang cập nhật...' : 'Cập nhật'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}