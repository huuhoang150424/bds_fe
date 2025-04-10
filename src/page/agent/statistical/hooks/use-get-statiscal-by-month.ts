import { useQuery } from "@tanstack/react-query"
import {getSatisticalByMonth} from "../services/get-satistical-by-month"

export const useGetSatisticalByMonth = () => {
    return useQuery({
        queryKey: ['statisticalByMonth'],
        queryFn: getSatisticalByMonth,
    })
}