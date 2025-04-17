import { useState } from 'react';
import { useGetListType } from '../hooks/use-get-list-type';
import { Link } from 'react-router-dom';
function CreatePost() {
  const { data: listType, isLoading, isError } = useGetListType();
  
  const [isType, setIsType] = useState('');
  return (
    <div className='max-w-6xl mx-auto text-center my-[30px]'>
        <div className='text-4xl font-[500] my-[30px]'><h1>Chọn loại bài đăng</h1></div>
        <div className='flex items-center justify-center space-x-4'>
        {listType?.slice(0, 2).map((item: { id: string; listingType: string }) => (
          <div key={item.id} className='flex flex-col items-center space-y-2'>
            {item.listingType === 'Bán' ? (
              <Link to="/agent/create-post-sell">
                <div className='text-2xl font-[400] flex items-center justify-center border border-gray-200 rounded-[10px] p-[10px] w-[200px] h-[50px]' onClick={() => setIsType(item.listingType)}>
                  {item.listingType}
                </div>
              </Link>
            ) : item.listingType === 'Cho thuê' ? (
              <Link to="/agent/create-post-rent">
                <div className='text-2xl font-[400] flex items-center justify-center border border-gray-200 rounded-[10px] p-[10px] w-[200px] h-[50px]' onClick={() => setIsType(item.listingType)}>
                  {item.listingType}
                </div>
              </Link>
            ) : (
              <div className='text-2xl font-[400] flex items-center justify-center border border-gray-200 rounded-[10px] p-[10px] w-[200px] h-[50px]' onClick={() => setIsType(item.listingType)}>
                {item.listingType}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreatePost;
