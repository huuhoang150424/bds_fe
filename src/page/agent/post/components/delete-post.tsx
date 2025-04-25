import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  property: any;
  isLoading: boolean;
}

export function DeleteModal({ isOpen, onClose, onConfirm, title, property, isLoading }: DeleteModalProps) {
  const [imageError, setImageError] = useState(false);
  
  const mainImage = property?.images?.[0]?.imageUrl || '';
  
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
                  alt={property.title} 
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              </div>
            ) : (
              <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-md mb-4">
                <span className="text-gray-500">Không có hình ảnh</span>
              </div>
            )}
            <p className="text-center font-medium">{property.title}</p>
          </div>
          
          <p className="text-gray-500 text-sm text-center mb-2">
            Bạn có chắc chắn muốn xóa bất động sản này? 
          </p>
          <p className="text-red-500 text-xs text-center">
            Lưu ý: Hành động này không thể hoàn tác
          </p>
        </div>
        
        <DialogFooter className="flex gap-2 sm:justify-end">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Hủy
          </Button>
          <Button 
            variant="destructive" 
            onClick={onConfirm} 
            disabled={isLoading}
            className="bg-red-500 hover:bg-red-600"
          >
            {isLoading ? "Đang xóa..." : "Xóa"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}