import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import TabsUser from '@/components/user/tab';
import { format } from 'date-fns';
import { useLatestNews } from '../hook/use-get-laster-news';
import type { NewsItem } from '../service/get-laster-news';
import { Link } from 'react-router-dom';

export default function NewsSection() {
  const [featuredNewsIndex, setFeaturedNewsIndex] = useState(0); 
  const { data: news, isLoading, error } = useLatestNews();

  const tabs = [{ id: 0, label: 'Tin tức' }];

  const handleTabChange = () => {
    setFeaturedNewsIndex(0); 
  };

  const filteredNews = news || [];

  const handleNewsClick = (index: number) => {
    setFeaturedNewsIndex(index); 
  };

  const truncateContent = (content: string, maxLength: number) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-8 md:p-16">
        <div className="mb-4 h-10 w-48 bg-gray-200 animate-pulse rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-2">
            <div className="h-80 bg-gray-200 animate-pulse rounded-lg"></div>
            <div className="mt-4 h-6 bg-gray-200 animate-pulse rounded w-4/5"></div>
            <div className="mt-2 h-4 bg-gray-200 animate-pulse rounded w-2/5"></div>
          </div>
          <div className="space-y-4">
            {Array(3).fill(0).map((_, index) => (
              <div key={index} className="border-b pb-2">
                <div className="h-5 bg-gray-200 animate-pulse rounded w-11/12"></div>
                <div className="mt-2 h-4 bg-gray-200 animate-pulse rounded w-3/5"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !filteredNews.length) {
    return <div className="max-w-6xl mx-auto p-8 md:p-16 text-center text-gray-500">Không có tin tức để hiển thị</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-8 mt-[10px] ">
      <TabsUser tabs={tabs} getIdTab={handleTabChange} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredNews[featuredNewsIndex] && (
          <Card
            className="col-span-1 md:col-span-2 border border-gray-200 duration-300 cursor-pointer rounded-lg overflow-hidden "
            onClick={() => handleNewsClick(featuredNewsIndex)}
          >
            <CardContent className="p-0  overflow-hidden shadow-none">
              <Link to={`/new/${filteredNews[featuredNewsIndex].slug}`} className="relative p-[16px] flex items-center justify-center rounded-lg h-30">
                <img
                  src={filteredNews[featuredNewsIndex].imageUrl || '/placeholder.svg'}
                  alt={filteredNews[featuredNewsIndex].title}
                  className=" object-cover transition-transform duration-300 rounded-lg w-full h-full"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div> */}
              </Link>
              <div className="p-4">
                <h2 className="text-[16px] text-gray-800  font-[600] mb-2 hover:text-red-500 transition-colors duration-200">
                  {filteredNews[featuredNewsIndex].title}
                </h2>
                <p className="text-[14px] text-gray-400 flex items-center mb-4">
                  ⏳ {format(new Date(filteredNews[featuredNewsIndex].createdAt), 'dd/MM/yyyy HH:mm')}
                </p>
                <p className="text-sm text-gray-600">
                  {truncateContent(
                    filteredNews[featuredNewsIndex].content || 'Nội dung chi tiết của tin tức.',
                    150
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
        {/* Other News */}
        <div className="space-y-0">
          {filteredNews.map((item: NewsItem, index: number) => (
            <Card
              key={item.id}
              className={`border-none shadow-sm   duration-300 cursor-pointer p-4 ${
                index === featuredNewsIndex ? 'bg-gray-100' : 'bg-white'
              }`}
              onClick={() => handleNewsClick(index)}
            >
              <CardContent className="p-0">
                <h4 className="text-[14px] font-semibold hover:text-red-500 transition-colors duration-200">
                  {item.title}
                </h4>
                <p className="text-[12px] text-gray-500 flex items-center mt-2">
                  ⏳ {format(new Date(item.createdAt), 'dd/MM/yyyy HH:mm')}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}