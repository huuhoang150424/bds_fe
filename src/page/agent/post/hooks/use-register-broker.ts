import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { registerBroker } from "../services/register-broker";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { updateRole } from "@/redux/authReducer";

export const useRegisterBroker = (
  //resetForm:any
) => {
  const dispatch=useDispatch<AppDispatch>();
  const { toast } = useToast();
  return useMutation({
    mutationFn: (data: any) => registerBroker(data),
    onSuccess: (data) => {
      console.log(data)
      toast({
        title: "Thành công",
        description: data?.message,
        variant: "success",
      });
      //resetForm();
      dispatch(updateRole({roles:data?.data?.roles}))
    },
    onError: (error: any) => {
      toast({
        title: "Lỗi",
        description: ` ${error?.response?.data?.message || "Lỗi không xác định"}`,
        variant: "destructive",
      });
    },
  });
};