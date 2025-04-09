"use client"

import { useState } from "react"
import { CiSearch } from "react-icons/ci"
import { IoLocationOutline } from "react-icons/io5"
import { MdKeyboardArrowDown } from "react-icons/md"
import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import DistrictSearch from "./search"

interface SearchBarProps {
  selectedCity: string
  setSelectedCity: (city: string) => void
  showMap: boolean
  setShowMap: (show: boolean) => void
  featuredCities: {
    name: string
    image: string
  }[]
}

export default function SearchBar({
  selectedCity,
  setSelectedCity,
  showMap,
  setShowMap,
  featuredCities,
}: SearchBarProps) {
  const [show, setShow] = useState(false)

  return (
    <div className="flex flex-col md:flex-row md:items-center mb-[20px] gap-4">
      <div className="flex-1  flex-col sm:flex-row items-stretch sm:items-center gap-4  py-[10px] rounded-[5px]">
        <DistrictSearch />
      </div>

      <div className="w-full md:w-[15%] h-[52px]">
        <Button
          className={cn(
            "w-full h-full flex items-center justify-center gap-2 rounded-lg font-medium transition-all",
            showMap ? "bg-gray-200 hover:bg-gray-300 text-gray-700" : "bg-[#009BA1] hover:bg-[#1DBABF] text-white",
          )}
          onClick={() => setShowMap(!showMap)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
            <line x1="8" y1="2" x2="8" y2="18" />
            <line x1="16" y1="6" x2="16" y2="22" />
          </svg>
          <span className="hidden sm:inline">{showMap ? "Ẩn bản đồ" : "Xem bản đồ"}</span>
        </Button>
      </div>
    </div>
  )
}

// Declare allCities here to avoid TypeScript errors
const allCities = [
  "An Giang",
  "Bà Rịa Vũng Tàu",
  "Bắc Giang",
  "Bắc Kạn",
  "Bạc Liêu",
  "Bắc Ninh",
  "Bến Tre",
  "Bình Định",
  "Bình Dương",
  "Bình Phước",
  "Bình Thuận",
  "Cà Mau",
  "Cần Thơ",
  "Cao Bằng",
  "Đà Nẵng",
  "Đắk Lắk",
  "Đắk Nông",
  "Điện Biên",
  "Đồng Nai",
  "Đồng Tháp",
  "Gia Lai",
  "Hà Giang",
  "Hà Nam",
  "Hà Nội",
  "Hà Tĩnh",
  "Hải Dương",
  "Hải Phòng",
  "Hậu Giang",
  "Hòa Bình",
  "Hưng Yên",
  "Khánh Hòa",
  "Kiên Giang",
  "Kon Tum",
  "Lai Châu",
  "Lâm Đồng",
  "Lạng Sơn",
  "Lào Cai",
  "Long An",
  "Nam Định",
  "Nghệ An",
  "Ninh Bình",
  "Ninh Thuận",
  "Phú Thọ",
  "Phú Yên",
  "Quảng Bình",
  "Quảng Nam",
  "Quảng Ngãi",
  "Quảng Ninh",
  "Quảng Trị",
  "Sóc Trăng",
  "Sơn La",
  "Tây Ninh",
  "Thái Bình",
  "Thái Nguyên",
  "Thanh Hóa",
  "Thừa Thiên Huế",
  "Tiền Giang",
  "TP Hồ Chí Minh",
  "Trà Vinh",
  "Tuyên Quang",
  "Vĩnh Long",
  "Vĩnh Phúc",
  "Yên Bái",
]

