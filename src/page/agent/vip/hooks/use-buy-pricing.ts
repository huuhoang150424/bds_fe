import { useMutation } from "@tanstack/react-query";
import { buyPricing } from "../service/buy-pricing";


export function useBuyPricing() {
  return useMutation({
    mutationKey: ['buyPricing'],
    mutationFn: ( pricingId:string ) =>  buyPricing(pricingId) ,
  });
}