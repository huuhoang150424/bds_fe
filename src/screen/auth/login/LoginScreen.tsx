import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { FcGoogle } from 'react-icons/fc';
import formSchemaLogin from './schema/schema-login';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'react-router-dom';
function LoginScreen() {
  const form = useForm<z.infer<typeof formSchemaLogin>>({
    resolver: zodResolver(formSchemaLogin),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchemaLogin>) {
    console.log(values);
  }
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button variant='outline'>Share</Button>
        </DialogTrigger>
        <DialogContent className='max-w-4xl p-[0px] m-[0px] '>
          <div className='flex items-center justify-center min-h-[calc(100vh-30px)] max-h-[calc(100vh-30px)] bg-[#fff] rounded-[15px]'>
            <Card className=' w-full max-w-4xl flex bg-[#fff] shadow-md rounded-[15px] overflow-hidden min-h-[calc(100vh-30px)] max-h-[calc(100vh-30px)]'>
              <div className='bg-[url(/public/register2.jpg)] bg-cover bg-no-repeat bg-center w-1/2 p-8 hidden md:block '></div>{' '}
              {/* Phần trống bên trái */}
              <div className='w-full md:w-1/2 p-8'>
                <div className='mb-[15px]'>
                  <p className='text-gray-600 text-[15px]'>Xin chào bạn</p>
                  <span className='block text-xl font-[600]'>Đăng nhập tài khoản</span>
                </div>

                <div>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                      <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-gray-700 font-medium'>Email</FormLabel>
                            <FormControl>
                              <Input
                                type='email'
                                placeholder='Nhập email'
                                {...field}
                                className='w-full border p-[10px] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-gray-700 font-medium '>Mật khẩu</FormLabel>
                            <FormControl>
                              <div className="flex items-center w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <Input
                                  type='password'
                                  placeholder='Nhập mật khẩu'
                                  {...field}
                                  className='w-full border p-[10px] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                />
                                {/* <AiOutlineEye className="text-gray-500 mr-[5px] " /> */}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className=' flex justify-between text-[#E03C31] text-[12px] '>
                        <div className='flex items-center space-x-2 '>
                          <input
                            type='checkbox'
                            id='customCheck'
                            className='w-[12px] h-[12px] text-blue-500 rounded-md border-gray-300 '
                          />
                          <label htmlFor='customCheck' className='text-gray-800 text-[12px] '>
                            Nhớ mật khẩu
                          </label>
                        </div>
                        <div>
                          <a href='#' className='hover:underline'>
                            Quên mật khẩu?
                          </a>
                        </div>
                      </div>
                      <div className='flex justify-center'>
                        <Button
                          type='submit'
                          className='w-full bg-[#E03C31] hover:bg-[#FF837A] text-white font-semibold py-[15px] px-[15px] rounded-md mt-[15px]'
                        >
                          Đăng Nhập
                        </Button>
                      </div>
                      <div className='flex p-[15px] align-center justify-center space-x-4 relative '>
                        <div className='w-full h-[1px] bg-gray-200'></div>
                        <div className='bg-[#fff] text-gray-400 absolute top-[-5px] left-[50%-30px] w-[49px] px-[4px] py-[8px]'>
                          Hoặc
                        </div>
                      </div>
                      <div className='bg-[#fff]  rounded-[10px] mb-[15px] flex justify-center border-[1px]'>
                        <a href='#' className='flex items-center space-x-4 p-[10px]  '>
                          <FcGoogle className='text-2xl' />
                          <p className='text-[14px]'>Đăng nhập bằng Google</p>
                        </a>
                      </div>
                      <div className='flex justify-center text-[14px] text-gray-600 '>
                        <p className=''>Bạn chưa có tài khoản?</p>
                        <a href='#' className='text-[#E03C31] px-[3px]'>
                          Đăng kí
                        </a>
                        <p> tại đây</p>
                      </div>
                    </form>
                  </Form>
                </div>
              </div>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default LoginScreen;
