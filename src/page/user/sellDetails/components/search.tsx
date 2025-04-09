// "use client"

// import { useState, useEffect, useRef } from "react"
// import { Search, MapPin, X, ChevronDown } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// // Add custom scrollbar styles
// const customScrollbarStyles = `
//   .custom-scrollbar::-webkit-scrollbar {
//     width: 6px;
//   }
//   .custom-scrollbar::-webkit-scrollbar-track {
//     background: #f1f1f1;
//     border-radius: 10px;
//   }
//   .custom-scrollbar::-webkit-scrollbar-thumb {
//     background: #d1d1d1;
//     border-radius: 10px;
//   }
//   .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//     background: #c1c1c1;
//   }
// `

// // Vietnam provinces and districts data
// const vietnamProvinces = [
//   {
//     name: "Hà Nội",
//     districts: [
//       "Quận Ba Đình",
//       "Quận Bắc Từ Liêm",
//       "Quận Cầu Giấy",
//       "Quận Đống Đa",
//       "Quận Hà Đông",
//       "Quận Hai Bà Trưng",
//       "Quận Hoàn Kiếm",
//       "Quận Hoàng Mai",
//       "Quận Long Biên",
//       "Quận Nam Từ Liêm",
//       "Quận Tây Hồ",
//       "Quận Thanh Xuân",
//       "Huyện Ba Vì",
//       "Huyện Chương Mỹ",
//       "Huyện Đan Phượng",
//       "Huyện Đông Anh",
//       "Huyện Gia Lâm",
//       "Huyện Hoài Đức",
//       "Huyện Mê Linh",
//       "Huyện Mỹ Đức",
//       "Huyện Phú Xuyên",
//       "Huyện Phúc Thọ",
//       "Huyện Quốc Oai",
//       "Huyện Sóc Sơn",
//       "Huyện Thạch Thất",
//       "Huyện Thanh Oai",
//       "Huyện Thanh Trì",
//       "Huyện Thường Tín",
//       "Huyện Ứng Hòa",
//       "Thị xã Sơn Tây",
//     ],
//   },
//   {
//     name: "Hồ Chí Minh",
//     districts: [
//       "Quận 1",
//       "Quận 3",
//       "Quận 4",
//       "Quận 5",
//       "Quận 6",
//       "Quận 7",
//       "Quận 8",
//       "Quận 10",
//       "Quận 11",
//       "Quận 12",
//       "Quận Bình Tân",
//       "Quận Bình Thạnh",
//       "Quận Gò Vấp",
//       "Quận Phú Nhuận",
//       "Quận Tân Bình",
//       "Quận Tân Phú",
//       "Quận Thủ Đức",
//       "Huyện Bình Chánh",
//       "Huyện Cần Giờ",
//       "Huyện Củ Chi",
//       "Huyện Hóc Môn",
//       "Huyện Nhà Bè",
//     ],
//   },
//   {
//     name: "Đà Nẵng",
//     districts: [
//       "Quận Hải Châu",
//       "Quận Cẩm Lệ",
//       "Quận Thanh Khê",
//       "Quận Liên Chiểu",
//       "Quận Ngũ Hành Sơn",
//       "Quận Sơn Trà",
//       "Huyện Hòa Vang",
//       "Huyện Hoàng Sa",
//     ],
//   },
//   // Adding a few more provinces for demonstration
//   {
//     name: "Hải Phòng",
//     districts: [
//       "Quận Hồng Bàng",
//       "Quận Lê Chân",
//       "Quận Ngô Quyền",
//       "Quận Kiến An",
//       "Quận Hải An",
//       "Quận Đồ Sơn",
//       "Quận Dương Kinh",
//       "Huyện An Dương",
//       "Huyện An Lão",
//       "Huyện Kiến Thụy",
//       "Huyện Tiên Lãng",
//       "Huyện Vĩnh Bảo",
//       "Huyện Cát Hải",
//       "Huyện Thủy Nguyên",
//       "Huyện Bạch Long Vĩ",
//     ],
//   },
//   {
//     name: "Cần Thơ",
//     districts: [
//       "Quận Ninh Kiều",
//       "Quận Bình Thủy",
//       "Quận Cái Răng",
//       "Quận Ô Môn",
//       "Quận Thốt Nốt",
//       "Huyện Vĩnh Thạnh",
//       "Huyện Cờ Đỏ",
//       "Huyện Phong Điền",
//       "Huyện Thới Lai",
//     ],
//   },
//   // In a real application, you would include all 63 provinces
// ]

