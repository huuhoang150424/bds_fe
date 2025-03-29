
export default function NewsTitle() {
  return (
    <div className='col-span-12 grid grid-cols-12 gap-7'>
    <div className="relative col-span-8 self-start">
      <img
        src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/10/tai-anh-phong-canh-dep-1.jpg"
        alt="ảnh nền"
        className="w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="absolute inset-0 flex flex-col justify-center p-6 gap-2 top-[50%] ">
        <div className="text-gray-100 text-[14px] flex gap-2 font-medium leading-[22px]">
          <span>10/03/2025 11:03</span>
          <span>Tin tức</span>
        </div>
        <h2 className="text-white text-[24px] font-semibold leading-[32px]">
          Đất Đấu Giá Hưng Yên Nổi Sóng Đầu Năm
        </h2>
        <p className="text-white text-[16px] font-normal leading-[26px]">
          Thị trường đất đấu giá lại tiếp tục dậy sóng khi các phiên đấu giá đất tại Hưng Yên ghi nhận mức trúng đấu giá khủng...
        </p>
      </div>
    </div>
    <div className='col-span-4 '>
      {Array.from( { length: 5 } ) .map((_, index) => (
          <div key={index} className=' w-full '>
            <div className=' pr-[15px] py-[15px] space-y-1 '>
              <div className='flex  text-sm gap-2 font-[400]'>
                <span className=''>28/03/2025</span>
                <strong className='text-gray-600'>Nguyễn Văn A</strong>
              </div>
              <div>
                <span className='font-[400] text-[16px] line-clamp-2 '>Sự Kiện Toàn Cảnh Thị Trường BĐS Quý 1/2025: Cơ Hội Bắt Nhịp Thị Trường</span>
              </div>
            </div>
            <div className='border border-gray-100 flex justify-center'></div>
          </div>
        ))}
    </div>
  </div>
  )
}
