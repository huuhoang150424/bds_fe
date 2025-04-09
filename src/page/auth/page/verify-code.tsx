import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAuthModal } from "@/context/auth-modal";
import Loader from "@/components/common/loading/loader/loading";
import { toast } from "@/hooks/use-toast";
import { VerificationCodeInput } from "./verification-code-input";
import { formSchemaVerification, type FormVerifyCode } from "../schema/verify-code";
import { useVerificationCode } from "../hook/use-verify-code";
import { useForgotPassword } from "../hook/use-forgot-password";
import { useEffect, useState } from "react";

function VerificationCode (){
  const { openModal, otpExpires, email } = useAuthModal();
  const [ timeLeft, setTimeLeft ] = useState<string>( '' );
  const verifyMutation = useVerificationCode();
  const forgotPasswordMutation = useForgotPassword();
  const { isPending } = verifyMutation;
  console.log(otpExpires)
  const calculateTimeLeft = () =>{
    if ( !otpExpires ) return '00:00';

    const now = new Date().getTime();
    const expires = new Date( otpExpires ).getTime();
    const diff = expires - now;

    if ( diff <= 0 ) return '00:00';

    const minutes = Math.floor( diff / ( 1000 * 60 ) );
    const seconds = Math.floor( ( diff % ( 1000 * 60 ) ) / 1000 );
    return `${ minutes.toString().padStart( 2, '0' ) }:${ seconds.toString().padStart( 2, '0' ) }`;
  };

  useEffect( () => {
    if ( !otpExpires ) return;

    setTimeLeft( calculateTimeLeft() );
    const timer = setInterval( () =>
    {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft( newTimeLeft );

      if ( newTimeLeft === '00:00' )
      {
        toast( {
          variant: 'destructive',
          title: 'Mã đã hết hạn',
          description: 'Vui lòng yêu cầu mã mới',
        } );
        clearInterval( timer );
      }
    }, 1000 );
    return () => clearInterval( timer );
  }, [ otpExpires ] );


  const form = useForm<FormVerifyCode>( {
    resolver: zodResolver( formSchemaVerification ),
    defaultValues: { otpCode: "" },
  } );

  const onSubmit = ( values: z.infer<typeof formSchemaVerification> ) =>{
    if ( timeLeft === '00:00' )
    {
      toast( {
        variant: 'destructive',
        title: 'Mã đã hết hạn',
        description: 'Vui lòng yêu cầu mã mới',
      } );
      return;
    }
    verifyMutation.mutate({ email, otpCode: values.otpCode });
  };

  const resendCode = () => {
    toast( { title: "Đã gửi lại mã xác thực", description: "Vui lòng kiểm tra email của bạn" } );
    forgotPasswordMutation.mutate( { email } )
  };

  const handleCodeComplete = ( code: string ) => {
    form.setValue( "otpCode", code );
    if ( code.length === 4 ) form.handleSubmit( onSubmit )();
  };

  return (
    <div className="w-[45%] p-8">
      <div className="mb-[15px]">
        <p className="text-gray-600 text-[15px]">Xác thực tài khoản</p>
        <span className="block text-xl font-[600]">Nhập mã xác thực</span>
      </div>
      { isPending || verifyMutation.isPending ? (
        <Loader className="my-[120px]" />
      ) : (
        <Form { ...form }>
          <form onSubmit={ form.handleSubmit( onSubmit ) }>
            <div className="text-gray-600 text-[13px] mb-4">
              <p>
                Nhập mã xác thực đã gửi đến <strong>{ email }</strong>.
                { otpExpires && (
                  <span>
                    { ' ' }Thời gian còn lại: <strong>{ timeLeft }</strong>
                  </span>
                ) }
              </p>
            </div>
            <VerificationCodeInput onComplete={ handleCodeComplete } />
            { form.formState.errors.otpCode && (
              <p className="text-[#E03C31] text-sm mt-2">{ form.formState.errors.otpCode.message }</p>
            ) }
            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={ isPending }
                //onClick={ () => openModal( "resetPassword" ) }
                className="w-full bg-[#E03C31] hover:bg-[#FF837A] text-white font-semibold py-[15px] px-[15px] rounded-md mt-[15px]"
              >
                Xác nhận
              </Button>
            </div>
            {
              timeLeft === '00:00' && (
                <div className="flex justify-center text-[14px] text-gray-600 mt-2">
                  <p>Chưa nhận được mã?</p>
                  <span
                    onClick={ resendCode }
                    className="text-[#E03C31] px-[6px] font-[500] cursor-pointer"
                  >
                    Gửi lại mã
                  </span>
                </div>
              )
            }

            <div className="flex justify-center text-[14px] text-gray-600 mt-[200px]">
              <p>Quay lại</p>
              <span
                onClick={ () => openModal( "forgotPassword" ) }
                className="text-[#E03C31] px-[6px] font-[500] cursor-pointer"
              >
                quên mật khẩu
              </span>
            </div>
          </form>
        </Form>
      ) }
    </div>
  );
}

export default VerificationCode;