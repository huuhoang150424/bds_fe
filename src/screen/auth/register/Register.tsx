import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from 'react-icons/fc';


const formSchema = z
  .object({
    email: z.string().email({ message: 'Email không hợp lệ' }),
    fullName: z.string().min(1, { message: 'Tên ít nhất 1 ký tự' }),
    passWord: z.string().min(6, { message: 'Mật khẩu ít nhất 6 ký tự' }),
    confirmPassword: z.string().min(6, { message: 'Mật khẩu ít nhất 6 ký tự' }),
  })
  .refine((data) => data.passWord === data.confirmPassword, {
    message: 'Mật khẩu không khớp',
    path: ['confirmPassword'],
  });

function Register() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      fullName: '',
      passWord: '',
      confirmPassword: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger>
      <Button variant="outline">Share</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-[0px] m-[0px] ">
      <div className='flex items-center justify-center min-h-[calc(100vh-30px)] max-h-[calc(100vh-30px)] bg-[#fff] rounded-[15px]'>
      <Card className=' w-full max-w-4xl flex bg-[#fff] shadow-md rounded-[15px] overflow-hidden min-h-[calc(100vh-30px)] max-h-[calc(100vh-30px)]'>
        <div className='bg-[url(/public/register2.jpg)] bg-cover bg-no-repeat bg-center w-1/2 p-8 hidden md:block '></div> {/* Phần trống bên trái */}
        <div className='w-full md:w-1/2 p-8'>
          <div className='mb-[15px]'>
            <p className='text-gray-600 text-[20px]'>Xin chào bạn</p>
            <span className='block text-xl font-bold'>Đăng ký tài khoản mới</span>
          </div>
          <div className='bg-[#fff]  rounded-[20px] mb-[15px]'>
            <a href='#' className='flex items-center space-x-4 p-[10px] bg-[#E9F1FF] rounded-[10px] '>
              <FcGoogle className="text-2xl" />
              <p className='text-[#4285F4] '>Đăng nhập bằng Google</p>
            </a>
          </div>
          <div>
          <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-700 font-medium'>Email</FormLabel>
                    <FormControl>
                      <Input type='email' placeholder='Nhập email' {...field} className='w-full border p-[10px] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='fullName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-700 font-medium'>Họ và tên</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder='Nhập họ và tên' {...field} className='w-full border p-[10px] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='passWord'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-700 font-medium'>Mật khẩu</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder='Nhập mật khẩu' {...field} className='w-full border p-[10px] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-700 font-medium'>Xác nhận mật khẩu</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder='Nhập lại mật khẩu' {...field} className='w-full border p-[10px] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex justify-center'>
                <Button type='submit' className='w-[40%] bg-blue-500 hover:bg-blue-600 text-white font-semibold py-[15px] px-[15px] rounded-md'>
                  Đăng Ký
                </Button>
              </div>
            </form>
          </Form>
          </div>
          
        </div>
      </Card>
    </div>
      </DialogContent>
    </Dialog>
  );
}

export default Register;
