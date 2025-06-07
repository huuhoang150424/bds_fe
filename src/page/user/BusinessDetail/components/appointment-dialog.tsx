import { useState } from 'react';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formCreateAppointment, type FormCreateAppointment } from '../schema/create-apointment';
import { useCreateAppointments } from '../hooks/use-create-appointments';

interface AppointmentDialogProps {
  receiverId: string;
  postId?: string;
  receiverName: string;
}

export function AppointmentDialog({ receiverId, postId, receiverName }: AppointmentDialogProps) {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useCreateAppointments();

  const form = useForm<FormCreateAppointment>({
    resolver: zodResolver(formCreateAppointment),
    defaultValues: {
      postId: postId || '',
      appointmentTime: new Date().toISOString(),
      receiverId: receiverId || '',
      duration: 30,
      message: '',
    },
  });

  const durationOptions = [
    { value: '15', label: '15 phút' },
    { value: '30', label: '30 phút' },
    { value: '45', label: '45 phút' },
    { value: '60', label: '60 phút' },
  ];

  const formatDateTimeLocal = (isoString: string) => {
    const date = new Date(isoString);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - (offset * 60 * 1000));
    return localDate.toISOString().slice(0, 16);
  };

  const parseLocalDateTime = (localDateTime: string) => {
    if (!localDateTime) return '';
    const date = new Date(localDateTime);
    return date.toISOString();
  };

  const onSubmit = (values: FormCreateAppointment) => {
    mutate(values, {
      onSuccess: () => {
        setOpen(false); // Chỉ đóng dialog khi thành công
        form.reset(); // Reset form sau khi thành công
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' className='text-red-500'>
          <CalendarIcon className='mr-2 h-4 w-4' />
          Đặt lịch hẹn
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Đặt lịch hẹn</DialogTitle>
          <DialogDescription>
            Đặt lịch hẹn với {receiverName}. Vui lòng chọn ngày, giờ và thời lượng phù hợp.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className={cn('space-y-4', isPending && 'opacity-50 pointer-events-none')}>
              <FormField
                control={form.control}
                name='appointmentTime'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Ngày và giờ</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <input
                          type='datetime-local'
                          className={cn(
                            'w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500',
                            !field.value && 'text-muted-foreground',
                          )}
                          value={field.value ? formatDateTimeLocal(field.value) : ''}
                          onChange={(e) => {
                            const isoString = parseLocalDateTime(e.target.value);
                            field.onChange(isoString);
                          }}
                          min={formatDateTimeLocal(new Date().toISOString())}
                        />
                        <CalendarIcon className='absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50 pointer-events-none' />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='duration'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Thời lượng:</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value?.toString() || '30'}
                        onValueChange={(value) => field.onChange(parseInt(value, 10))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Chọn thời lượng' />
                        </SelectTrigger>
                        <SelectContent className='z-[9999]'>
                          {durationOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='message'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Ghi chú:</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Nhập ghi chú hoặc lý do cuộc hẹn'
                        className='resize-none'
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className='flex justify-end gap-2 pt-4'>
              <Button 
                type='button' 
                variant='outline' 
                onClick={() => setOpen(false)}
                disabled={isPending}
              >
                Hủy
              </Button>
              <Button
                type='submit'
                disabled={isPending || !form.formState.isValid}
                className='bg-red-500 hover:bg-red-600 text-white disabled:opacity-50'
              >
                {isPending ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Đang xử lý...
                  </>
                ) : (
                  'Xác nhận'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}