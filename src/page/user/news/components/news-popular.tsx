
export default function NewsPopular ()
{
  return (
    <div className='border rounded-[8px]'>
      <div className='font-[500] text-lg text-center p-[15px]'>
        <span>Bài viết được xem nhiều nhất</span>
      </div>
      <div className='border border-gray-100 col-span-12 mb-[20px] '></div>
      <div>
        { Array.from( { length: 5 } ).map( ( _, index ) => (
          <div key={ index } className="px-[20px]">
            <div className="flex items-center justify-start gap-4">
              <div className="rounded-[50%] w-[32px] h-[32px] text-[#E03C31] bg-[#FFECEB] p-[8px] flex items-center justify-center">
                <span>{ index + 1 }</span>
              </div>
              <span>NASA Công Bố Kế Hoạch Chinh Phục Sao Hỏa</span>
            </div>
            <div className="border border-gray-100 my-[20px]"></div>
          </div>
        ) ) }
      </div>

    </div>
  )
}
