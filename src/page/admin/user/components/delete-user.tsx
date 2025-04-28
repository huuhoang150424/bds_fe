import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function DeleteUser({ deleteDialogOpen, setDeleteDialogOpen, selectedUser }:{deleteDialogOpen:any, setDeleteDialogOpen:any, selectedUser:any}) {
  
  const isPending=false;
  const handleDelete=()=>{

  }
  
  return (
    <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <DialogContent className='border-red-100 w-[35%] '>
        <DialogHeader>
          <DialogTitle className='text-base text-red-500'>Xóa người dùng</DialogTitle>
          <DialogDescription className='text-[14px] '>
            Bạn có chắc chắn muốn xóa người dùng này? Hành động này không thể hoàn tác.
          </DialogDescription>
        </DialogHeader>
        {selectedUser && (
          <div className='my-2 rounded-md bg-red-50 p-3 border border-red-100'>
            <h4 className='text-[14px]  font-medium text-red-800 mb-1'>Bạn sắp xóa:</h4>
            <div className='flex items-center gap-2'>
              <Avatar className='h-6 w-6'>
                <AvatarImage src={selectedUser.avatar || '/placeholder.svg'} alt={selectedUser.fullname} />
                <AvatarFallback className='text-[12px] bg-red-100 text-red-500'>
                  {selectedUser.fullname.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className='text-[14px]  text-red-700 font-medium'>{selectedUser.fullname}</p>
                <p className='text-[12px] text-red-600'>{selectedUser.email}</p>
              </div>
            </div>
            <p className='text-[12px] text-red-600 mt-1'>ID: {selectedUser.id}</p>
          </div>
        )}
        <DialogFooter>
          <button 
            className='h-8 text-[14px]  px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100'
            onClick={() => setDeleteDialogOpen(false)}
          >
            Hủy
          </button>
          <button
            className={`h-8 text-[14px]  px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? 'Đang xóa...' : 'Xóa'}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}