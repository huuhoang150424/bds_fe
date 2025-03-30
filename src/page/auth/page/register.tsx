import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FcGoogle } from 'react-icons/fc';
import formSchema, { FormRegister } from '../schema/schema-register';
import { useAuthModal } from '@/context/auth-modal';
import Loader from '@/components/common/loading/loader/loading';
import { useMutation } from '@tanstack/react-query';
import { register } from '@/page/auth/service/register';
import { toast } from '@/hooks/use-toast';


function RegisterScreen ()
{
  const { openModal } = useAuthModal();
  const form = useForm<FormRegister>( {
    resolver: zodResolver( formSchema ),
    defaultValues: {
      email: '',
      fullname: '',
      password: '',
      confirmPassword: '',
    },
  } );
  const mutation = useMutation( {
    mutationFn: register,
    onSuccess: ( data ) =>
    {
      toast( {
        variant: 'success',
        title: data.message
      } )
      openModal( 'login' );
    },
    onError: ( error ) =>
    {
      console.log( "Lỗi khi đăng ký", error );
    }
  } );

  const { isPending } = mutation;

  function onSubmit ( values: FormRegister )
  {
    mutation.mutate( values );
  }

  return (
    <div className='w-[45%] p-8'>
      <div className="">
        <div className='mb-[15px]'>
          <p className='text-gray-600 text-[15px]'>Xin chào bạn</p>
          <span className='block text-xl font-[600]'>Đăng ký tài khoản mới</span>
        </div>
        <div className='bg-[#fff]  rounded-[10px] mb-[15px] flex justify-center border-[1px]'>
          <a href='#' className='flex items-center space-x-4 p-[10px]  '>
            <FcGoogle className='text-2xl' />
            <p className=' text-[14px]'>Đăng nhập bằng Google</p>
          </a>
        </div>
        <div className='flex p-[5px] align-center justify-center space-x-4 relative '>
          <div className='w-full h-[1px] bg-gray-200'></div>
          <div className='bg-[#fff] text-gray-400 absolute top-[-15px] left-[50%-30px] w-[49px] px-[4px] py-[8px]'>
            Hoặc
          </div>
        </div>
        {
          isPending ? ( <Loader className='my-[170px] ' /> ) : (
            <Form { ...form }>
              <form onSubmit={ form.handleSubmit( onSubmit ) } className='space-y-4'>
                <FormField
                  control={ form.control }
                  name='email'
                  render={ ( { field } ) => (
                    <FormItem>
                      <FormLabel className='text-gray-700 font-medium'>Email</FormLabel>
                      <FormControl>
                        <Input
                          type='email'
                          placeholder='Nhập email'
                          { ...field }
                          className='w-full border p-[10px] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  ) }
                />
                <FormField
                  control={ form.control }
                  name='fullname'
                  render={ ( { field } ) => (
                    <FormItem>
                      <FormLabel className='text-gray-700 font-medium'>Họ và tên</FormLabel>
                      <FormControl>
                        <Input
                          type='text'
                          placeholder='Nhập họ và tên'
                          { ...field }
                          className='w-full border p-[10px] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  ) }
                />
                <FormField
                  control={ form.control }
                  name='password'
                  render={ ( { field } ) => (
                    <FormItem>
                      <FormLabel className='text-gray-700 font-medium'>Mật khẩu</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='Nhập mật khẩu'
                          { ...field }
                          className='w-full border p-[10px] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  ) }
                />
                <FormField
                  control={ form.control }
                  name='confirmPassword'
                  render={ ( { field } ) => (
                    <FormItem>
                      <FormLabel className='text-gray-700 font-medium'>Xác nhận mật khẩu</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='Nhập lại mật khẩu'
                          { ...field }
                          className='w-full border p-[10px] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  ) }
                />
                <div className='flex flex-col gap-[20px] justify-center'>
                  <Button
                    type='submit'
                    disabled={ isPending }
                    className='w-full bg-[#E03C31] hover:bg-[#FF837A] text-white font-semibold py-[15px] px-[15px] rounded-md'
                  >
                    Đăng Ký
                  </Button>
                  <div className="flex items-center mx-auto gap-[5px] ">
                    <h4 className="text-[15px] ">Bạn đã có tài khoản ?</h4> <span onClick={ () => openModal( 'login' ) } className="text-[16px] font-[500] text-[#E03C31] cursor-pointer">Đăng nhập</span>
                  </div>
                </div>
              </form>
            </Form> )
        }
      </div>
    </div>
  );
}

export default RegisterScreen;
