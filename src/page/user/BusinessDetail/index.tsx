import useScrollToTopOnMount from '@/hooks/use-scroll-top';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building, Calendar, Heart, Home, Mail, MapPin, MessageSquare, Phone, User, Users, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
function BusinessDetail() {
  useScrollToTopOnMount();
  const [activeTab, setActiveTab] = useState('listings');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='min-h-screen bg-gray-50'>
      <section className='relative'>
        <div className='h-[250px] w-full relative '>
          <div
            className='absolute inset-0 p-[12px] '
          >
            <img
              src='https://cdn.pixabay.com/photo/2016/12/15/23/22/lake-1910263_1280.jpg'
              alt='Real Estate Banner'
              className=' object-cover w-full h-full rounded-[8px] '
            />

          </div>
          <motion.div
            className='absolute z-[50] -bottom-20 left-6 md:left-10 rounded-full border-4 border-white shadow-xl bg-white'
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Avatar className='h-32 w-32 md:h-40 md:w-40'>
              <AvatarImage className='object-cover ' src='https://i.pinimg.com/736x/d4/ff/27/d4ff2709fb7e1936ac4ddd1208ea889e.jpg' alt='Michael Chen' />
            </Avatar>
          </motion.div>
        </div>

        <div className='container relative'>


          <div className=' md:pl-56 md:pr-14 pt-4 pb-6 flex flex-col md:flex-row md:items-center justify-between'>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className='text-2xl md:text-3xl font-bold'>Ngọc Hân</h1>
              <p className='text-gray-600 mt-[5px] '>Môi giới chuyên về nhà đất</p>
              <div className='flex items-center mt-2 text-sm'>
                <Badge className='bg-red-500 hover:bg-red-600 mr-2'>Chuyên nghiệp</Badge>
                <div className='flex items-center text-yellow-500'>
                  <Star className='h-4 w-4 fill-current' />
                  <Star className='h-4 w-4 fill-current' />
                  <Star className='h-4 w-4 fill-current' />
                  <Star className='h-4 w-4 fill-current' />
                  <Star className='h-4 w-4 fill-current' />
                  <span className='ml-1 text-gray-700'>5.0 (128 Đánh giá)</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className='flex gap-2 mt-4 md:mt-0'
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button className='bg-red-500 hover:bg-red-600'>
                <MessageSquare className='mr-1 h-4 w-4' /> Nhắn tin
              </Button>
              <Button variant='outline' className='border-red-500 text-red-500 hover:bg-red-50'>
                <Calendar className='mr-1 h-4 w-4' /> Đặt lịch hẹn
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <div className='px-[60px] py-2 mt-2'>
        <div className='grid grid-cols-12 gap-6'>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className='col-span-3'
          >
            <Card className=' border border-gray-200 rounded-[8px] p-4 '>
              <CardHeader className='p-0 mt-[5px] '>
                <CardTitle className='text-[17px] font-[600] text-gray-600 '>Thông tin chi tiết</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4 p-0 mt-4 '>
                <div className='flex items-center gap-3'>
                  <User className='h-5 w-5 text-red-500 mt-0.5' />
                  <div>
                    <p className='font-[500] text-[16px] '>Ngọc Hân</p>
                    <p className='text-sm text-gray-500'>10+ Kinh nghiệm trong nghề</p>
                  </div>
                </div>

                <div className='flex items-center gap-3'>
                  <Building className='h-5 w-5 text-red-500 mt-0.5' />
                  <div>
                    <p className='font-[500] text-[16px] '>Kinh nghiệm chính</p>
                    <p className='text-sm text-gray-500'>Chung cư,đất thổ cư</p>
                  </div>
                </div>

                <div className='flex items-center gap-3'>
                  <MapPin className='h-5 w-5 text-red-500 mt-0.5' />
                  <div>
                    <p className='font-[500] text-[16px] '>Địa chỉ chính</p>
                    <p className='text-sm text-gray-500'>Xóm phú tiến , xã Đong Hiếu ,thị xã Thái Hòa</p>
                  </div>
                </div>

                <div className='flex items-center gap-3'>
                  <Mail className='h-5 w-5 text-red-500 mt-0.5' />
                  <div>
                    <p className='font-[500] text-[16px] '>nguyenhoanghuu15042...</p>
                  </div>
                </div>

                <div className='flex items-center gap-3'>
                  <Phone className='h-5 w-5 text-red-500 mt-0.5' />
                  <div>
                    <p className='font-[500] text-[16px] '>0349938737</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className='mt-6 border border-gray-200 rounded-[8px] p-4'>
              <CardHeader className='p-0 '>
                <CardTitle>Chuyên môn</CardTitle>
              </CardHeader>
              <CardContent className='p-0 mt-4'>
                <div className='flex flex-wrap gap-2'>
                  <Badge className='bg-red-100 text-red-500 hover:bg-red-200'>Chung cư</Badge>
                  <Badge className='bg-red-100 text-red-500 hover:bg-red-200'>Nhà mặt đất</Badge>
                  <Badge className='bg-red-100 text-red-500 hover:bg-red-200'>Bar club</Badge>
                  <Badge className='bg-red-100 text-red-500 hover:bg-red-200'>Thuyền trưởng</Badge>
                  <Badge className='bg-red-100 text-red-500 hover:bg-red-200'>Lùa gà</Badge>
                  <Badge className='bg-red-100 text-red-500 hover:bg-red-200'>Cò đất 20 năm</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className='mt-6 mb-[50px]  border border-gray-200 rounded-[8px] p-4'>
              <CardHeader className='p-0'>
                <CardTitle>Người dùng gần đây</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4 p-0 mt-4'>
                {[1, 2, 3].map((item) => (
                  <div key={item} className='flex items-center gap-3'>
                    <div className='relative'>
                      <Avatar className='h-10 w-10'>
                        <AvatarImage className='object-cover border border-gray-200 ' src={`https://i.pinimg.com/736x/c9/96/bd/c996bd02bbc54717f17d0220c0385fd5.jpg`} />
                        <AvatarFallback className='bg-red-100 text-red-500'>U{item}</AvatarFallback>
                      </Avatar>
                      <span className='absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500' />
                    </div>
                    <div>
                      <p className='font-[500] text-[16px] '>Ngọc Lan</p>
                      <p className='text-xs text-gray-500'>{item * 2} hours ago</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className='col-span-9'
          >
            <Tabs defaultValue='listings' className='w-full' onValueChange={setActiveTab}>
              <TabsList className='grid w-full grid-cols-3 border border-gray-200 bg-transparent  '>
                <TabsTrigger value='listings' className='data-[state=active]:bg-red-500 data-[state=active]:text-white'>
                  Dự án của Ngọc Hân
                </TabsTrigger>
                <TabsTrigger value='sold' className='data-[state=active]:bg-red-500 data-[state=active]:text-white'>
                  Dự án đã bàn giao
                </TabsTrigger>
                <TabsTrigger value='reviews' className='data-[state=active]:bg-red-500 data-[state=active]:text-white'>
                  Đánh giá của khách hàng
                </TabsTrigger>
              </TabsList>
              <TabsContent value='listings' className='mt-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

                </div>
              </TabsContent>
              <TabsContent value='sold' className='mt-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

                </div>
              </TabsContent>
              <TabsContent value='reviews' className='mt-6'>
                {/* <Card>
                  <CardContent className='pt-6'>
                    <div className='space-y-6'>
                      {[1, 2, 3].map((item) => (
                        <div key={item} className='pb-6 border-b last:border-0'>
                          <div className='flex justify-between items-start'>
                            <div className='flex items-center gap-3'>
                              <Avatar>
                                <AvatarImage src={`/placeholder.svg?height=40&width=40&text=C${item}`} />
                                <AvatarFallback className='bg-red-100 text-red-500'>C{item}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className='font-medium'>Client {item}</p>
                                <div className='flex text-yellow-500'>
                                  {Array(5)
                                    .fill(0)
                                    .map((_, i) => (
                                      <Star key={i} className='h-4 w-4 fill-current' />
                                    ))}
                                </div>
                              </div>
                            </div>
                            <p className='text-sm text-gray-500'>{item * 3} days ago</p>
                          </div>
                          <p className='mt-3'>
                            Michael was exceptional in helping us find our dream home. His knowledge of the market and
                            negotiation skills saved us thousands. Highly recommended!
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card> */}
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default BusinessDetail;

