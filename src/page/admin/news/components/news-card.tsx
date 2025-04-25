import { formatDistanceToNow } from 'date-fns';
import { Eye, Clock, MoreVertical, Heart, MessageCircle, Bookmark } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
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
import { Link } from 'react-router-dom';

interface NewsCardProps {
  news: {
    id: string;
    title: string;
    content: string;
    origin_post: string;
    view: number;
    slug: string;
    imageUrl: string;
    category: string;
    readingTime: number;
    createdAt: string;
    author: {
      name: string;
      avatar: string;
    };
  };
  className?: string;
}

export default function NewsCard({ news, className }: NewsCardProps) {
  return (
    <Card className={cn('overflow-hidden border-red-100 hover:border-red-200 transition-colors', className)}>
      <div className='relative aspect-video'>
        <img src={news.imageUrl || '/placeholder.svg'} alt={news.title} className='object-cover' />
        <div className='absolute top-2 right-2'>
          <Badge variant='secondary' className='text-[10px] font-medium bg-red-500 text-white hover:bg-red-600'>
            {news.category.charAt(0) + news.category.slice(1).toLowerCase().replace('_', ' ')}
          </Badge>
        </div>
      </div>
      <CardHeader className='p-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-1.5'>
            <Avatar className='h-6 w-6'>
              <AvatarImage src={news.author.avatar || '/placeholder.svg'} alt={news.author.name} />
              <AvatarFallback className='text-[10px]'>{news.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className='text-xs font-medium'>{news.author.name}</p>
              <p className='text-[10px] text-muted-foreground'>
                {formatDistanceToNow(new Date(news.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='icon' className='h-6 w-6'>
                <MoreVertical className='h-3 w-3' />
                <span className='sr-only'>Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='text-xs'>
              <DropdownMenuLabel className='text-xs'>Actions</DropdownMenuLabel>
              <DropdownMenuItem className='text-xs'>Edit</DropdownMenuItem>
              <DropdownMenuItem className='text-xs'>Duplicate</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='text-destructive text-xs'>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className='p-3 pt-0'>
        <Link to={`/news/${news.slug}`} className='group'>
          <h3 className='text-sm font-semibold group-hover:text-red-500 transition-colors line-clamp-2'>
            {news.title}
          </h3>
          <p className='mt-1.5 text-muted-foreground text-xs line-clamp-2'>{news.content}</p>
        </Link>
      </CardContent>
      <CardFooter className='p-3 pt-0 flex items-center justify-between text-[10px] text-muted-foreground border-t border-red-50 mt-2'>
        <div className='flex items-center gap-3'>
          <Button variant='ghost' size='icon' className='h-6 w-6 hover:text-red-500'>
            <Heart className='h-3 w-3' />
          </Button>
          <Button variant='ghost' size='icon' className='h-6 w-6 hover:text-red-500'>
            <MessageCircle className='h-3 w-3' />
          </Button>
          <Button variant='ghost' size='icon' className='h-6 w-6 hover:text-red-500'>
            <Bookmark className='h-3 w-3' />
          </Button>
        </div>
        <div className='flex items-center gap-2'>
          <div className='flex items-center'>
            <Eye className='mr-1 h-3 w-3' />
            <span>{news.view}</span>
          </div>
          <div className='flex items-center'>
            <Clock className='mr-1 h-3 w-3' />
            <span>{news.readingTime} min</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
