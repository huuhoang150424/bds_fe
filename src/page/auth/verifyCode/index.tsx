import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAuthModal } from "@/context/auth-modal";
import Loader from "@/components/common/loading/loader/loading";
import { toast } from "@/hooks/use-toast";
import { VerificationCodeInput } from "./components/verification-code-input";
import { formSchemaVerification, type FormVerifyCode } from "./schemas/verify-code";
import { useVerificationCode } from "./hooks/use-verify-code"; 

function VerificationCode() {
  const { openModal } = useAuthModal();
  const verifyMutation = useVerificationCode(openModal);
  const {isPending}=verifyMutation;
  const form = useForm<FormVerifyCode>({
    resolver: zodResolver(formSchemaVerification),
    defaultValues: { code: "" },
  });

  const onSubmit = (values: z.infer<typeof formSchemaVerification>) => {
    verifyMutation.mutate(values);
  };

  const resendCode = () => {
    toast({ title: "Đã gửi lại mã xác thực", description: "Vui lòng kiểm tra email của bạn" });
  };

  const handleCodeComplete = (code: string) => {
    form.setValue("code", code);
    if (code.length === 4) form.handleSubmit(onSubmit)();
  };

  return (
    <div className="w-[45%] p-8">
      <div className="mb-[15px]">
        <p className="text-gray-600 text-[15px]">Xác thực tài khoản</p>
        <span className="block text-xl font-[600]">Nhập mã xác thực</span>
      </div>
      {isPending || verifyMutation.isPending ? (
        <Loader className="my-[120px]" />
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="text-gray-600 text-[13px] mb-4">
              Vui lòng nhập mã xác thực 4 chữ số đã được gửi đến email của bạn.
            </div>
            <VerificationCodeInput onComplete={handleCodeComplete} />
            {form.formState.errors.code && (
              <p className="text-[#E03C31] text-sm mt-2">{form.formState.errors.code.message}</p>
            )}
            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={verifyMutation.isPending}
                className="w-full bg-[#E03C31] hover:bg-[#FF837A] text-white font-semibold py-[15px] px-[15px] rounded-md mt-[15px]"
              >
                Xác nhận
              </Button>
            </div>
            <div className="flex justify-center text-[14px] text-gray-600 mt-2">
              <p>Chưa nhận được mã?</p>
              <span
                onClick={resendCode}
                className="text-[#E03C31] px-[6px] font-[500] cursor-pointer"
              >
                Gửi lại mã
              </span>
            </div>
            <div className="flex justify-center text-[14px] text-gray-600 mt-[200px]">
              <p>Quay lại</p>
              <span
                onClick={() => openModal("forgotPassword")}
                className="text-[#E03C31] px-[6px] font-[500] cursor-pointer"
              >
                quên mật khẩu
              </span>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}

export default VerificationCode;