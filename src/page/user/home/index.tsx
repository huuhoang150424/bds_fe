import { useEffect, useState, useRef, Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetAuthState, selectMessage, selectSuccess, selectUser } from '@/redux/authReducer';
import type { AppDispatch } from '@/redux/store';
import { toast } from '@/hooks/use-toast';
import BannerSearch from './components/banner-search';
import { Loading } from '@/components/common';
import useScrollToTopOnMount from '@/hooks/use-scroll-top';
import { PremiumSliderDialog } from '../banner/components/premium-slider-dialog';
const NewsSection = lazy(() => import('./components/news-sections'));
const PropertyListings = lazy(() => import('./components/property-listing'));
const BusinessCarousel = lazy(() => import('./components/business-carousel'));
const InfoSection = lazy(() => import('./components/info-search'));
const LocationSection = lazy(() => import('./components/location-section'));
const NewsCarousel = lazy(() => import('./components/news-carousel'));
const UtilitySection = lazy(() => import('./components/ultility0section'));
const PostOutStanding = lazy(() => import('./components/post-outstanding'));

const LazySection = ({
  Component,
  ...props
}: {
  Component: React.LazyExoticComponent<React.ComponentType<any>>;
  [key: string]: any;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div ref={ref}>
      {isVisible ? (
        <Suspense fallback={<Loading className='mx-auto my-[200px]' />}>
          <Component {...props} />
        </Suspense>
      ) : (
        <div style={{ minHeight: '200px' }} />
      )}
    </div>
  );
};


const exampleBanner = {
  id: "1",
  title: "Khuyến mãi đặc biệt! Giảm giá 50% cho tất cả sản phẩm mới",
  imageUrls: [
    "https://colour.vn/wp-content/uploads/ie%CC%82%CC%81t-ke%CC%82%CC%81-banner-ba%CC%82%CC%81t-do%CC%A3%CC%82ng-sa%CC%89n-de%CC%A3p.jpeg",
    "https://img.pikbest.com/origin/10/07/18/49cpIkbEsTKvX.png!f305cw",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi3ZI61HObAqZBm5awlHRn3pvRSCp7aV2Y367X2xk9JoO4feeJz2P26FZAWJ6_n3CYhdU&usqp=CAU"
  ],
  targetUrl: "/promotions",
  displayOrder: 1,
  isActive: true,
  startDate: new Date(Date.now() - 86400000).toISOString(),
  endDate: new Date(Date.now() + 86400000 * 7).toISOString(),
}

function Home() {
  useScrollToTopOnMount();
  const message = useSelector(selectMessage);
  const success = useSelector(selectSuccess);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const [activeTab, setActiveTab] = useState('nha-dat-ban');

  useEffect(() => {
    if (success && message) {
      toast({
        variant: 'success',
        title: message,
      });
    }
    dispatch(resetAuthState());
  }, [message, success, dispatch]);

  return (
    <>
      <PremiumSliderDialog banner={exampleBanner} />
      <BannerSearch activeTab={activeTab} setActiveTab={setActiveTab} />

      <LazySection Component={NewsSection} />
      <div className='fixed '></div>
      <LazySection Component={PropertyListings} />
      <LazySection Component={PostOutStanding} />
      <LazySection Component={LocationSection} />
      <LazySection Component={NewsCarousel} />
      <LazySection Component={UtilitySection} />
      <LazySection Component={BusinessCarousel} />
      <LazySection Component={InfoSection} />
    </>
  );
}

export default Home;
