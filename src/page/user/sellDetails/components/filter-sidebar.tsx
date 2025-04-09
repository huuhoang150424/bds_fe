"use client"
import { FaAngleRight } from "react-icons/fa"

interface FilterSidebarProps {
  searchCity: string
  setSearchCity: (city: string) => void
  showAllCities: boolean
  setShowAllCities: (show: boolean) => void
  filteredCities: string[]
  allCities: string[]
}

export default function FilterSidebar({
  searchCity,
  setSearchCity,
  showAllCities,
  setShowAllCities,
  filteredCities,
  allCities,
}: FilterSidebarProps) {
  return (
    <div className="fill w-full lg:w-[25%] p-[15px] overflow-y-auto">
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <h3 className="text-lg font-semibold mb-[10px]">Lọc theo diện tích</h3>

        <div className="space-y-2">
          {[
            { label: "Dưới 30 m²", value: "0-30" },
            { label: "30 - 50 m²", value: "30-50" },
            { label: "50 - 80 m²", value: "50-80" },
            { label: "80 - 100 m²", value: "80-100" },
            { label: "100 - 150 m²", value: "100-150" },
            { label: "150 - 200 m²", value: "150-200" },
            { label: "200 - 250 m²", value: "200-250" },
            { label: "250 - 300 m²", value: "250-300" },
            { label: "300 - 500 m²", value: "300-500" },
            { label: "Trên 500 m²", value: "500-999999" },
          ].map((item) => (
            <div className="flex flex-col group cursor-pointer" key={item.value}>
              <span className="text-gray-700 group-hover:text-[#E03C31] transition-colors">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 mt-4 border border-gray-200">
        <h3 className="text-lg font-semibold mb-[10px]">Lọc theo khoảng giá</h3>

        <div className="space-y-2 ">
          {[
            { label: "Thỏa thuận", value: "negotiable" },
            { label: "Dưới 500 triệu", value: "0-500000000" },
            { label: "500 - 800 triệu", value: "500000000-800000000" },
            { label: "800 triệu - 1 tỷ", value: "800000000-1000000000" },
            { label: "1 - 2 tỷ", value: "1000000000-2000000000" },
            { label: "2 - 3 tỷ", value: "2000000000-3000000000" },
            { label: "3 - 5 tỷ", value: "3000000000-5000000000" },
            { label: "5 - 7 tỷ", value: "5000000000-7000000000" },
            { label: "7 - 10 tỷ", value: "7000000000-10000000000" },
            { label: "10 - 20 tỷ", value: "10000000000-20000000000" },
            { label: "20 - 30 tỷ", value: "20000000000-30000000000" },
            { label: "30 - 40 tỷ", value: "30000000000-40000000000" },
            { label: "40 - 60 tỷ", value: "40000000000-60000000000" },
            { label: "Trên 60 tỷ", value: "60000000000-999999999999" },
          ].map((item) => (
            <div
              key={item.value}
              className="flex items-center justify-between hover:bg-gray-50 rounded-md cursor-pointer group"
            >
              <span className="text-gray-700 text-sm group-hover:text-[#E03C31] transition-colors">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 mt-4 border border-gray-200">
        <h3 className="text-lg font-semibold mb-[10px]">Mua bán nhà đất</h3>

        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm tỉnh thành..."
              className="w-full px-3 py-2 pl-9 border border-gray-300 rounded-md focus:outline-none focus:border-[#E03C31] text-sm"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="space-y-1 max-h-[300px] overflow-y-auto custom-scrollbar">
          {(searchCity ? filteredCities : showAllCities ? allCities : allCities.slice(0, 10)).map((city) => (
            <div
              key={city}
              className="flex items-center justify-between py-1.5 hover:bg-gray-50 rounded-md cursor-pointer group"
            >
              <span className="text-gray-700 text-sm group-hover:text-[#E03C31] transition-colors">{city}</span>
            </div>
          ))}

          {!searchCity && !showAllCities && (
            <div className="pt-2">
              <button
                className="text-[#E03C31] text-sm hover:underline flex items-center gap-1"
                onClick={() => setShowAllCities(true)}
              >
                Xem thêm
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}

          {!searchCity && showAllCities && (
            <div className="pt-2">
              <button
                className="text-[#E03C31] text-sm hover:underline flex items-center gap-1"
                onClick={() => setShowAllCities(false)}
              >
                Thu gọn
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 transform rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 mt-4 border border-gray-200">
        <h3 className="text-lg font-semibold mb-[10px]">Bài viết được quan tâm</h3>

        <div className="space-y-3">
          {[
            {
              id: 1,
              title: "Trọn Bộ Lãi Suất Vay Mua Nhà Mới Nhất Tháng 2/2025",
            },
            {
              id: 2,
              title: "Toàn Cảnh Thị Trường Bất Động Sản Tháng 12/2024",
            },
            {
              id: 3,
              title: "Bình Chánh Tỏa Sáng Trên Bản Đồ Phát Triển Đô Thị",
            },
            {
              id: 4,
              title: "Thị Trường Chung Cư Hà Nội Vắng Bóng Nhà Đầu Tư",
            },
            {
              id: 5,
              title: "Bình Dương Đối Đầu Nguồn Cung Dự Án Mới Trong Quý 1/2025",
            },
          ].map((article) => (
            <div key={article.id} className="flex items-center group cursor-pointer border-b pb-2">
              <h4 className="text-sm text-gray-700 group-hover:text-[#E03C31] transition-colors line-clamp-2">
                {article.title}
              </h4>
            </div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <button
            className="text-[#E03C31] text-sm hover:underline inline-flex items-center gap-1"
            onClick={() => {
              console.log("Chuyển đến trang tin tức")
            }}
          >
            Xem tất cả tin tức
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  )
}

