import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { format, parseISO } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { useUpdateAppointment } from '../hook/use-update-appointment';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/authReducer';

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

interface UpdateAppointmentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  appointment: Appointment | null;
}

export default function UpdateAppointmentDialog({ isOpen, onOpenChange, appointment }: UpdateAppointmentDialogProps) {
  const user = useSelector(selectUser);
  const [formData, setFormData] = useState<{
    appointmentTime: string;
    message: string;
    duration: number;
  }>({
    appointmentTime: appointment ? format(parseISO(appointment.appointmentTime), "yyyy-MM-dd'T'HH:mm") : '',
    message: appointment?.message || '',
    duration: appointment?.duration || 30,
  });

  useEffect(()=>{
    setFormData({
      appointmentTime: appointment ? format(parseISO(appointment.appointmentTime), "yyyy-MM-dd'T'HH:mm") : '',
      message: appointment?.message || '',
      duration: appointment?.duration || 30,
    })
  },[appointment])

  const { mutate: updateAppointment, isPending: isUpdating } = useUpdateAppointment();

  const handleUpdateAppointment = () => {
    if (!appointment) {
      toast({
        title: 'Lỗi',
        description: 'Không có lịch hẹn được chọn.',
        variant: 'destructive',
      });
      return;
    }

    if (appointment.requester.id !== user?.id) {
      toast({
        title: 'Không có quyền',
        description: 'Chỉ người yêu cầu cuộc hẹn mới có thể sửa lịch hẹn.',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.appointmentTime || formData.duration <= 0) {
      toast({
        title: 'Lỗi',
        description: 'Vui lòng nhập thời gian hợp lệ và thời lượng lớn hơn 0.',
        variant: 'destructive',
      });
      return;
    }

    updateAppointment(
      {
        appointmentId: appointment.id,
        updatedData: {
          appointmentTime: formData.appointmentTime,
          message: formData.message,
          duration: formData.duration,
        },
      },
      {
        onSuccess: () => {
          toast({
            title: 'Thành công',
            description: 'Cập nhật lịch hẹn thành công!',
          });
          onOpenChange(false);
        },
        onError: (error: any) => {
          toast({
            title: 'Lỗi',
            description: error.message || 'Cập nhật lịch hẹn thất bại!',
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
          <DialogTitle className='text-2xl font-semibold'>🗓️ Cập nhật lịch hẹn</DialogTitle>
        </DialogHeader>

        <div className='space-y-6 py-4'>
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

          {/* Thời gian hẹn */}
          <div className='space-y-2'>
            <Label htmlFor='appointmentTime' className='text-base font-medium'>Thời gian</Label>
            <Input
              id='appointmentTime'
              type='datetime-local'
              value={formData.appointmentTime}
              onChange={(e) => setFormData({ ...formData, appointmentTime: e.target.value })}
              className='w-[50%] outline-none rounded-[6px] px-[12px] py-[8px]'
            />
          </div>

          {/* Thời lượng */}
          <div className='space-y-2'>
            <Label htmlFor='duration' className='text-base font-medium'>Thời lượng (phút)</Label>
            <Input
              id='duration'
              type='number'
              min='1'
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 30 })}
              className='w-[50%] outline-none rounded-[6px] px-[12px] py-[8px]'
            />
          </div>

          {/* Thông điệp */}
          <div className='space-y-2'>
            <Label htmlFor='message' className='text-base font-medium'>Thông điệp</Label>
            <Input
              id='message'
              placeholder='Nhập thông điệp (nếu có)'
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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
            onClick={handleUpdateAppointment}
            disabled={isUpdating}
          >
            {isUpdating ? 'Đang cập nhật...' : 'Cập nhật'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}