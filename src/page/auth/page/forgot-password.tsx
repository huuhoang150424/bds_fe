import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import
{
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthModal } from "@/context/auth-modal";
import Loader from "@/components/common/loading/loader/loading";
import { formSchemaForgotPassword, type FormForgotPassword } from "../schema/forgot-password";
import { useForgotPassword } from "../hook/use-forgot-password";

function ForgotPassword ()
{
  const { openModal,setOtpExpires,setEmail } = useAuthModal();
  const forgotPasswordMutation = useForgotPassword( openModal,setOtpExpires,"SEND" );
  const { isPending } = forgotPasswordMutation;
  const form = useForm<FormForgotPassword>( {
    resolver: zodResolver( formSchemaForgotPassword ),
    defaultValues: { email: "" },
  } );

  const onSubmit = ( values: z.infer<typeof formSchemaForgotPassword> ) => {
    setEmail(values.email);
    forgotPasswordMutation.mutate( values );
  };

  return (
    <div className="w-[45%] p-8">
      <div className="mb-[15px]">
        <p className="text-gray-600 text-[15px]">Xin chào bạn</p>
        <span className="block text-xl font-[600]">Quên mật khẩu</span>
        <div className="text-gray-600 text-[13px] mt-2">
          Vui lòng nhập email đã đăng ký. Chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu đến email của bạn.
        </div>
      </div>
      { isPending ? (
        <Loader className="my-[120px]" />
      ) : (
        <Form { ...form }>
          <form onSubmit={ form.handleSubmit( onSubmit ) }>
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
                disabled={ isPending }
                //onClick={ () => openModal( "verifyCode" ) }
                className="w-full bg-[#E03C31] hover:bg-[#FF837A] text-white font-semibold py-[15px] px-[15px] rounded-md mt-[15px]"
              >
                Gửi yêu cầu
              </Button>
            </div>
            <div className="flex justify-center text-[14px] text-gray-600 mt-[200px]">
              <p>Đã nhớ mật khẩu?</p>
              <span
                onClick={ () => openModal( "login" ) }
                className="text-[#E03C31] px-[6px] font-[500] cursor-pointer"
              >
                Đăng nhập
              </span>
              <p>tại đây</p>
            </div>
          </form>
        </Form>
      ) }
    </div>
  );
}

export default ForgotPassword;