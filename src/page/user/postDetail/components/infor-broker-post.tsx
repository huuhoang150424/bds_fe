import { Button } from '@/components/ui/button';
import { useAppContext } from '@/context/chat';
import { selectUser } from '@/redux/authReducer';
import { FaCircleCheck } from 'react-icons/fa6';
import { FiPhoneCall } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';

function InforBrokerPpost(data: { user: any,postId:string }) {
  const user = useSelector(selectUser);
  const { setSelectedUser } = useAppContext();
  const navigate = useNavigate();
  const handleSendMessage = () => {
    navigate('/agent/chat');
    setSelectedUser(data?.user);
  };

  return (
    <div className='bg-white rounded-lg p-4 '>
      <div className='flex items-center gap-3 mb-4'>
        <img
          src={data?.user?.avatar}
          alt='avatar'
          className='w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#00A870]'
        />
        <div className='flex-1 min-w-0'>
          <div className='flex items-center gap-2 flex-wrap'>
            <h3 className='font-medium text-sm sm:text-base'>Môi giới chuyên nghiệp</h3>
            <FaCircleCheck className='text-[#00A870] w-4 h-4 shrink-0' />
          </div>
          <h2 className='font-bold text-base sm:text-lg truncate'>{data?.user?.name}</h2>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-2 sm:gap-4 mb-4 text-center'>
        <div className=''>
          <p className='text-xs sm:text-sm text-gray-500'>Tham gia BĐS</p>
          <p className='font-medium mt-1 text-sm sm:text-base'> năm</p>
        </div>
        <div className=''>
          <p className='text-xs sm:text-sm text-gray-500'>Tin đăng</p>
          <p className='font-medium mt-1 text-sm sm:text-base'></p>
        </div>
        <div className=''>
          <p className='text-xs sm:text-sm text-gray-500'>Chứng chỉ</p>
          <div className='mt-1'>
            <FaCircleCheck className='mx-auto text-[#00A870] w-4 h-4 sm:w-5 sm:h-5' />
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-2 '>
        <Button
          onClick={()=>navigate(`/business/${data?.user?.id}`,{ state: { postId:data.postId} })}
          variant={'outline'}
          className='w-full text-xs sm:text-sm text-gray-600 ] transition-colors duration-200 shadow-none'
        >
          Xem trang cá nhân →
        </Button>
        <a
          href={`https://zalo.me/${data?.user?.phone}`}
          className='w-full text-gray-600 font-[400] text-[15px] py-2 sm:py-3 px-3 sm:px-4 rounded-lg border border-gray-200
                      bg-white hover:bg-gray-50 transition-colors duration-200
                      flex items-center justify-center gap-2  sm:text-base shadow-none'
        >
          <img
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/1200px-Icon_of_Zalo.svg.png'
            alt='Zalo'
            className='w-4 h-4 object-cover sm:w-5 sm:h-5'
          />
          Chat qua Zalo
        </a>
        <Button
          className='w-full py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg
                      bg-[#E03C31] hover:bg-[#FF837A] text-white transition-colors duration-200
                      flex items-center justify-center gap-2 text-sm sm:text-base shadow-none'
        >
          <FiPhoneCall className='w-4 h-4 sm:w-5 sm:h-5' />
          <span className='font-medium'>{data?.user?.phone}</span>
        </Button>
        {(user?.id === data?.user?.id || user===null) ? null : (
          <Button
            variant={'outline'}
            onClick={handleSendMessage}
            className='w-full text-xs sm:text-sm text-gray-600 ] transition-colors duration-200 shadow-none'
          >
            Nhắn tin
          </Button>
        )}
      </div>
    </div>
  );
}

export default InforBrokerPpost;
