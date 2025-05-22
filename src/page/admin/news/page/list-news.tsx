import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import useScrollToTopOnMount from '@/hooks/use-scroll-top';
import { Link } from 'react-router-dom';
import { NewsTable } from '../components/news-table';

export default function NewsManagement() {
  useScrollToTopOnMount();


  return (
    <div className="">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-[600] text-gray-700  tracking-tight">Danh sách tin tức</h1>
          <p className="text-muted-foreground text-xs">Danh sách tin tức dành cho người dùng</p>
        </div>
        <Button variant={'outline'} asChild size="sm" className="bg-red-500 hover:bg-red-600 transition-all duration-300 ease-in-out ">
          <Link to="/admin/create-news" className="text-[14px] text-white">
            <PlusCircle className="h-3 w-3" />
            tạo mới tin tức
          </Link>
        </Button>
      </div>
      <NewsTable 

      />
    </div>
  );
}
