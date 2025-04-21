
import useScrollToTopOnMount from '@/hooks/use-scroll-top';
import HeroSection from './components/hero-section';
import PricingTable from './components/pricing-table';
import FaqSection from './components/faq-section';

function Vip() {
  useScrollToTopOnMount();
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-20">
      <div className="relative">
        <HeroSection />
        <div className="max-w-6xl mx-auto px-4 relative -mt-10 z-10">
          <PricingTable />
          <div className="mt-20">
            <FaqSection />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vip;
