import { Card, CardContent } from "@/components/ui/card"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Link } from "react-router-dom"
import { AiOutlinePicture } from "react-icons/ai"
import { IoLocationOutline } from "react-icons/io5"
import { CiHeart } from "react-icons/ci"
import { formatRelativeTime } from "@/lib/convert-date"

export default function CardItem({ post }: { post: any }) {
  return (
    <Link key={`${post?.id}-index`} to={`/post/${post?.slug}`}>
      <Card className="rounded-[16px] overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow h-[400px]">
        <CardContent className="p-3 relative flex flex-col h-full">
          <div className="overflow-hidden w-full rounded-[12px] mb-3 relative h-[180px]">
            <img
              src={post?.images[0]?.image_url}
              alt="Placeholder Image"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 flex items-center bg-black/50 rounded-full px-2 py-1">
              <AiOutlinePicture className="text-white text-[16px]" />
              <p className="text-white text-[14px] ml-1">{post?.images?.length}</p>
            </div>
          </div>
          <div className="flex-grow">
            <span className="font-[600] text-[#2C2C2C] text-base">{post?.title}</span>
            <div className="flex items-center mt-1">
              <div className="text-[#E03C31] font-[600] text-base">
                {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(post?.price)}
              </div>
              <div className="text-gray-500 font-[400] text-[14px] ml-2 line-through">
                {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(post?.price * 1.15)}
              </div>
            </div>
            <div className="flex justify-start items-center mt-2">
              <IoLocationOutline className="text-gray-500" />
              <span className="text-sm ml-[5px] text-gray-500">{post?.address}</span>
            </div>
          </div>
          <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-100">
            <div className="flex flex-col">
              <span className="text-[14px] text-gray-500">{formatRelativeTime(post?.createdAt)}</span>
              <div className="flex items-center mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 text-yellow-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-[14px] font-medium ml-1">{post?.rating || "4.9"}</span>
              </div>
            </div>
            <HoverCard>
              <HoverCardTrigger asChild>
                <button className="rounded-full p-1.5 bg-pink-50 hover:bg-pink-100 transition-colors">
                  <CiHeart className="text-pink-500 text-[18px]" />
                </button>
              </HoverCardTrigger>
              <HoverCardContent>Bấm để lưu tin</HoverCardContent>
            </HoverCard>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
