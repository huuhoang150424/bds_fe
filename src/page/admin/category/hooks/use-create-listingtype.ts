import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createListingType } from "../service/create-listingtype";

export const useCreateListingType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createListingType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listType"] });
    },
  });
};