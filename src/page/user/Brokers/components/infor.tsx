import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, Search, ChevronRight, ChevronLeft } from 'lucide-react';
import { CustomImage } from '@/components/common';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Label } from 'recharts';
import formSendEmail from '@/page/user/Brokers/schema';
import { z } from 'zod';
import { agents, recommendedProperties } from '@/constant/const-brokers';
import { Item } from '@radix-ui/react-dropdown-menu';
import { CardContent } from '@/components/ui/card';

function Infor() {
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  // Calculate the current page's data
  const indexOfLastAgent = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstAgent = indexOfLastAgent - ITEMS_PER_PAGE;
  const currentAgents = agents.slice(indexOfFirstAgent, indexOfLastAgent);
  const totalPages = Math.ceil(agents.length / ITEMS_PER_PAGE);

  function onSubmit(values: z.infer<typeof formSendEmail>) {
    console.log(values);
  }
  const form = useForm<z.infer<typeof formSendEmail>>({
    resolver: zodResolver(formSendEmail),
    defaultValues: {
      title: '',
      name: '',
      email: '',
      content: '',
    },
  });

  return (
    <div>
      {currentAgents.map((agent) => (
        <div key={agent.id} className='border rounded-md mb-4 p-4 shadow-sm hover:shadow-lg'>
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='flex-shrink-0'>
              <CustomImage
                src={agent.avatar || '/placeholder.svg'}
                alt={agent.name}
                width={100}
                height={120}
                className='rounded-md object-cover'
              />
            </div>
            <div className='flex-grow '>
              <h3 className='text-lg font-bold text-red-600'>{agent.name}</h3>
              <p className='text-sm text-gray-500'>{agent.position}</p>
              <div className='flex items-center mt-1 text-sm'>
                <Phone className='h-4 w-4 mr-1 text-gray-500' />
                <span>{agent.phone}</span>
              </div>
              <div className='mt-[5px]'>
                <Dialog>
                  <DialogTrigger>
                    <Button variant='outline' className='text-white bg-[#E03C31] hover:bg-[#FF837A]'>
                      Gửi Email
                    </Button>
                  </DialogTrigger>
                  <DialogContent className=' py-[10\px] max-w-sm h-[500px] '>
                    <div>
                      <h2 className='text-lg font-medium text-center'>Liên hệ với nhà môi giới</h2>
                      <div className='border border-gray-200 my-[10px]'></div>
                      {/* <p className='text-center text-sm'>
                                Vui lòng xác nhận các thông tin chi tiết sau để chúng tôi phục vụ bạn tốt nhất.
                              </p> */}
                      <div className='mt-4'>
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
                            <FormField
                              control={form.control}
                              name='title'
                              render={({ field }) => (
                                <FormItem className='space-y-1'>
                                  <FormLabel className='text-black'>Tiêu đề</FormLabel>
                                  <FormControl>
                                    <Input className='p-[4px]' placeholder='Tiêu đề' {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name='name'
                              render={({ field }) => (
                                <FormItem className='space-y-1'>
                                  <FormLabel className='text-black'>Họ và tên</FormLabel>
                                  <FormControl>
                                    <Input className='p-[4px]' placeholder='Họ và tên' {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name='email'
                              render={({ field }) => (
                                <FormItem className='space-y-1'>
                                  <FormLabel className='text-black'>Email</FormLabel>
                                  <FormControl>
                                    <Input className='p-[4px]' placeholder='Email' type='email' {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name='content'
                              render={({ field }) => (
                                <FormItem className='space-y-1'>
                                  <FormLabel className='text-black'>Nội dung</FormLabel>
                                  <FormControl>
                                    <textarea
                                      placeholder='Nội dung'
                                      {...field}
                                      className='w-full border rounded p-1 h-[45px]'
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button className='mt-4 w-full bg-[#E03C31] hover:bg-[#FF837A]' type='submit'>
                              Submit
                            </Button>
                          </form>
                        </Form>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className='flex-grow'>
              <h4 className='font-bold text-sm mb-2'>KHU VỰC VÀ NHẬN ĐỊNH HỖ TRỢ</h4>
              <ul className='text-sm space-y-1'>
                {agent.areas.map((area, index) => (
                  <li key={index} className='flex items-start'>
                    <ChevronRight className='h-4 w-4 mr-1 text-red-600 flex-shrink-0 mt-0.5' />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
      <Pagination className='mt-6 grid place-items-center'>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href='#'
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(Math.max(1, currentPage - 1));
                        }}
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          className={
                            currentPage === page
                              ? 'bg-[#E03C31] hover:bg-[#FF837A] text-white font-bold'
                              : 'bg-g[#fff] text-black'
                          }
                          href='#'
                          isActive={currentPage === page}
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(page);
                          }}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        href='#'
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(Math.min(totalPages, currentPage + 1));
                        }}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
    </div>
  );
}

export default Infor;
