import { useState } from 'react';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
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
  const [calendarOpen, setCalendarOpen] = useState(false);
  const { mutate, isPending } = useCreateAppointments();

  const form = useForm<FormCreateAppointment>({
    resolver: zodResolver(formCreateAppointment),
    defaultValues: {
      postId: postId || '',
      appointmentTime: '2025-04-30T14:00:00Z',
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

  const onSubmit = (values: FormCreateAppointment) => {
    console.log(values);
    mutate(values);
    setOpen(false);
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      form.setValue('appointmentTime', date.toISOString());
      setCalendarOpen(false); 
    }
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
            <FormField
              control={form.control}
              name='appointmentTime'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Ngày và giờ</FormLabel>
                  <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                          onClick={() => setCalendarOpen(true)}
                        >
                          {field.value ? (
                            format(new Date(field.value), 'PPP', { locale: vi })
                          ) : (
                            <span>Chọn thời gian</span>
                          )}

                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent 
                      className='w-auto p-0 z-[999999] '
                      align="start"
                      side="bottom"
                      sideOffset={4}
                    >
                      <Calendar
                        mode='single'
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={handleDateChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
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
                      <SelectContent className='z-[9999] '>
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

            <DialogFooter className='flex justify-end gap-2 pt-4'>
              <Button type='button' variant='outline' onClick={() => setOpen(false)}>
                Hủy
              </Button>
              <Button
                type='submit'
                disabled={isPending || !form.formState.isValid}
                className='bg-red-500 hover:bg-red-600 text-white'
              >
                {isPending ? 'Đang xử lý...' : 'Xác nhận'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}