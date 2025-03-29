'use client';

import { useState, type ChangeEvent } from 'react';
import { CustomImage } from '@/components/common';

// import Link from "next/link"
import { Clock, Home, ChevronRight, Facebook, Linkedin, Twitter, Edit, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { article, anotherArticle } from '@/constant/constNewsDetail';
import { Link } from 'react-router-dom';

interface ArticleData {
  title: string;
  author: string;
  source: string;
  publishDate: string;
  readTime: string;
  mainImage: string;
  secondImage: string;
  mainImageCaption: string;
  secondImageCaption: string;
  paragraphs: string[];
  relatedArticles: string[];
}

function NewsArticle() {
  const [visible, setVisible] = useState<number>(3);
  const toggleVisible = () => {
    setVisible((prev) => {
      return prev + 3;
    });
  };
  return (
    <div className='flex flex-col max-w-6xl bg-white pt-[80px] mx-auto'>
      {/* Header Navigation */}
      <header className='sticky top-0 z-10 border-b bg-white'>
        <div className='container mx-auto px-4 py-2 flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <Home className='h-4 w-4 text-gray-600' />
            <span className='text-sm text-gray-600'>Tin tức</span>
            <ChevronRight className='h-3 w-3 text-gray-400' />
            <span className='text-sm text-gray-600 truncate max-w-[200px] md:max-w-md'>{article.title}</span>
          </div>
          <div className='relative'>
            <input
              type='search'
              placeholder='Nhập từ khóa tìm kiếm'
              className='py-1 px-3 text-sm border rounded-md w-32 md:w-64'
            />
          </div>
        </div>
      </header>
      <div className=' px-4 py-4'>
        {/* Article Title */}
        <h1 className='text-2xl md:text-3xl font-bold mb-4'>{article.title}</h1>

        {/* Article Meta */}
        <div className='flex items-center mb-6'>
          <div className='flex items-center text-red-500 mr-4'>
            <div className='w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-2'>
              <Clock className='h-4 w-4 text-red-500' />
            </div>
            <div>
              <p className='text-sm font-medium'>Đăng đăng bởi {article.author}</p>
              <p className='text-xs text-gray-600'>
                Cập nhật lần cuối vào {article.publishDate} • Đọc trong khoảng {article.readTime}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='grid grid-cols-12 gap-7 px-4 pb-6'>
        <article className='col-span-8'>
          {/* Article Content */}
          <div className='prose '>
            <p className='font-medium mb-4 line-clamp-2'>{article.paragraphs[0]}</p>

            <div className='my-6 w-full'>
              <CustomImage
                src={article.mainImage || '/placeholder.svg?height=400&width=800'}
                alt={article.mainImageCaption}
                width='full'
                height={400}
                className='w-full rounded-md object-cover'
              />
            </div>

            {article.paragraphs.slice(1, -1).map((paragraph, index) => (
              <p key={index + 1} className='mb-4'>
                {paragraph}
              </p>
            ))}

            <div className='my-6 w-full'>
              <img src={article.secondImage} alt='ảnh nền' className='w-full h-[400px] object-cover' />
              {/* <CustomImage
                src={article.secondImage || '/placeholder.svg?height=400&width=800'}
                alt={article.mainImageCaption}
                width='full'
                height={400}
                className='w-full rounded-md object-cover'
              /> */}
              <p className='text-sm text-gray-600 mt-2 italic'>{article.secondImageCaption}</p>
            </div>

            <p className='mb-4'>{article.paragraphs[article.paragraphs.length - 1]}</p>
          </div>

          {/* Article Footer */}
          <div className='mt-8 pt-4 border-t'>
            <div className='flex flex-wrap justify-between items-center'>
              <div>
                <p className='text-sm text-gray-600'>Tác giả: {article.author}</p>
                <p className='text-sm text-gray-600'>Nguồn tin: {article.source}</p>
                <p className='text-sm text-gray-600'>Thời gian xuất bản: {article.publishDate}</p>
              </div>
              <div className='mt-4 md:mt-0'>
                <p className='text-sm text-gray-600 mb-2'>Chia sẻ với mọi người:</p>
                <div className='flex space-x-2'>
                  <button className='w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center'>
                    <Facebook className='h-4 w-4 text-gray-600' />
                  </button>
                  <button className='w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center'>
                    <Linkedin className='h-4 w-4 text-gray-600' />
                  </button>
                  <button className='w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center'>
                    <Twitter className='h-4 w-4 text-gray-600' />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className='max-w-4xl mx-auto mt-12 mb-16'>
            <h2 className='text-xl font-bold mb-6 pb-2 border-b'>Bài viết khác</h2>
            {anotherArticle.slice(0, visible).map((article, index) => (
              <Link to={'/new/:id'}>
                <div className='space-y-8'>
                  {/* Article 1 */}
                  <div className='flex flex-col md:flex-row gap-4 mb-[30px]'>
                    <div className='relative md:w-1/3 h-48 md:h-auto'>
                      <div className='absolute top-[10px] left-0 bg-gray-800 text-white text-xs font-medium px-2 py-1 z-10 rounded-l-[10px]'>
                        TIN TỨC
                      </div>
                      <CustomImage
                        src={article.image}
                        alt='Các Kênh Dẫn Vốn'
                        width='auto'
                        height={150}
                        className='w-full h-full object-cover rounded-md'
                      />
                    </div>
                    <div className='md:w-2/3 space-y-2'>
                      <div className='text-sm text-gray-500 mb-2'>15/03/2025 07:55 • Nguyễn Nam</div>
                      <h3 className='text-lg font-bold mb-2 hover:text-red-500 transition-colors'>
                        <a href='#'>Các Kênh Dẫn Vốn Đang Tác Động Như Thế Nào Đến Thị Trường Bất Động Sản Việt Nam?</a>
                      </h3>
                      <p className='text-sm text-gray-600 mb-3 line-clamp-3'>
                        Tín dụng ngân hàng và phát hành trái phiếu là 2 trong số nhiều kênh dẫn vốn của thị trường bất
                        động sản Việt Nam. Đây cũng là những nguồn vốn đã tác động mạnh đến quá trình lên xuống, sự
                        thăng trầm của thị trường...
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            {visible < anotherArticle.length && (
              <div className='flex justify-center mt-8'>
                <Button
                  onClick={toggleVisible}
                  className='bg-white text-[#E03C31] hover:bg-[#E03C31] hover:text-white border border-[#E03C31] px-8 py-2 rounded-full transition-colors duration-300'
                >
                  Xem thêm
                </Button>
              </div>
            )}
          </div>
        </article>

        {/* Related Articles */}
        <div className='col-span-4'>
          <div className='border rounded-[8px]'>
            <div className='font-[500] text-lg text-center p-[15px]'>
              <span>Bài viết được xem nhiều nhất</span>
            </div>
            <div className='border border-gray-100 col-span-12 mb-[20px] '></div>
            <div>
              {article.relatedArticles.map((news, index) => (
                <Link to={'/new/:id'}>
                <div className='px-[20px] '>
                  <div className='flex items-center justify-start gap-4'>
                    <div className='rounded-[50%] w-[32px] h-[32px] text-[#E03C31] bg-[#FFECEB] p-[8px] flex items-center justify-center'>
                      <span>{index + 1}</span>
                    </div>
                    <div>{news}</div>
                  </div>
                  <div className='border border-gray-100 my-[20px] '></div>
                </div></Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsArticle;
