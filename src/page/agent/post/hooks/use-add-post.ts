import { useMutation } from "@tanstack/react-query";
import { addPost } from "../services/add-post";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query"; 

export const useAddPost = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => addPost(data),
    onSuccess: (data) => {
      console.log("Bài đăng đã được tạo thành công:", data);
      toast({
        title: "Thành công",
        description: "Bài đăng đã được tạo thành công!",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error: Error) => {
      console.error("Lỗi khi tạo bài đăng:", error);
      toast({
        title: "Lỗi",
        description: `Có lỗi khi tạo bài đăng: ${error.message || "Lỗi không xác định"}`,
        variant: "destructive",
      });
    },
  });
};