import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { useToggleLockUser } from '../hooks/use-tonggle-lockuser';
import { User } from './colums';

interface LockUserProps {
  selectedUser: User | null;
  lockDialogOpen: boolean;
  setLockDialogOpen: (open: boolean) => void;
}

export default function LockUser({ selectedUser, lockDialogOpen, setLockDialogOpen }: LockUserProps) {
  const { mutate: toggleLockUser, isPending: isProcessing } = useToggleLockUser();

  const handleToggleLock = () => {
    if (!selectedUser) return;

    const action = selectedUser.isLock ? 'UNLOCK' : 'LOCK';
    toggleLockUser(
      { userId: selectedUser.id, action },
      {
        onSuccess: (response) => {
          toast({
            variant: 'success',
            title: response.message || (action === 'UNLOCK' ? 'Mở khóa thành công' : 'Khóa người dùng thành công'),
          });
          setLockDialogOpen(false);
        },
        onError: (error: any) => {
          toast({
            variant: 'destructive',
            title: 'Lỗi',
            description: error.message || 'Không thể thực hiện thao tác',
          });
        },
      }
    );
  };

  return (
    <Dialog open={lockDialogOpen} onOpenChange={setLockDialogOpen}>
      <DialogContent className="border-red-100 w-[35%]">
        <DialogHeader>
          <DialogTitle className="text-base text-red-500">
            {selectedUser?.isLock ? 'Mở khóa người dùng' : 'Khóa người dùng'}
          </DialogTitle>
          <DialogDescription className="text-[14px]">
            {selectedUser?.isLock
              ? 'Bạn có chắc chắn muốn mở khóa người dùng này?'
              : 'Bạn có chắc chắn muốn khóa người dùng này? Người dùng sẽ không thể đăng nhập hoặc sử dụng tài khoản.'}
          </DialogDescription>
        </DialogHeader>
        {selectedUser && (
          <div className="my-2 rounded-md bg-red-50 p-3 border border-red-100">
            <h4 className="text-[14px] font-medium text-red-800 mb-1">
              {selectedUser.isLock ? 'Bạn sắp mở khóa:' : 'Bạn sắp khóa:'}
            </h4>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={selectedUser.avatar || '/placeholder.svg'} alt={selectedUser.fullname} />
                <AvatarFallback className="text-[12px] bg-red-100 text-red-500">
                  {selectedUser.fullname.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-[14px] text-red-700 font-medium">{selectedUser.fullname}</p>
                <p className="text-[12px] text-red-600">{selectedUser.email}</p>
              </div>
            </div>
            <p className="text-[12px] text-red-600 mt-1">ID: {selectedUser.id}</p>
          </div>
        )}
        <DialogFooter>
          <Button
            variant="outline"
            className="h-8 text-[14px]"
            onClick={() => setLockDialogOpen(false)}
            disabled={isProcessing}
          >
            Hủy
          </Button>
          <Button
            className={`h-8 text-[14px] ${
              selectedUser?.isLock ? 'bg-green-500 hover:bg-green-600' : 'bg-amber-500 hover:bg-amber-600'
            } text-white`}
            onClick={handleToggleLock}
            disabled={isProcessing || !selectedUser}
          >
            {isProcessing
              ? selectedUser?.isLock
                ? 'Đang mở khóa...'
                : 'Đang khóa...'
              : selectedUser?.isLock
                ? 'Mở khóa'
                : 'Khóa'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}