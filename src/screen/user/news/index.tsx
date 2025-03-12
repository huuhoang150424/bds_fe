import React from 'react';

function News() {
  return (
    <div className='max-w-6xl bg-red-500 h-full mx-auto pt-[80px]  '>
      {/* Search */}
      <div className='search bg-yellow-500'>

      </div>
      {/* Search */}
      {/* title */}
      <div className=' bg-blue-500 flex flex-col items-center px-[210px] py-[60px]'>
        <div className='title mb-[20px] '>
          <h1 className='font-[500] leading-[64px] text-[40px]'>Tin tức bất động sản mới nhất</h1>
        </div>
        <div className='descrip font-[400] text-[16px] leading-[26px] center'>
          <p>
            Thông tin mới, đầy đủ, hấp dẫn về thị trường bất động sản Việt Nam thông qua dữ liệu lớn về giá, giao dịch,
            nguồn cung - cầu và khảo sát thực tế của đội ngũ phóng viên, biên tập của Batdongsan.com.vn
          </p>
        </div>
      </div>
      {/* title */}

      {/* news */}
      <div className='grid grid-cols-12 grid-rows-5 gap-4 bg-gray-500'>
        <div className='col-span-8  bg-orange-500 h-[500px]'></div>
        <div className='col-span-4 col-start-9 bg-pink-500 h-[500px]'></div>
      </div>
      {/* news */}
      
    </div>
  );
}

export default News;
