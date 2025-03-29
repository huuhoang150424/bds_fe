"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { resetAuthState, selectMessage, selectSuccess, selectUser } from "@/redux/authReducer"
import type { AppDispatch } from "@/redux/store"
import { toast } from "@/hooks/use-toast"
import MessengerClone from "@/components/user/chat-box"
import type { CityInfo } from "@/constant/const-home"
import BannerSearch from "./components/banner-search"
import NewsSection from "./components/news-sections"
import PropertyListings from "./components/property-listing"
import BusinessCarousel from "./components/business-carousel"
import InfoSection from "./components/info-search"
import LocationSection from "./components/location-section"
import NewsCarousel from "./components/news-carousel"
import UtilitySection from "./components/ultility0section"

// Import components


function Home() {
  const message = useSelector(selectMessage)
  const success = useSelector(selectSuccess)
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector(selectUser)
  const [activeTab, setActiveTab] = useState("nha-dat-ban")

  // Show message and delete
  useEffect(() => {
    if (success) {
      toast({
        variant: "success",
        title: message,
      })
    }
    dispatch(resetAuthState())
  }, [message, success, dispatch])

  const getPostCountByCity = () => {
    const cityCounts: { [key: string]: number } = {}
    // This would normally use recommendedProperties data
    return cityCounts
  }

  const cityInfos: CityInfo[] = [
    {
      name: "TP. Hồ Chí Minh",
      count: 63542,
      image: "https://file4.batdongsan.com.vn/images/newhome/cities/HCM-web-1.jpg",
    },
    {
      name: "Hà Nội",
      count: getPostCountByCity()["Hà Nội"] || 0,
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
  ]

  return (
    <>
      {/* Banner */}
      <BannerSearch activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* News */}
      <NewsSection />

      <Button className="fixed bottom-[30px] left-[30px] p-3 rounded-full">
        <MessengerClone />
      </Button>

      {/* BĐS for you */}
      <PropertyListings />

      {/* Bất động sản theo địa điểm */}
      <LocationSection cityInfos={cityInfos} />

      {/* Tin tức bất động sản */}
      <NewsCarousel />

      {/* Hỗ trợ tiện ích */}
      <UtilitySection />

      {/* Doanh nghiệp tiêu biểu */}
      <BusinessCarousel />

      {/* Information sections */}
      <InfoSection />
    </>
  )
}

export default Home

