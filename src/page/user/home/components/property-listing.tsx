
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { IoLocationOutline } from "react-icons/io5"
import { CiHeart } from "react-icons/ci"
import { AiOutlinePicture } from "react-icons/ai"
import CustomImage from "@/components/common/images"
import { useGetPostsPrioritys } from "@/page/user/home/hook/use-get-post-priority"
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { formatRelativeTime } from "@/lib/convert-date"
import { Link } from "react-router-dom"




export default function PropertyListings() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetPostsPrioritys(10, page);

  return (
    <div className="bg-gray-100 w-full px-[60px] pt-[30px] pb-[60px]">
      <div className="content mx-auto max-w-6xl px-[60px]">
        <div className="title flex justify-between items-center pb-[20px]">
          <h2 className="text-[22px] font-bold">Bất động sản nổi bật</h2>
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
          {data?.posts?.map((post:any,index:number) => (
            <Link key={`${post?.id}-index`} to={`/post/${post?.slug}`}>
              <Card  className="rounded-[5px]">
                <CardContent className="p-0 pb-[10px] relative">
                  <div className="overflow-hidden w-full">
                    <CustomImage
                      src={post?.images[0]?.image_url}
                      alt="Placeholder Image"
                      width="full"
                      height="full"
                      className="rounded-[5px]"
                    />
                  </div>
                  <div className="flex">
                    <AiOutlinePicture className="text-[#fff] absolute top-[100px] right-[30px] text-[24px]" />
                    <p className="text-[#fff] absolute top-[100px] right-[15px] text-[16px]">{post?.images?.length}</p>
                  </div>
                  <div className="px-[15px]">
                    <div className="">
                      <span className="font-[700] text-[#2C2C2C] text-sm mt-[10px]">{post?.title}</span>
                    </div>
                    <div className=" flex">
                      <div className="text-[#E03C31] mr-[30px] font-[500]">
                        <span>{post?.price?.toLocaleString('vi-VN')}</span>
                      </div>
                      <div className="text-[#E03C31] font-[500] text-[15px] ">
                        <span>{post?.squareMeters} m^2</span>
                      </div>
                    </div>
                    <div className="flex justify-start items-center mt-[5px]">
                      <IoLocationOutline />
                      <span className="text-sm ml-[5px] font-[0]">{post?.address}</span>
                    </div>
                    <div className="flex justify-between items-center mt-[10px]">
                      <span className="text-[14px] text-gray-400">{formatRelativeTime(post?.createdAt)}</span>
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
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

