import { useEffect, useState, useRef, Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetAuthState, selectMessage, selectSuccess, selectUser } from '@/redux/authReducer';
import type { AppDispatch } from '@/redux/store';
import { toast } from '@/hooks/use-toast';
import BannerSearch from './components/banner-search';
import { Loading } from '@/components/common';

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

function Home() {
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
