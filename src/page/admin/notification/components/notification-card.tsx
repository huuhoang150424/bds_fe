import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Bell, BellOff, MoreVertical, Trash2 } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface NotificationCardProps {
  notification: {
    id: string;
    message: string;
    isRead: boolean;
    createdAt: string;
    user: {
      id: string;
      name: string;
      email: string;
      avatar: string;
    };
  };
  className?: string;
  onDelete?: () => void;
}

export default function NotificationCard({ notification, className, onDelete }: NotificationCardProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
  };


  return (
    <Card
      className= 'border  border-gray-200 hover:border-gray-200 transition-colors rounded-[8px] ' 
    >
      <CardContent className='p-3 border-gray-200 hover:border-gray-200 '>
        <div className='flex items-center justify-between mb-2'>
          <div className='flex items-center space-x-1.5'>
            <Avatar className='h-8 w-8'>
              <AvatarImage src={notification.user.avatar || '/placeholder.svg'} alt={notification.user.name} />
              <AvatarFallback className='text-[11px]'>{notification.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className='text-[13px]  font-medium'>{notification.user.name}</p>
              <p className='text-[11px] text-muted-foreground'>
                {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>
          <div className='flex items-center gap-1'>
            <Badge
              className={`text-[11px] ${
                notification.isRead
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
              }`}
            >
              {notification.isRead ? 'Read' : 'Unread'}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon' className='h-6 w-6'>
                  <MoreVertical className='h-3 w-3' />
                  <span className='sr-only'>Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='text-[13px] '>
                <DropdownMenuLabel className='text-[13px] '>Actions</DropdownMenuLabel>
                <DropdownMenuItem className='text-[13px]  cursor-pointer'>
                  {notification.isRead ? 'Mark as unread' : 'Mark as read'}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className='text-destructive text-[13px]  cursor-pointer'
                  onClick={() => setDeleteDialogOpen(true)}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <p className={`text-[13px]  ${!notification.isRead && 'font-medium'}`}>{notification.message}</p>
      </CardContent>
      <CardFooter className='p-3 pt-0 flex items-center justify-end text-[11px] text-muted-foreground border-t border-red-50 mt-2'>
        <div className='flex items-center gap-1'>
          <Button
            variant='ghost'
            size='icon'
            className='h-6 w-6 hover:text-red-500'
            title={notification.isRead ? 'Mark as unread' : 'Mark as read'}
          >
            {notification.isRead ? <BellOff className='h-3 w-3' /> : <Bell className='h-3 w-3' />}
          </Button>
          <Button
            variant='ghost'
            size='icon'
            className='h-6 w-6 hover:text-red-500'
            onClick={() => setDeleteDialogOpen(true)}
            title='Delete'
          >
            <Trash2 className='h-3 w-3' />
          </Button>
        </div>
      </CardFooter>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className='border-red-100'>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-base text-red-500'>Delete Notification</AlertDialogTitle>
            <AlertDialogDescription className='text-[13px] '>
              Are you sure you want to delete this notification? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className='my-2 rounded-md bg-red-50 p-3 border border-red-100'>
            <h4 className='text-[13px]  font-medium text-red-800 mb-1'>You are about to delete:</h4>
            <p className='text-[13px]  text-red-700 font-medium truncate'>{notification.message}</p>
            <p className='text-[11px] text-red-600 mt-1'>ID: {notification.id}</p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel className='h-8 text-[13px] '>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className='h-8 text-[13px]  bg-red-500 hover:bg-red-600 text-white'
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
