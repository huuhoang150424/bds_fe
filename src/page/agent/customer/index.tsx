import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MoreHorizontal, FileText, Phone, Calendar, RefreshCw, Trash2 } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import useScrollToTopOnMount from '@/hooks/use-scroll-top';
import { format } from 'date-fns';
import { Pagination } from '@/components/user/pagination';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/authReducer';
import UpdateAppointmentDialog from './components/update-appointment';
import DeleteAppointmentDialog from './components/delete-appointment';
import { useGetMyAppointments } from './hook/use-get-appoinment';
import UpdateAppointmentStatusDialog from './components/confirm-appointment';
import ViewAppointmentDetails from './components/view-appointment-details';

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

export default function AppointmentsManagement() {
  useScrollToTopOnMount();
  const user = useSelector(selectUser);
  const [activeRow, setActiveRow] = useState<string | null>(null);
  const [pageSentByOthers, setPageSentByOthers] = useState(1);
  const [pageSentByMe, setPageSentByMe] = useState(1);
  const pageSize = 10;
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const { data, isLoading } = useGetMyAppointments(pageSentByOthers, pageSize);

  const appointments: Appointment[] = data?.data?.data || [];
  const totalItems = data?.data?.totalItems || 0;
  const totalPages = data?.data?.totalPages || 1;
  const currentPage = data?.data?.currentPage || 1;

  useEffect(() => {
    const handleClickOutside = () => {
      setActiveRow(null);
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!isUpdateDialogOpen && !isStatusDialogOpen && !isDeleteDialogOpen && !isDetailsDialogOpen && activeRow) {
      setActiveRow(null);
    }
  }, [isUpdateDialogOpen, isStatusDialogOpen, isDeleteDialogOpen,isDetailsDialogOpen]);

  const appointmentsSentByOthers = appointments.filter((appt) => appt.receiver.id === user?.id);
  const appointmentsSentByMe = appointments.filter((appt) => appt.requester.id === user?.id);

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

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const getAvatarColor = (id: string) => {
    const colors = [
      'bg-red-100 text-red-800',
      'bg-green-100 text-green-800',
      'bg-blue-100 text-blue-800',
      'bg-yellow-100 text-yellow-800',
      'bg-purple-100 text-purple-800',
      'bg-pink-100 text-pink-800',
      'bg-indigo-100 text-indigo-800',
      'bg-gray-100 text-gray-800',
    ];
    const index = Number.parseInt(id.replace(/[^0-9]/g, '')) % colors.length;
    return colors[index];
  };

  const handleChangePage = (newPage: number, tab: 'sentByOthers' | 'sentByMe') => {
    if (tab === 'sentByOthers') {
      setPageSentByOthers(newPage);
    } else {
      setPageSentByMe(newPage);
    }
  };

  const handleOpenUpdateDialog = (appointment: Appointment, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedAppointment(appointment);
    setIsUpdateDialogOpen(true);
    setOpenDropdown(null);
  };

  const handleOpenStatusDialog = (appointment: Appointment, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedAppointment(appointment);
    setIsStatusDialogOpen(true);
    setOpenDropdown(null);
  };

  const handleOpenDeleteDialog = (appointment: Appointment, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedAppointment(appointment);
    setIsDeleteDialogOpen(true);
    setOpenDropdown(null);
  };

  const handleDropdownOpen = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenDropdown(openDropdown === id ? null : id);
    setActiveRow(id);
  };

  const handleOpenViewDialog = (appointment: Appointment, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedAppointment(appointment);
    setIsDetailsDialogOpen(true);
    setOpenDropdown(null);
  };

  const handleModalClose = () => {
    setIsUpdateDialogOpen(false);
    setIsStatusDialogOpen(false);
    setIsDeleteDialogOpen(false);
    setIsDetailsDialogOpen(false);
    setSelectedAppointment(null);
    setActiveRow(null);
  };

  const renderAppointmentTable = (appointments: Appointment[], page: number, tab: 'sentByOthers' | 'sentByMe') => (
    <>
      <div className='overflow-x-auto'>
        <Table className='text-xs rounded-md'>
          <TableHeader className='bg-gray-50'>
            <TableRow className='hover:bg-gray-50/80'>
              <TableHead className='w-[80px] font-medium'>Mã cuộc hẹn</TableHead>
              <TableHead className='w-[180px] font-medium'>Bài đăng</TableHead>
              <TableHead className='w-[180px] font-medium'>Người yêu cầu</TableHead>
              <TableHead className='w-[180px] font-medium'>Người nhận</TableHead>
              <TableHead className='w-[120px] font-medium'>Trạng thái</TableHead>
              <TableHead className='w-[120px] font-medium'>Thời gian</TableHead>
              <TableHead className='w-[80px] font-medium text-right'>Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className='text-center'>
                  Đang tải...
                </TableCell>
              </TableRow>
            ) : appointments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className='text-center'>
                  Không có cuộc hẹn nào
                </TableCell>
              </TableRow>
            ) : (
              appointments.map((appointment) => (
                <TableRow
                  key={appointment.id}
                  className={cn('h-14 hover:bg-gray-50/80', activeRow === appointment.id && 'bg-blue-50/50')}
                >
                  <TableCell className='font-medium'>{appointment.id}</TableCell>
                  <TableCell>{appointment.post.title}</TableCell>
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      <Avatar className={cn('h-7 w-7', getAvatarColor(appointment.requester.id))}>
                        <AvatarFallback className='text-xs'>
                          {getInitials(appointment.requester.fullname)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{appointment.requester.fullname}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      <Avatar className={cn('h-7 w-7', getAvatarColor(appointment.receiver.id))}>
                        <AvatarFallback className='text-xs'>
                          {getInitials(appointment.receiver.fullname)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{appointment.receiver.fullname}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                  <TableCell>{format(new Date(appointment.appointmentTime), 'dd/MM/yyyy HH:mm')}</TableCell>
                  <TableCell className='text-right'>
                    <DropdownMenu
                      open={openDropdown === appointment.id}
                      onOpenChange={(open) => {
                        if (!open) setOpenDropdown(null);
                      }}
                    >
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant='ghost'
                          className='h-8 w-8 p-0'
                          onClick={(e) => handleDropdownOpen(appointment.id, e)}
                        >
                          <span className='sr-only'>Mở menu</span>
                          <MoreHorizontal className='h-4 w-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align='end'
                        className='w-[180px]'
                        onCloseAutoFocus={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <DropdownMenuItem className='text-xs' onSelect={(e) => e.preventDefault()} onClick={(e) => handleOpenViewDialog(appointment, e)} >
                          <FileText className='mr-2 h-3.5 w-3.5' />
                          <span>Xem chi tiết</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className='text-xs' onSelect={(e) => e.preventDefault()}>
                          <Phone className='mr-2 h-3.5 w-3.5' />
                          <span>Liên hệ</span>
                        </DropdownMenuItem>
                        {user?.id === appointment?.requester?.id && (
                          <DropdownMenuItem
                            className='text-xs'
                            onSelect={(e) => e.preventDefault()}
                            onClick={(e) => handleOpenUpdateDialog(appointment, e)}
                          >
                            <Calendar className='mr-2 h-3.5 w-3.5' />
                            <span>Sửa lịch hẹn</span>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          className='text-xs'
                          onSelect={(e) => e.preventDefault()}
                          onClick={(e) => handleOpenStatusDialog(appointment, e)}
                        >
                          <RefreshCw className='mr-2 h-3.5 w-3.5' />
                          <span>Cập nhật trạng thái</span>
                        </DropdownMenuItem>
                        
                        {user?.id === appointment?.requester?.id && (
                          <DropdownMenuItem
                            className='text-xs'
                            onSelect={(e) => e.preventDefault()}
                            onClick={(e) => handleOpenDeleteDialog(appointment, e)}
                          >
                            <Trash2 className='mr-2 h-3.5 w-3.5' />
                            <span>Xóa cuộc hẹn</span>
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-between px-4 py-3 border-t w-full'>
        <div className='text-xs text-gray-500'>Hiển thị trong tổng số {totalItems} lịch hẹn</div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(newPage) => handleChangePage(newPage, tab)}
          className='mt-0'
        />
      </div>
    </>
  );

  return (
    <div className='container mx-auto py-8 px-4 max-w-[1380px]'>
      <div className='mb-6'>
        <h1 className='text-xl font-semibold text-gray-700'>Quản Lý Cuộc Hẹn</h1>
        <p className='text-sm text-gray-500 mt-1'>Quản lý thông tin và theo dõi các cuộc hẹn</p>
      </div>

      <Tabs defaultValue='sentByOthers' className='w-full'>
        <TabsList className='grid w-full grid-cols-2 mb-4 border border-gray-200 bg-transparent p-[5px]'>
          <TabsTrigger className='data-[state=active]:bg-red-500 data-[state=active]:text-white' value='sentByOthers'>
            Lịch hẹn người khác gửi
          </TabsTrigger>
          <TabsTrigger className='data-[state=active]:bg-red-500 data-[state=active]:text-white' value='sentByMe'>
            Lịch hẹn mình gửi
          </TabsTrigger>
        </TabsList>

        <TabsContent value='sentByOthers'>
          <div className='rounded-md border border-gray-200 shadow-sm'>
            {renderAppointmentTable(appointmentsSentByOthers, pageSentByOthers, 'sentByOthers')}
          </div>
        </TabsContent>

        <TabsContent value='sentByMe'>
          <div className='rounded-md border border-gray-200 shadow-sm'>
            {renderAppointmentTable(appointmentsSentByMe, pageSentByMe, 'sentByMe')}
          </div>
        </TabsContent>
      </Tabs>

      <UpdateAppointmentDialog
        isOpen={isUpdateDialogOpen}
        onOpenChange={handleModalClose}
        appointment={selectedAppointment}
      />
      <UpdateAppointmentStatusDialog
        isOpen={isStatusDialogOpen}
        onOpenChange={handleModalClose}
        appointment={selectedAppointment}
      />
      <DeleteAppointmentDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={handleModalClose}
        appointment={selectedAppointment}
      />
      <ViewAppointmentDetails
        isOpen={isDetailsDialogOpen}
        onOpenChange={handleModalClose}
        appointment={selectedAppointment}
      />
    </div>
  );
}