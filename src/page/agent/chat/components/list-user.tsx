import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useGetAllConversations } from '../hooks/use-get-allconversations';
import { useState } from 'react';
import { Loading } from '@/components/common';

export default function ListUser({ getReceiverId }: { getReceiverId: any }) {
  const [selectUser, setSelectUser] = useState<string>();
  const { data, isLoading } = useGetAllConversations();


  const handleSelect = (contact: any) => {
    setSelectUser(contact.id);
    getReceiverId(contact);
  };

  return (
    <ScrollArea className='flex-1 overflow-y-auto '>
      {isLoading ? (
        <Loading className='mx-auto mt-[200px] ' />
      ) : (
        <div className='px-4 py-2 '>
          <h2 className='text-xs font-semibold text-gray-500 tracking-wider uppercase'>Người dùng</h2>
          <div className='mt-2 space-y-1'>
            {data?.data?.map((contact: any, index: number) => (
              <div
                key={index}
                onClick={() => handleSelect(contact)}
                className={cn(
                  'flex items-center p-2 rounded-md cursor-pointer',
                  selectUser === contact.id ? 'bg-gray-100' : 'hover:bg-gray-100',
                )}
              >
                <div className='relative'>
                  <img src={contact?.avatar} alt='Avatar' className='rounded-full w-8 h-8 object-cover ' />
                  {contact?.active && (
                    <span className='absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-500 ring-1 ring-white' />
                  )}
                </div>
                <span className='ml-3 font-medium text-gray-700'>{contact?.fullname}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </ScrollArea>
  );
}
