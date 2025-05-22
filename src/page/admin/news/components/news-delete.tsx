import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from "@/components/ui/button";
import { useDeleteNews } from "../hooks/use-delete-news";

interface NewsDeleteDialogProps {
  newsId: string;
  newsTitle: string;
  trigger?: React.ReactNode;
}

export function NewsDelete({
  newsId,
  newsTitle,
  trigger
}: NewsDeleteDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {mutate,isPending}=useDeleteNews();
  const handleDelete = async () => {
    mutate({newsId},{
      onSuccess: ()=>{
        setIsOpen(false);
      }
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span className="sr-only">Delete</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="border-red-100 w-[35%] ">
        <DialogHeader>
          <DialogTitle className="text-[17px] text-red-500">
            Xóa tin tức này?
          </DialogTitle>
          <DialogDescription className="text-[13px]">
            Bạn có chắc xóa bài đăng tin tức này không
          </DialogDescription>
        </DialogHeader>
        <div className="my-2 rounded-md bg-red-50 p-3 border border-red-100">
          <p className="text-[13px] text-red-700 font-medium truncate">{newsTitle}</p>
        </div>
        <DialogFooter>
          <Button variant={'outline'} className="h-8 text-[13px]" onClick={()=>setIsOpen(false)}>
            Hủy
          </Button>
          <Button
            className="h-8 text-[13px] bg-red-500 hover:bg-red-600 text-white"
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-1.5 h-3 w-3 animate-spin" />
                Loading...
              </>
            ) : (
              "Xóa"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}