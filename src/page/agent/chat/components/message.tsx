import { cn } from '@/lib/utils';
import { selectUser } from '@/redux/authReducer';
import { useSelector } from 'react-redux';

export default function Message({message}: {message:any}) {
  const user=useSelector(selectUser);


  return (
    <div  
      className={cn('flex',user?.id=== message?.sender?.id ? 'justify-end' : 'justify-start')}
    >
      <div className={`flex gap-[10px] ${user?.id=== message?.sender?.id ? 'flex-row-reverse' : ' flex-row'} max-w-[80%]`}>
        <img src={message?.sender?.avatar} alt='Avatar' className='rounded-full w-8 h-8 object-cover ' />
        <div>
          <div className='flex items-center'>
            {/* <span className='font-medium text-sm text-gray-700'>{message?.sender?.fullname}</span> */}
          </div>
          <div
            className={ 'mt-1 p-3 rounded-lg bg-sky-500 text-white rounded-tr-none' }
          >
            <p>{message?.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
