"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"

import { ChevronDown, Search, X } from "lucide-react"
import { useDebounce } from "use-debounce";

interface SearchBarProps {
  allProvinces: string[];
  onSearch: (selected: string[]) => void;
  showMap: boolean;
  setShowMap: (show: boolean) => void;
}
const vietnameseProvinces = [
  "Hà Nội",
  "Hồ Chí Minh",
  "Đà Nẵng",
  "Hải Phòng",
  "Cần Thơ",
  "An Giang",
  "Bà Rịa - Vũng Tàu",
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
  "Cao Bằng",
  "Đắk Lắk",
  "Đắk Nông",
  "Điện Biên",
  "Đồng Nai",
  "Đồng Tháp",
  "Gia Lai",
  "Hà Giang",
  "Hà Nam",
  "Hà Tĩnh",
  "Hải Dương",
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
  "Trà Vinh",
  "Tuyên Quang",
  "Vĩnh Long",
  "Vĩnh Phúc",
  "Yên Bái",
]

export default function SearchBar({
  allProvinces,
  onSearch,
  showMap,
  setShowMap,
  
}: SearchBarProps) {
  
  const [selectedProvinces, setSelectedProvinces] = useState<string[]>([])
  const [searchInput, setSearchInput] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [debouncedSearchInput] = useDebounce(searchInput, 300);
  


  const filteredProvinces = allProvinces
    .filter(
      (province) =>
        province.toLowerCase().includes(debouncedSearchInput.toLowerCase()) &&
        !selectedProvinces.includes(province)
    )
    .slice(0, 10);

  const handleProvinceSelect = (province: string) => {
    const updatedProvinces = [...selectedProvinces, province];
    setSelectedProvinces(updatedProvinces);
    setSearchInput("");
    setIsDropdownOpen(false);
  };

  const handleRemoveProvince = (province: string) => {
    const updatedProvinces = selectedProvinces.filter((p) => p !== province);
    setSelectedProvinces(updatedProvinces);
  };
  const handleBlur = () => {
    setTimeout(() => setIsDropdownOpen(false), 200); 
  };
  const handleSearch = () => {
    onSearch(selectedProvinces); // Chỉ gửi danh sách khi nhấn Tìm kiếm
  };
  
  return (
    <div className="flex flex-col md:flex-row md:items-center mb-[20px] gap-4">
      <div className="relative w-full">
      <div className="flex items-center border rounded-lg p-2 bg-white">
        <Search className="h-5 w-5 text-gray-400 mr-2" />

        <div className="flex flex-wrap gap-2 flex-1">
          {selectedProvinces.map((province) => (
            <div key={province} className="flex items-center bg-gray-100 rounded-md px-2 py-1">
              <span className="text-sm">{province}</span>
              <button
                onClick={() => handleRemoveProvince(province)}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}

          <div className="relative flex-1 min-w-[120px]">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onFocus={() => setIsDropdownOpen(true)}
              onBlur={handleBlur}
              placeholder={selectedProvinces.length === 0 ? "Tìm kiếm tỉnh thành..." : ""}
              className="w-full border-none outline-none text-sm"
            />
          </div>
          
        </div>

        <Button className="mr-[10px]" variant="ghost" size="sm" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <ChevronDown className="h-4 w-4" />
        </Button>
        <Button className="bg-[#E03C31] hover:bg-[#FF837A] text-white" onClick={handleSearch}>Tìm kiếm</Button>
      </div>

      {isDropdownOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredProvinces.length > 0 ? (
            filteredProvinces.map((province) => (
              <div
                key={province}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => {
                  handleProvinceSelect(province);
                  setIsDropdownOpen(false);
                }}
              >
                {province}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500 text-sm">Không tìm thấy kết quả</div>
          )}
        </div>
      )}
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


