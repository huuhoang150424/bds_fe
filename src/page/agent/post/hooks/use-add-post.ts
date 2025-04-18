import { useMutation } from "@tanstack/react-query";
import { addPost } from "../services/add-post";
import { useToast } from "@/hooks/use-toast";

export const useAddPost = (resetForm:any) => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: (data: FormData) => addPost(data),
    onSuccess: (data) => {
      toast({
        title: "Thành công",
        description: data?.message,
        variant: "success",
      });
      resetForm();
    },
    onError: (error: any) => {
      console.log(error)
      toast({
        title: "Lỗi",
        description: ` ${error?.response?.data?.message || "Lỗi không xác định"}`,
        variant: "destructive",
      });
    },
  });
};