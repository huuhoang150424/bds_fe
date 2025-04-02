import { posts } from '@/constant/constPostDetail'
import React from 'react'
import { FaCircleCheck } from 'react-icons/fa6'
import { FiPhoneCall } from 'react-icons/fi'

function InforBrokerPpost( data : { user : {  name : string, email: string, phone: string, avatar: string } }) {
  return (
  <div className='bg-white rounded-lg p-4 '>
                {/* Header - Môi giới chuyên nghiệp */}
                <div className='flex items-center gap-3 mb-4'>
                  <img
                    src={data.user.avatar}
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
  
                {/* Stats */}
                <div className='grid grid-cols-3 gap-2 sm:gap-4 mb-4 text-center'>
                  <div className=''>
                    <p className='text-xs sm:text-sm text-gray-500'>Tham gia BĐS</p>
                    <p className='font-medium mt-1 text-sm sm:text-base'>{posts?.author.time} năm</p>
                  </div>
                  <div className=''>
                    <p className='text-xs sm:text-sm text-gray-500'>Tin đăng</p>
                    <p className='font-medium mt-1 text-sm sm:text-base'>{posts?.author?.numberPost}</p>
                  </div>
                  <div className=''>
                    <p className='text-xs sm:text-sm text-gray-500'>Chứng chỉ</p>
                    <div className='mt-1'>
                      <FaCircleCheck className='mx-auto text-[#00A870] w-4 h-4 sm:w-5 sm:h-5' />
                    </div>
                  </div>
                </div>
  
                {/* Project Info */}
                <div className='bg-[#F8F8F8] rounded-lg p-2 sm:p-3 mb-4'>
                  {/* <div className='flex items-center gap-2 mb-2'>
                    <div className='w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center shrink-0'>
                      <span className='text-base sm:text-xl'>💡</span>
                    </div>
                    <p className='text-xs sm:text-sm'>Có 6 tin căn hộ chung cư cùng dự án Vinhomes Grand Park</p>
                  </div> */}
                  <button className='w-full text-xs sm:text-sm text-gray-600 hover:text-[#00A870] transition-colors duration-200'>
                    Xem trang cá nhân →
                  </button>
                </div>
  
                {/* Contact Buttons */}
                <div className='space-y-2 sm:space-y-3'>
                  <button
                    className='w-full py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg border border-gray-200 
                    bg-white hover:bg-gray-50 transition-colors duration-200 
                    flex items-center justify-center gap-2 text-sm sm:text-base'
                  >
                    <img src='/zalo-icon.png' alt='Zalo' className='w-4 h-4 sm:w-5 sm:h-5' />
                    Chat qua Zalo
                  </button>
                  <button
                    className='w-full py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg 
                    bg-[#E03C31] hover:bg-[#FF837A] text-white transition-colors duration-200 
                    flex items-center justify-center gap-2 text-sm sm:text-base'
                  >
                    <FiPhoneCall className='w-4 h-4 sm:w-5 sm:h-5' />
                    <span className='font-medium'>{data.user.phone}</span>
                  </button>
                </div>
              </div>
  )
}

export default InforBrokerPpost