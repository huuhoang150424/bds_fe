import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateListingType } from "../service/update-listingtype";
import { ListingTypeFormData } from "../schema/create-listingtype";

export const useUpdateListingType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, listingType }: { id: string; listingType: ListingTypeFormData }) =>
      updateListingType(id, listingType),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listType"] });
    },
  });
};
