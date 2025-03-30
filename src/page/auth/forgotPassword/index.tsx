import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthModal } from "@/context/auth-modal";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import { selectError, selectLoading, selectMessage } from "@/redux/authReducer";
import Loader from "@/components/common/loading/loader/loading";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";

// Zod schema for forgot password form
const formSchemaForgotPassword = z.object( {
  email: z.string().email( "Email không hợp lệ" ),
} )

function ForgotPassword ()
{
  const { closeModal, openModal } = useAuthModal()
  const loading = useSelector( selectLoading )
  const message = useSelector( selectMessage )
  const error = useSelector( selectError )
  const dispatch = useDispatch<AppDispatch>()

  const form = useForm<z.infer<typeof formSchemaForgotPassword>>( {
    resolver: zodResolver( formSchemaForgotPassword ),
    defaultValues: {
      email: "",
    },
  } )

  useEffect( () =>
  {
    if ( error )
    {
      toast( {
        variant: "destructive",
        title: message,
      } )
    }
  }, [ message, error ] )

  function onSubmit ( values: z.infer<typeof formSchemaForgotPassword> )
  {
    ;
    console.log( "Forgot password request for:", values.email )
    toast( {
      title: "Yêu cầu đặt lại mật khẩu đã được gửi",
      description: "Vui lòng kiểm tra email của bạn để tiếp tục",
    } )
    closeModal()
  }

  return (
    <div className="w-[45%] p-8">
      <div className="mb-[15px]">
        <p className="text-gray-600 text-[15px]">Xin chào bạn</p>
        <span className="block text-xl font-[600]">Quên mật khẩu</span>
        <div className="text-gray-600 text-[13px] mt-2">
          Vui lòng nhập email đã đăng ký. Chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu đến email của bạn.
        </div>
      </div>
      { loading ? (
        <Loader className="my-[120px] " />
      ) : (
        <Form { ...form }>
          <form onSubmit={ form.handleSubmit( onSubmit ) } className="">
            <FormField
              control={ form.control }
              name="email"
              render={ ( { field } ) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Nhập email"
                      { ...field }
                      className="w-full border p-[10px] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ) }
            />
            <div className="flex justify-center">
              <Button
                type="submit"
                className="w-full bg-[#E03C31] hover:bg-[#FF837A] text-white font-semibold py-[15px] px-[15px] rounded-md mt-[15px]"
              >
                Gửi yêu cầu
              </Button>
            </div>
            <div className="flex justify-center text-[14px] text-gray-600 mt-[200px] ">
              <p className="">Đã nhớ mật khẩu?</p>
              <span onClick={ () => openModal( "login" ) } className="text-[#E03C31] px-[6px] font-[500] cursor-pointer">
                Đăng nhập
              </span>
              <p> tại đây</p>
            </div>
          </form>
        </Form>
      ) }
    </div>
  )
}

export default ForgotPassword;

