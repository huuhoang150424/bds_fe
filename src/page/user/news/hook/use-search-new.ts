import { useQuery } from "@tanstack/react-query";
import { getNewBySearch } from "../service/search-new";

export const useSearchNew = (keyWord: string) => {
    return useQuery({
        queryKey: ["searchPost", keyWord],
        queryFn: () => getNewBySearch(keyWord),
        placeholderData: (previousData) => previousData,
        enabled: !!keyWord, // Chỉ chạy khi có từ khóa tìm kiếm
    })
}