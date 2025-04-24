import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FcGoogle } from 'react-icons/fc';
import formSchemaLogin from '../schema/schema-login';
import { useAuthModal } from '@/context/auth-modal';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { selectError, selectLoading, selectMessage, selectSuccess } from '@/redux/authReducer';
import Loader from '@/components/common/loading/loader/loading';
import { loginAuth } from '@/redux/action/auth';
import { useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import LoginGoogle from './login-google';




function LoginScreen() {
  const { closeModal, openModal} = useAuthModal();
  const loading=useSelector(selectLoading);
  const message=useSelector(selectMessage);
  const error=useSelector(selectError);
  const success=useSelector(selectSuccess);
  const dispatch = useDispatch<AppDispatch>();
  const form = useForm<z.infer<typeof formSchemaLogin>>({
    resolver: zodResolver(formSchemaLogin),
    defaultValues: {
      email: '',
      password: '',
    },
  });


  useEffect(()=>{
    if (error) {
      toast({
        variant: 'destructive',
        title: message
      });
    }
    else if (success) {
      toast({
        variant: 'success',
        title: message
      });
      closeModal();
    }

  },[message,error,success])


  function onSubmit(values: z.infer<typeof formSchemaLogin>) {
    dispatch(loginAuth(values));
  }
  return (
    <div className='w-[45%] p-8'>
      <div className='mb-[15px]'>
        <p className='text-gray-600 text-[15px]'>Xin chào bạn</p>
        <span className='block text-xl font-[600]'>Đăng nhập tài khoản</span>
      </div>
      {
        loading ?<Loader className='my-[120px] '/> :(<Form {...form}>
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
                <span onClick={()=>openModal('forgotPassword')} className='hover:underline cursor-pointer'>
                  Quên mật khẩu?
                </span>
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
              <LoginGoogle/>
            </div>
            <div className='flex justify-center text-[14px] text-gray-600 '>
              <p className=''>Bạn chưa có tài khoản?</p>
              <span onClick={()=>openModal('register')} className='text-[#E03C31] px-[6px] font-[500] cursor-pointer '>
                Đăng kí
              </span>
              <p> tại đây</p>
            </div>
          </form>
        </Form>)
      }
    </div>
  );
}

export default LoginScreen;
