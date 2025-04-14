import { useState } from 'react';
import  ListNew  from './components/list-new';
import NewsPopular from './components/news-popular';
import NewsTitle from './components/news-title';
import { Input } from '@/components/ui/input';
import ListNewBySearch from './components/list-new-by-search';
import { Button } from '@/components/ui/button';



function News() {
  const [searchTerm, setSearchTerm] = useState(""); 
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); 
  };
  const [search, setSearch] = useState(false);
  return (
    <div className='max-w-6xl h-full mx-auto  mt-[30px] '>
      <div className='search flex bg-gray-100 rounded-l-[10px]'>
      <Input
          placeholder='TÌm kiếm bài viết'
          className='px-[15px] py-[5px] rounded-l-[10px]'
          value={searchTerm}
          onChange={handleSearchChange} 
        />
        <Button className='bg-[#E03C31] hover:bg-[#FF837A]' onClick={() => setSearch(!search)}>Tìm kiếm</Button>
      </div>
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
        <div className='col-span-8 my-[60px]'>
          { search === false ? (
            <ListNew/>  
            ) : (
              <ListNewBySearch keyWord={searchTerm} />)  }
          {/* <ListNew/> */}
          {/* <ListNewBySearch keyWord={searchTerm} /> */}
        </div>
        <div className='col-span-4 col-start-9 my-[30px] '>
          <NewsPopular/>
        </div>
      </div>
    </div>
  );
}

export default News;
