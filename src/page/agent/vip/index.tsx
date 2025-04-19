
import Faqs from './components/Faqs';
import VipCard from './components/vip-card';
import useScrollToTopOnMount from '@/hooks/use-scroll-top';

function Vip() {
  useScrollToTopOnMount();
  return (
    <div className='p-6 space-y-6  min-h-screen max-w-8xl'>
      <VipCard />
      <div>
        <Faqs />
      </div>
    </div>
  );
}

export default Vip;