// // Add the remaining provinces with empty district arrays
// const remainingProvinces = [
//   "An Giang",
//   "Bà Rịa - Vũng Tàu",
//   "Bắc Giang",
//   "Bắc Kạn",
//   "Bạc Liêu",
//   "Bắc Ninh",
//   "Bến Tre",
//   "Bình Định",
//   "Bình Dương",
//   "Bình Phước",
//   "Bình Thuận",
//   "Cà Mau",
//   "Cao Bằng",
//   "Đắk Lắk",
//   "Đắk Nông",
//   "Điện Biên",
//   "Đồng Nai",
//   "Đồng Tháp",
//   "Gia Lai",
//   "Hà Giang",
//   "Hà Nam",
//   "Hà Tĩnh",
//   "Hải Dương",
//   "Hậu Giang",
//   "Hòa Bình",
//   "Hưng Yên",
//   "Khánh Hòa",
//   "Kiên Giang",
//   "Kon Tum",
//   "Lai Châu",
//   "Lâm Đồng",
//   "Lạng Sơn",
//   "Lào Cai",
//   "Long An",
//   "Nam Định",
//   "Nghệ An",
//   "Ninh Bình",
//   "Ninh Thuận",
//   "Phú Thọ",
//   "Phú Yên",
//   "Quảng Bình",
//   "Quảng Nam",
//   "Quảng Ngãi",
//   "Quảng Ninh",
//   "Quảng Trị",
//   "Sóc Trăng",
//   "Sơn La",
//   "Tây Ninh",
//   "Thái Bình",
//   "Thái Nguyên",
//   "Thanh Hóa",
//   "Thừa Thiên Huế",
//   "Tiền Giang",
//   "Trà Vinh",
//   "Tuyên Quang",
//   "Vĩnh Long",
//   "Vĩnh Phúc",
//   "Yên Bái",
// ]

// remainingProvinces.forEach((province) => {
//   vietnamProvinces.push({
//     name: province,
//     districts: [],
//   })
// })

// export default function DistrictSearch() {
//   const [selectedProvince, setSelectedProvince] = useState("Hà Nội")
//   const [selectedDistricts, setSelectedDistricts] = useState<string[]>([])
//   const [searchQuery, setSearchQuery] = useState("")
//   const [isProvinceDropdownOpen, setIsProvinceDropdownOpen] = useState(false)
//   const [isSearchActive, setIsSearchActive] = useState(false)

//   const searchContainerRef = useRef<HTMLDivElement>(null)
//   const searchInputRef = useRef<HTMLInputElement>(null)

//   // Get districts for the selected province
//   const getDistricts = () => {
//     const province = vietnamProvinces.find((p) => p.name === selectedProvince)
//     return province ? province.districts : []
//   }

//   // Filter districts based on search query
//   const filteredDistricts = getDistricts().filter((district) =>
//     district.toLowerCase().includes(searchQuery.toLowerCase()),
//   )

//   // Toggle district selection
//   const toggleDistrict = (districtName: string) => {
//     if (selectedDistricts.includes(districtName)) {
//       setSelectedDistricts(selectedDistricts.filter((d) => d !== districtName))
//     } else {
//       setSelectedDistricts([...selectedDistricts, districtName])
//     }
//   }

//   // Remove district from selection
//   const removeDistrict = (districtName: string) => {
//     setSelectedDistricts(selectedDistricts.filter((d) => d !== districtName))
//   }

//   // Change province selection
//   const changeProvince = (provinceName: string) => {
//     setSelectedProvince(provinceName)
//     setSelectedDistricts([])
//     setIsProvinceDropdownOpen(false)
//   }

