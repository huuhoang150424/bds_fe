"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { IoLocationOutline } from "react-icons/io5"
import { CiHeart } from "react-icons/ci"
import { AiOutlinePicture } from "react-icons/ai"
import CustomImage from "@/components/common/images"
import { recommendedProperties } from "@/constant/const-home"

export default function PropertyListings() {
  const [visibleProperties, setVisibleProperties] = useState<number>(8)

  const handleLoadMore = () => {
    setVisibleProperties((prev) => prev + 8)
  }

  return (
    <div className="bg-gray-100 w-full px-[60px] pt-[30px] pb-[60px]">
      <div className="content mx-auto max-w-6xl px-[60px]">
        <div className="title flex justify-between items-center pb-[20px]">
          <h2 className="text-[22px] font-bold">Bất động sản dành cho bạn</h2>
          <div className="flex">
            <div className="block pr-[10px] border border-r-[1px border-r-gray-500 text-[12px]">
              <span>
                <a href="#">Tin nhà đất mới</a>
              </span>
            </div>
            <div className="block border border-r-[1px] text-[12px] ml-[10px]">
              <span>
                <a href="#">Tin nhà đất cho thuê mới</a>
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[16px]">
          {recommendedProperties.slice(0, visibleProperties).map((property) => (
            <Card key={property.id} className="rounded-[5px]">
              <CardContent className="p-0 pb-[10px] relative">
                <div className="overflow-hidden w-full">
                  <CustomImage
                    src={property.images[0]}
                    alt="Placeholder Image"
                    width="full"
                    height="full"
                    className="rounded-[5px]"
                  />
                </div>
                <div className="flex">
                  <AiOutlinePicture className="text-[#fff] absolute top-[100px] right-[30px] text-[24px]" />
                  <p className="text-[#fff] absolute top-[100px] right-[15px] text-[16px]">{property.images.length}</p>
                </div>
                <div className="px-[15px]">
                  <div className="">
                    <span className="font-[700] text-[#2C2C2C] text-sm mt-[10px]">{property.title}</span>
                  </div>
                  <div className="text-red flex">
                    <div className="text-[#E03C31] mr-[30px] font-[500]">
                      <span>{property.price}</span>
                    </div>
                    <div className="text-[#E03C31] font-[500]">
                      <span>{property.area}</span>
                    </div>
                  </div>
                  <div className="flex justify-start items-center mt-[5px]">
                    <IoLocationOutline />
                    <span className="text-sm ml-[5px] font-[0]">{property.location}</span>
                  </div>
                  <div className="flex justify-between items-center mt-[10px]">
                    <span className="text-[14px] text-gray-400">Đăng hôm nay</span>

                    <HoverCard>
                      <HoverCardTrigger className="border p-[5px] rounded-[5px]">
                        <CiHeart className="font-bold text-[18px]" />
                      </HoverCardTrigger>
                      <HoverCardContent>Bấm để lưu tin</HoverCardContent>
                    </HoverCard>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {visibleProperties < recommendedProperties.length && (
          <div className="flex justify-center mt-8">
            <Button
              onClick={handleLoadMore}
              className="bg-white text-[#E03C31] hover:bg-[#E03C31] hover:text-white border border-[#E03C31] px-8 py-2 rounded-full transition-colors duration-300"
            >
              Xem thêm
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

