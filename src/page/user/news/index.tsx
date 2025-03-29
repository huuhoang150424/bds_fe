import { useState } from 'react';
import  ListNew  from './components/list-new';
import NewsPopular from './components/news-popular';
import NewsTitle from './components/news-title';





function News() {
  return (
    <div className='max-w-6xl h-full mx-auto pt-[80px]  '>
      <div className='search bg-yellow-500'></div>
      <div className=' flex flex-col items-center px-[210px] py-[60px]'>
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
      <div className='grid grid-cols-12 gap-4 '>
        <NewsTitle/>
      </div>
      <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-8 '>
          <ListNew/>
        </div>
        <div className='col-span-4 col-start-9 my-[30px] '>
          <NewsPopular/>
        </div>
      </div>
    </div>
  );
}

export default News;
