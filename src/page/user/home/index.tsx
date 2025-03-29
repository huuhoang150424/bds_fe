import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef, Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetAuthState, selectMessage, selectSuccess, selectUser } from "@/redux/authReducer";
import type { AppDispatch } from "@/redux/store";
import { toast } from "@/hooks/use-toast";
import MessengerClone from "@/components/user/chat-box";
import type { CityInfo } from "@/constant/const-home";
import BannerSearch from "./components/banner-search";
import { Loading } from "@/components/common";

const NewsSection = lazy( () => import( "./components/news-sections" ) );
const PropertyListings = lazy( () => import( "./components/property-listing" ) );
const BusinessCarousel = lazy( () => import( "./components/business-carousel" ) );
const InfoSection = lazy( () => import( "./components/info-search" ) );
const LocationSection = lazy( () => import( "./components/location-section" ) );
const NewsCarousel = lazy( () => import( "./components/news-carousel" ) );
const UtilitySection = lazy( () => import( "./components/ultility0section" ) );

// Component wrapper để kiểm tra viewport
const LazySection = ( {
  Component,
  ...props
}: {
  Component: React.LazyExoticComponent<React.ComponentType<any>>;
  [ key: string ]: any;
} ) =>
{
  const [ isVisible, setIsVisible ] = useState( false );
  const ref = useRef<HTMLDivElement>( null );

  useEffect( () =>
  {
    const observer = new IntersectionObserver(
      ( [ entry ] ) =>
      {
        if ( entry.isIntersecting )
        {
          setIsVisible( true );
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if ( ref.current )
    {
      observer.observe( ref.current );
    }

    return () =>
    {
      if ( ref.current )
      {
        observer.unobserve( ref.current );
      }
    };
  }, [] );

  return (
    <div ref={ ref }>
      { isVisible ? (
        <Suspense fallback={ <Loading className="mx-auto my-[200px]" /> }>
          <Component { ...props } />
        </Suspense>
      ) : (
        <div style={ { minHeight: "200px" } } />
      ) }
    </div>
  );
};

function Home ()
{
  const message = useSelector( selectMessage );
  const success = useSelector( selectSuccess );
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector( selectUser );
  const [ activeTab, setActiveTab ] = useState( "nha-dat-ban" );

  useEffect( () =>
  {
    if ( success && message )
    {
      toast( {
        variant: "success",
        title: message,
      } );
    }
    dispatch( resetAuthState() );
  }, [ message, success, dispatch ] );

  const getPostCountByCity = () =>
  {
    const cityCounts: { [ key: string ]: number } = {};
    return cityCounts;
  };

  const cityInfos: CityInfo[] = [
    {
      name: "TP. Hồ Chí Minh",
      count: 63542,
      image: "https://file4.batdongsan.com.vn/images/newhome/cities/HCM-web-1.jpg",
    },
    {
      name: "Hà Nội",
      count: getPostCountByCity()[ "Hà Nội" ] || 0,
      image: "https://file4.batdongsan.com.vn/images/newhome/cities/HN-web-1.jpg",
    },
    {
      name: "Đà Nẵng",
      count: 9813,
      image: "https://file4.batdongsan.com.vn/images/newhome/cities/DN-web-1.jpg",
    },
    {
      name: "Bình Dương",
      count: 8071,
      image: "https://file4.batdongsan.com.vn/images/newhome/cities/BD-web-1.jpg",
    },
    {
      name: "Đồng Nai",
      count: 4322,
      image: "https://file4.batdongsan.com.vn/images/newhome/cities/DN2-web-1.jpg",
    },
  ];

  return (
    <>
      <BannerSearch activeTab={ activeTab } setActiveTab={ setActiveTab } />

      <LazySection Component={ NewsSection } />
      <div className="fixed ">
        <MessengerClone />
      </div>
      <LazySection Component={ PropertyListings } />
      <LazySection Component={ LocationSection } cityInfos={ cityInfos } />
      <LazySection Component={ NewsCarousel } />
      <LazySection Component={ UtilitySection } />
      <LazySection Component={ BusinessCarousel } />
      <LazySection Component={ InfoSection } />
    </>
  );
}

export default Home;