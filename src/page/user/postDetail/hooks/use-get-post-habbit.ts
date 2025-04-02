import { useQuery } from "@tanstack/react-query";
import { getPostHabit } from "../services/get-post-habbit";
import { useSelector } from "react-redux";
import { selectToken } from "@/redux/authReducer";

export const useGetPostHabbit = () => {
    const token = useSelector(selectToken);
    console.log("Token from Redux:", token); // Kiểm tra giá trị token từ Redux
    
    return useQuery({
        queryKey: ["posthabit", token], // Thêm token vào queryKey
        queryFn: () => getPostHabit(token), // Truyền token vào hàm
        enabled: !!token // Chỉ fetch khi có token
    });
};