import { useState } from 'react';
import { Bell, BellOff, MoreVertical, Trash2 } from 'lucide-react';
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
  const [isRead, setIsRead] = useState(notification.isRead);

  const handleToggleRead = () => {
    setIsRead(!isRead);
  };

  return (
    <Card className="border border-gray-200 hover:border-gray-200 transition-colors rounded-[8px]">
      <CardContent className="p-3 border-gray-200 hover:border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            <Badge
              className={`text-[11px] ${
                isRead
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
              }`}
            >
              {isRead ? 'Read' : 'Unread'}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <MoreVertical className="h-3 w-3" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="text-[13px]">
                <DropdownMenuLabel className="text-[13px]">Actions</DropdownMenuLabel>
                <DropdownMenuItem className="text-[13px] cursor-pointer" onClick={handleToggleRead}>
                  {isRead ? 'Mark as unread' : 'Mark as read'}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive text-[13px] cursor-pointer"
                  onClick={onDelete} 
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <p className={`text-[13px] ${!isRead && 'font-medium'}`}>{notification.message}</p>
      </CardContent>
      <CardFooter className="p-3 pt-0 flex items-center justify-end text-[11px] text-muted-foreground border-t border-red-50 mt-2">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 hover:text-red-500"
            title={isRead ? 'Mark as unread' : 'Mark as read'}
            onClick={handleToggleRead}
          >
            {isRead ? <BellOff className="h-3 w-3" /> : <Bell className="h-3 w-3" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 hover:text-red-500"
            onClick={onDelete} 
            title="Delete"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}