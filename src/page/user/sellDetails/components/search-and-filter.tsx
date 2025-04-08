"use client"

import { useState } from "react"
import { X, Search, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

// Vietnamese provinces list
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

// House directions
const houseDirections = ["Đông", "Tây", "Nam", "Bắc", "Đông Bắc", "Đông Nam", "Tây Bắc", "Tây Nam"]

// Sample tag IDs
const tagIds = ["residential", "commercial", "new", "resale", "furnished", "unfurnished", "premium", "budget"]

export default function SearchInterface() {
  const [selectedProvinces, setSelectedProvinces] = useState<string[]>([])
  const [searchInput, setSearchInput] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Filter states
  const [bedrooms, setBedrooms] = useState<string>("")
  const [bathrooms, setBathrooms] = useState<string>("")
  const [floors, setFloors] = useState<string>("")
  const [direction, setDirection] = useState<string>("")
  const [tagId, setTagId] = useState<string>("")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20])
  const [areaRange, setAreaRange] = useState<[number, number]>([0, 500])

  const filteredProvinces = vietnameseProvinces.filter(
    (province) => province.toLowerCase().includes(searchInput.toLowerCase()) && !selectedProvinces.includes(province),
  )

  const handleProvinceSelect = (province: string) => {
    setSelectedProvinces([...selectedProvinces, province])
    setSearchInput("")
  }

  const handleRemoveProvince = (province: string) => {
    setSelectedProvinces(selectedProvinces.filter((p) => p !== province))
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="relative mb-6">
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
                placeholder={selectedProvinces.length === 0 ? "Tìm kiếm tỉnh thành..." : ""}
                className="w-full border-none outline-none text-sm"
              />
            </div>
          </div>

          <Button variant="ghost" size="sm" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>

        {isDropdownOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
            {filteredProvinces.length > 0 ? (
              filteredProvinces.map((province) => (
                <div
                  key={province}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => {
                    handleProvinceSelect(province)
                    setIsDropdownOpen(false)
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

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <Label htmlFor="bedrooms">Số phòng ngủ</Label>
              <Select value={bedrooms} onValueChange={setBedrooms}>
                <SelectTrigger id="bedrooms">
                  <SelectValue placeholder="Chọn số phòng" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5+">5+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="bathrooms">Số phòng tắm</Label>
              <Select value={bathrooms} onValueChange={setBathrooms}>
                <SelectTrigger id="bathrooms">
                  <SelectValue placeholder="Chọn số phòng" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5+">5+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="floors">Số tầng</Label>
              <Select value={floors} onValueChange={setFloors}>
                <SelectTrigger id="floors">
                  <SelectValue placeholder="Chọn số tầng" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5+">5+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="direction">Hướng nhà</Label>
              <Select value={direction} onValueChange={setDirection}>
                <SelectTrigger id="direction">
                  <SelectValue placeholder="Chọn hướng" />
                </SelectTrigger>
                <SelectContent>
                  {houseDirections.map((dir) => (
                    <SelectItem key={dir} value={dir}>
                      {dir}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6">
            <Label htmlFor="tagId">Tag ID</Label>
            <Select value={tagId} onValueChange={setTagId}>
              <SelectTrigger id="tagId">
                <SelectValue placeholder="Chọn Tag ID" />
              </SelectTrigger>
              <SelectContent>
                {tagIds.map((tag) => (
                  <SelectItem key={tag} value={tag}>
                    {tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <Label>Giá (tỷ VNĐ)</Label>
                  <div className="text-sm">
                    {priceRange[0]} - {priceRange[1]} tỷ
                  </div>
                </div>
                <Slider
                  defaultValue={[0, 20]}
                  max={20}
                  step={0.5}
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                  className="my-4"
                />
                <div className="flex justify-between">
                  <div className="w-[48%]">
                    <Label htmlFor="minPrice">Min Price</Label>
                    <Input
                      id="minPrice"
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number.parseFloat(e.target.value), priceRange[1]])}
                      min={0}
                      max={priceRange[1]}
                      step={0.5}
                    />
                  </div>
                  <div className="w-[48%]">
                    <Label htmlFor="maxPrice">Max Price</Label>
                    <Input
                      id="maxPrice"
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number.parseFloat(e.target.value)])}
                      min={priceRange[0]}
                      max={20}
                      step={0.5}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <Label>Diện tích (m²)</Label>
                  <div className="text-sm">
                    {areaRange[0]} - {areaRange[1]} m²
                  </div>
                </div>
                <Slider
                  defaultValue={[0, 500]}
                  max={500}
                  step={10}
                  value={areaRange}
                  onValueChange={(value) => setAreaRange(value as [number, number])}
                  className="my-4"
                />
                <div className="flex justify-between">
                  <div className="w-[48%]">
                    <Label htmlFor="minArea">Min Area</Label>
                    <Input
                      id="minArea"
                      type="number"
                      value={areaRange[0]}
                      onChange={(e) => setAreaRange([Number.parseFloat(e.target.value), areaRange[1]])}
                      min={0}
                      max={areaRange[1]}
                      step={10}
                    />
                  </div>
                  <div className="w-[48%]">
                    <Label htmlFor="maxArea">Max Area</Label>
                    <Input
                      id="maxArea"
                      type="number"
                      value={areaRange[1]}
                      onChange={(e) => setAreaRange([areaRange[0], Number.parseFloat(e.target.value)])}
                      min={areaRange[0]}
                      max={500}
                      step={10}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button className="w-full md:w-auto">Tìm kiếm</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

