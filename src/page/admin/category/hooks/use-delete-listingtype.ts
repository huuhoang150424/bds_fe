import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteListingType } from "../service/delete-listingtype";

export const useDeleteListingType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteListingType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listType"] });
    },
  });
};