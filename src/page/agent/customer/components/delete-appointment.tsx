import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/authReducer';
import { useDeleteAppointment } from '../hook/use-delete-appointment';

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

interface DeleteAppointmentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  appointment: Appointment | null;
}

export default function DeleteAppointmentDialog({ isOpen, onOpenChange, appointment }: DeleteAppointmentDialogProps) {
  const user = useSelector(selectUser);
  const { mutate: deleteAppointment, isPending: isDeleting } = useDeleteAppointment();

  const handleDelete = () => {
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

    if (appointment.requester.id !== user.id) {
      toast({
        title: 'Không có quyền',
        description: 'Chỉ người yêu cầu cuộc hẹn có thể xóa.',
        variant: 'destructive',
      });
      return;
    }

    deleteAppointment(
      appointment.id,
      {
        onSuccess: () => {
          toast({
            title: 'Thành công',
            description: 'Xóa lịch hẹn thành công!',
          });
          onOpenChange(false);
        },
        onError: (error: any) => {
          toast({
            title: 'Lỗi',
            description: error.message || 'Xóa lịch hẹn thất bại!',
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
          <DialogTitle className='text-2xl font-semibold'>🗑️ Xóa lịch hẹn</DialogTitle>
        </DialogHeader>

        <div className='space-y-6 py-4'>
          <p className='text-base text-gray-600'>Bạn có chắc chắn muốn xóa lịch hẹn này? Hành động này không thể hoàn tác.</p>

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
        </div>

        <DialogFooter className='pt-4'>
          <Button variant='outline' onClick={() => onOpenChange(false)} disabled={isDeleting}>
            Hủy
          </Button>
          <Button
            className='bg-red-500 hover:bg-red-600  text-white'
            variant={'outline'}
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Đang xóa...' : 'Xóa'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}