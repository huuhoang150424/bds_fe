import useScrollToTopOnMount from '@/hooks/use-scroll-top';
import MyPricingTable from '../components/my-pricing';

export default function MyPricing() {
  useScrollToTopOnMount();
  return (
    <div className='p-[20px] '>

      <MyPricingTable />
    </div>
  );
}
