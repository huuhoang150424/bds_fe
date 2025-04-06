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
import { useGetNewsDetail } from './hooks/use-get-new-detail';
import { useParams } from 'react-router-dom';
import NewsPopular from '../news/components/news-popular';




function NewsArticle() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, isError } = useGetNewsDetail(slug || '');
  
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading article</div>;
  if (!data) return <div>Article not found</div>;

  // Format date
  const formattedDate = new Date(data?.updatedAt).toLocaleDateString('vi-VN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className='flex flex-col max-w-6xl bg-white pt-[80px] mx-auto'>
      {/* Header Navigation */}
      {/* <header className='sticky top-0 z-10 border-b bg-white'>
        <div className='container mx-auto px-4 py-2 flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <Home className='h-4 w-4 text-gray-600' />
            <span className='text-sm text-gray-600'>Tin tức</span>
            <ChevronRight className='h-3 w-3 text-gray-400' />
            <span className='text-sm text-gray-600 truncate max-w-[200px] md:max-w-md'>
              {data.title}
            </span>
          </div>
          
        </div>
      </header> */}

      <div className='px-4 py-4'>
        <h1 className='text-2xl md:text-3xl font-bold mb-4'>{data?.title}</h1>

        <div className='flex items-center mb-6'>
          <div className='flex items-center text-red-500 mr-4'>
            <div className='w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-2'>
              <Clock className='h-4 w-4 text-red-500' />
            </div>
            <p className='text-xs text-gray-600'>
              Cập nhật lần cuối vào {formattedDate}
            </p>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-12 gap-7 px-4 pb-6'>
        <div className='col-span-8'>
          {/* Xử lý content an toàn */}
          <div 
            className='prose max-w-none' 
            dangerouslySetInnerHTML={{ __html: data?.content || '' }} 
          />
        </div>

        <div className='col-span-4'>
          <NewsPopular />
        </div>
      </div>
    </div>
  );
}

export default NewsArticle;