//   // Handle click outside to close search dropdown
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
//         setIsSearchActive(false)
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside)
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside)
//     }
//   }, [])

//   // Reset search when province changes
//   useEffect(() => {
//     setSearchQuery("")
//   }, [selectedProvince])

//   // Focus input when search becomes active
//   useEffect(() => {
//     if (isSearchActive && searchInputRef.current) {
//       searchInputRef.current.focus()
//     }
//   }, [isSearchActive])

//   return (
//     <div className="max-w-6xl">
//       <style>
//         {customScrollbarStyles}
//       </style>

//       {/* Search Container */}
//       <div ref={searchContainerRef} className="relative">
//         {/* Search Bar */}
//         <div
//           className={`border rounded-lg flex items-center p-2 shadow-sm ${isSearchActive ? "ring-2 ring-red-200" : ""}`}
//           onClick={() => setIsSearchActive(true)}
//         >
//           <Search className="text-gray-400 ml-2 mr-3" size={20} />

//           <div className="flex-1 flex flex-wrap gap-2">
//             {selectedDistricts.map((district) => (
//               <div key={district} className="flex items-center bg-gray-100 rounded-md px-2 py-1">
//                 <span className="text-sm">{district}</span>
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation()
//                     removeDistrict(district)
//                   }}
//                   className="ml-1 text-gray-400 hover:text-gray-600"
//                 >
//                   <X size={16} />
//                 </button>
//               </div>
//             ))}
//             <input
//               ref={searchInputRef}
//               type="text"
//               placeholder="Tìm quận/huyện..."
//               className="outline-none flex-1 min-w-[150px]"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onClick={(e) => e.stopPropagation()}
//             />
//           </div>

//           <DropdownMenu open={isProvinceDropdownOpen} onOpenChange={setIsProvinceDropdownOpen}>
//             <DropdownMenuTrigger asChild>
//               <div className="flex items-center border-l pl-3 mr-2 cursor-pointer" onClick={(e) => e.stopPropagation()}>
//                 <span className="text-sm font-medium">{selectedProvince}</span>
//                 <ChevronDown size={16} className="ml-1 text-gray-500" />
//               </div>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-56 max-h-80 overflow-y-auto">
//               {vietnamProvinces.map((province) => (
//                 <DropdownMenuItem
//                   key={province.name}
//                   onClick={() => changeProvince(province.name)}
//                   className={selectedProvince === province.name ? "bg-gray-100" : ""}
//                 >
//                   {province.name}
//                 </DropdownMenuItem>
//               ))}
//             </DropdownMenuContent>
//           </DropdownMenu>

//           <Button className="bg-red-500 hover:bg-red-600 text-white px-6" onClick={(e) => e.stopPropagation()}>
//             Tìm kiếm
//           </Button>
//         </div>

//         {/* District Dropdown */}
//         {isSearchActive && (
//           <div className="absolute z-10 left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg">
//             <div className="p-3 border-b">
//               <div className="flex items-center">
//                 <h2 className="text-base font-medium">Danh sách quận huyện</h2>
//                 <div className="ml-2 text-sm text-gray-500">({selectedProvince})</div>
//               </div>
//             </div>

//             <div className="max-h-[350px] overflow-y-auto custom-scrollbar">
//               {filteredDistricts.length > 0 ? (
//                 <div className="space-y-0">
//                   {filteredDistricts.map((district) => (
//                     <div
//                       key={district}
//                       className="flex items-center justify-between cursor-pointer p-3 hover:bg-gray-50 border-b last:border-b-0"
//                       onClick={(e) => {
//                         e.stopPropagation()
//                         toggleDistrict(district)
//                       }}
//                     >
//                       <div className="flex items-center">
//                         <MapPin className="text-gray-500 mr-2" size={18} />
//                         <span>{district}</span>
//                       </div>
//                       {selectedDistricts.includes(district) && <div className="text-red-500">✓</div>}
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-gray-500 p-4 text-center">
//                   {searchQuery ? "Không tìm thấy quận/huyện phù hợp" : "Chưa có dữ liệu quận/huyện cho tỉnh này"}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

