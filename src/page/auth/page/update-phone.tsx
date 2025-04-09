import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthModal } from "@/context/auth-modal";
import {  useSelector } from "react-redux";
import { selectUser } from "@/redux/authReducer";
import Loader from "@/components/common/loading/loader/loading";
import { useState } from "react";
import { Phone, Info } from "lucide-react";
import { formSchemaPhone, type FormUpdatePhone } from "../schema/update-phone";
import { useUpdatePhone } from "../hook/use-update-phone";

function UpdatePhone() {
  const { closeModal } = useAuthModal();
  const user = useSelector(selectUser);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updatePhone = useUpdatePhone();

  const form = useForm<FormUpdatePhone>({
    resolver: zodResolver(formSchemaPhone),
    defaultValues: {
      phone: user?.phone || "",
    },
  });

  function onSubmit(values: FormUpdatePhone) {
    setIsSubmitted(true);
    updatePhone.mutate({phone : values.phone});
  }

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, "")
    let formattedValue = digits
    if (digits.length > 0 && !digits.startsWith("0")) {
      formattedValue = "0" + digits.substring(0, 9)
    } else {
      formattedValue = digits.substring(0, 10)
    }
    return formattedValue
  }

  return (
    <div className="w-[45%] p-8">
      <div className="mb-[15px]">
        <p className="text-gray-600 text-[15px]">Cập nhật thông tin</p>
        <span className="block text-xl font-[600]">Cập nhật số điện thoại</span>
      </div>
      {updatePhone.isPending ? (
        <Loader className="my-[120px] " />
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="text-gray-600 text-[13px] mb-4">
              Vui lòng nhập số điện thoại mới của bạn. Chúng tôi sẽ gửi mã xác thực đến số điện thoại này.
            </div>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">Số điện thoại</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                      <Input
                        type="tel"
                        placeholder="0xxxxxxxxx"
                        className="w-full border p-[10px] pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...field}
                        onChange={(e) => {
                          const formattedValue = formatPhoneNumber(e.target.value)
                          e.target.value = formattedValue
                          field.onChange(e)
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="bg-blue-50 p-3 rounded-md flex items-start space-x-3 mt-2">
              <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-700">
                <p>Số điện thoại sẽ được sử dụng để:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Xác thực tài khoản</li>
                  <li>Nhận thông báo quan trọng</li>
                  <li>Khôi phục tài khoản khi cần thiết</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={updatePhone.isPending || isSubmitted}
                className="w-full bg-[#E03C31] hover:bg-[#FF837A] text-white font-semibold py-[15px] px-[15px] rounded-md mt-[15px]"
              >
                {updatePhone.isPending || isSubmitted ? "Đang cập nhật..." : "Cập nhật"}
              </Button>
            </div>

            <div className="flex justify-center text-[14px] text-gray-600 mt-2">
              <p className="">Quay lại</p>
              <span onClick={() => closeModal()} className="text-[#E03C31] px-[6px] font-[500] cursor-pointer">
                trang cá nhân
              </span>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}

export default UpdatePhone;