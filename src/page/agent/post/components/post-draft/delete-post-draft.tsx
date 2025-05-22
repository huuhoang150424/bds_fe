import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { useDeletePostDraft } from '../../hooks/use-delete-post-draft';

interface DeletePostDraftModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  postDraft: any;
  typeListPost?: string;
}

export function DeletePostDraftModal({
  isOpen,
  onClose,
  title,
  postDraft,
  typeListPost,
}: DeletePostDraftModalProps) {
  const [imageError, setImageError] = useState(false);
  
  const mainImage = postDraft?.images?.[0]?.image_url ?? '';
  const { mutate: deletePostDraft, isPending: isDeleting } = useDeletePostDraft(typeListPost);
  
  const handleConfirm = () => {
    if (!postDraft?.id) return;
    
    deletePostDraft(postDraft.id, {
      onSuccess: onClose,
    });
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-500">
            <AlertTriangle size={20} />
            {title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex flex-col items-center mb-4">
            {mainImage && !imageError ? (
              <div className="w-full h-40 rounded-md overflow-hidden mb-4">
                <img
                  src={mainImage}
                  alt={postDraft?.title}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              </div>
            ) : (
              <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-md mb-4">
                <span className="text-gray-500">Không có hình ảnh</span>
              </div>
            )}
            <p className="text-center font-medium">{postDraft?.title}</p>
          </div>
          
          <p className="text-gray-500 text-sm text-center mb-2">
            Bạn có chắc chắn muốn xóa bản nháp này?
          </p>
          <p className="text-red-500 text-xs text-center">
            Lưu ý: Hành động này không thể hoàn tác
          </p>
        </div>
        
        <DialogFooter className="flex gap-2 sm:justify-end">
          <Button variant="outline" onClick={onClose} disabled={isDeleting}>
            Hủy
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isDeleting}
            className="bg-red-500 hover:bg-red-600"
          >
            {isDeleting ? 'Đang xóa...' : 'Xóa'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}