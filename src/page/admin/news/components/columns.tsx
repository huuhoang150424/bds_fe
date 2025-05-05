import { type ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Eye, Clock, Trash2, Edit } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NewsDelete } from './news-delete';
import { NewsEditDialog } from './update-news';

export enum CategoryNew {
  POLITICS = 'Chính trị',
  BUSINESS = 'Kinh doanh',
  TECHNOLOGY = 'Công nghệ',
  HEALTH = 'Sức khỏe',
  ENTERTAINMENT = 'Giải trí',
  SPORTS = 'Thể thao',
  SCIENCE = 'Khoa học',
  EDUCATION = 'Giáo dục',
}

export type News = {
  id: string;
  title: string;
  category: string;
  view: number;
  readingTime: number;
  imageUrl?: string;
  content?: string;
  createdAt: string;
  origin_post?: string;
  author: {
    fullname: string;
    avatar: string;
  };
};

function ActionsCell({ news }: { news: News }) {
  return (
    <div className='flex items-center gap-[5px] '>
      <NewsEditDialog news={news} trigger={<div className='flex items-center cursor-pointer '><Edit className='h-4 w-4' /></div>} />
      <NewsDelete
        newsId={news.id}
        newsTitle={news.title}
        trigger={<div className='flex items-center cursor-pointer '><Trash2 className='h-4 w-4' /></div>}
      />
    </div>
  );
}

export const columns: ColumnDef<News>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='h-3 w-3 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='h-3 w-3 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='p-0 hover:bg-transparent hover:text-red-500 text-xs font-medium'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Tên bài viết
          <ArrowUpDown className='ml-1 h-3 w-3' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const title = row.getValue('title') as string;
      return (
        <div className='flex items-center gap-2 max-w-[300px]'>
          <div className='font-medium text-xs truncate'>{title}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'category',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='p-0 hover:bg-transparent hover:text-red-500 text-xs font-medium'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Danh mục
          <ArrowUpDown className='ml-1 h-3 w-3' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const category = row.getValue('category') as string;
      return (
        <Badge variant='outline' className='text-[10px] border-red-200 text-red-500 font-medium'>
          {category.charAt(0) + category.slice(1).toLowerCase().replace('_', ' ')}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'author',
    header: 'Tác giả',
    cell: ({ row }) => {
      const author = row.original.author;
      return (
        <div className='flex items-center gap-1.5'>
          <Avatar className='h-5 w-5'>
            <AvatarImage src={author.avatar || '/placeholder.svg'} alt={author.fullname} />
            <AvatarFallback className='text-[10px] bg-red-100 text-red-500'>{author.fullname.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className='text-xs'>{author.fullname}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'view',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='p-0 hover:bg-transparent hover:text-red-500 text-xs font-medium'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Lượt xem
          <ArrowUpDown className='ml-1 h-3 w-3' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const view = row.getValue('view') as number;
      return (
        <div className='flex items-center gap-1 text-xs'>
          <Eye className='h-3 w-3 text-muted-foreground' />
          {view.toLocaleString()}
        </div>
      );
    },
  },
  {
    accessorKey: 'readingTime',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='p-0 hover:bg-transparent hover:text-red-500 text-xs font-medium'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Số phút đọc
          <ArrowUpDown className='ml-1 h-3 w-3' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const readingTime = row.getValue('readingTime') as number;
      return (
        <div className='flex items-center gap-1 text-xs'>
          <Clock className='h-3 w-3 text-muted-foreground' />
          {readingTime} min
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='p-0 hover:bg-transparent hover:text-red-500 text-xs font-medium'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Ngày
          <ArrowUpDown className='ml-1 h-3 w-3' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt') as string);
      return <div className='text-xs'>{format(date, 'MMM dd, yyyy')}</div>;
    },
  },
  {
    accessorKey: 'hành động',
    id: 'actions',
    cell: ({ row }) => {
      const news = row.original;
      return <ActionsCell news={news} />;
    },
  },
];
