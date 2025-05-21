import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { bulkAiApprovePosts } from "../services/get-approve-post";

export const useBulkAiApprovePosts = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["bulkAiApprovePosts"],
    mutationFn: () => bulkAiApprovePosts(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};