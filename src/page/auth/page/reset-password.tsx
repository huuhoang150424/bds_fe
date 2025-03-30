
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
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { formSchemaResetPassword, type FormResetPassword } from "../schema/reset-password";
import { useResetPassword } from "../hook/use-reset-password";

function ResetPassword ()
{
  const { openModal } = useAuthModal();
  const resetPasswordMutation = useResetPassword( openModal );
  const [ showPassword, setShowPassword ] = useState( false );
  const [ showConfirmPassword, setShowConfirmPassword ] = useState( false );

  const {isPending}=resetPasswordMutation;

  const form = useForm<FormResetPassword>( {
    resolver: zodResolver( formSchemaResetPassword ),
    defaultValues: { password: "", confirmPassword: "" },
  } );

  const onSubmit = ( values: FormResetPassword ) =>
  {
    resetPasswordMutation.mutate( values );
  };

  return (
    <div className="w-[45%] p-8">
      <div className="mb-[15px]">
        <p className="text-gray-600 text-[15px]">Đặt lại mật khẩu</p>
        <span className="block text-xl font-[600]">Tạo mật khẩu mới</span>
      </div>
      { resetPasswordMutation.isPending ? (
        <Loader className="my-[120px]" />
      ) : (
        <Form { ...form }>
          <form onSubmit={ form.handleSubmit( onSubmit ) } >
            <div className="text-gray-600 text-[13px] mb-4">
              Vui lòng nhập mật khẩu mới cho tài khoản của bạn.
            </div>

            <div className="flex flex-col gap-[15px] ">
              <FormField
                control={ form.control }
                name="password"
                render={ ( { field } ) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Mật khẩu mới</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={ showPassword ? "text" : "password" }
                          placeholder="Nhập mật khẩu mới"
                          { ...field }
                          className="w-full border p-[10px] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 flex items-center pr-3"
                          onClick={ () => setShowPassword( !showPassword ) }
                        >
                          { showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-500" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-500" />
                          ) }
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                ) }
              />
              <FormField
                control={ form.control }
                name="confirmPassword"
                render={ ( { field } ) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Nhập lại mật khẩu mới</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={ showConfirmPassword ? "text" : "password" }
                          placeholder="Nhập lại mật khẩu mới"
                          { ...field }
                          className="w-full border p-[10px] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 flex items-center pr-3"
                          onClick={ () => setShowConfirmPassword( !showConfirmPassword ) }
                        >
                          { showConfirmPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-500" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-500" />
                          ) }
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                ) }
              />
            </div>


            <div className="flex justify-center mt-[100px]">
              <Button
                //type="submit"
                disabled={ isPending }
                className="w-full bg-[#E03C31] hover:bg-[#FF837A] text-white font-semibold py-[15px] px-[15px] rounded-md mt-[15px]"
              >
                Đặt lại mật khẩu
              </Button>
            </div>

            <div className="flex justify-center text-[14px] text-gray-600 mt-2">
              <p>Quay lại</p>
              <span
                onClick={ () => openModal( "login" ) }
                className="text-[#E03C31] px-[6px] font-[500] cursor-pointer"
              >
                đăng nhập
              </span>
            </div>
          </form>
        </Form>
      ) }
    </div>
  );
}

export default ResetPassword;