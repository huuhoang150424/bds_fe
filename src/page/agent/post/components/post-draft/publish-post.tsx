import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Upload, Loader2 } from 'lucide-react';
interface PublishPostModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  post: any | null;
  onPublish: () => void;
  isPublishing: boolean;
  error?: string;
}

export function PublishPostModal({ isOpen, onOpenChange, post, onPublish, isPublishing, error }: PublishPostModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-md rounded-xl shadow-lg'>
        <DialogHeader>
          <DialogTitle className='text-xl font-semibold flex items-center gap-2'>
            <Upload className='h-5 w-5 text-red-500' />
            Xuất bản bài viết
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-4 py-4'>
          <p className='text-sm text-gray-600'>
            Bạn có chắc chắn muốn xuất bản bài viết này?
          </p>
          <div className='space-y-2'>
            <p className='text-base font-medium'>Tiêu đề:</p>
            <p className='text-sm text-gray-800 bg-gray-100 p-3 rounded-md'>
              {post?.title || 'Không có tiêu đề'}
            </p>
          </div>
          {error && (
            <p className='text-sm text-red-500 bg-red-50 p-2 rounded-md'>
              {error}
            </p>
          )}
        </div>

        <DialogFooter className='pt-4 flex justify-end gap-2'>
          <Button
            variant='outline'
            className='border-gray-300 text-gray-700 hover:bg-gray-100'
            onClick={() => onOpenChange(false)}
            disabled={isPublishing}
          >
            Hủy
          </Button>
          <Button
            className='bg-red-500 hover:bg-red-600 text-white'
            onClick={onPublish}
            disabled={isPublishing}
          >
            {isPublishing ? (
              <Loader2 className='h-4 w-4 animate-spin mr-2' />
            ) : (
              <Upload className='h-4 w-4 mr-2' />
            )}
            Xuất bản
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}