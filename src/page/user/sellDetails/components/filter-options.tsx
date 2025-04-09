"use client"

import React from "react"
import { MdKeyboardArrowDown } from "react-icons/md"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"

interface FilterOptionsProps {
  showAreaFilter: boolean
  setShowAreaFilter: (show: boolean) => void
  minArea: string
  setMinArea: (area: string) => void
  maxArea: string
  setMaxArea: (area: string) => void
  selectedAreaOption: string
  handleAreaOptionChange: (value: string) => void
  showPriceFilter: boolean
  setShowPriceFilter: (show: boolean) => void
  minPrice: string
  setMinPrice: (price: string) => void
  maxPrice: string
  setMaxPrice: (price: string) => void
  selectedPriceOption: string
  handlePriceOptionChange: (value: string) => void
}

export default function FilterOptions({
  showAreaFilter,
  setShowAreaFilter,
  minArea,
  setMinArea,
  maxArea,
  setMaxArea,
  selectedAreaOption,
  handleAreaOptionChange,
  showPriceFilter,
  setShowPriceFilter,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  selectedPriceOption,
  handlePriceOptionChange,
}: FilterOptionsProps) {
  const areaOptions = [
    { value: "all", label: "Tất cả diện tích" },
    { value: "0-30", label: "Dưới 30 m²" },
    { value: "30-50", label: "30 - 50 m²" },
    { value: "50-80", label: "50 - 80 m²" },
    { value: "80-100", label: "80 - 100 m²" },
  ]

  const priceOptions = [
    { value: "all", label: "Tất cả mức giá" },
    { value: "0-500", label: "Dưới 500 triệu" },
    { value: "500-800", label: "500 - 800 triệu" },
    { value: "800-1000", label: "800 triệu - 1 tỷ" },
    { value: "1000-2000", label: "1 - 2 tỷ" },
  ]

  const [setSelectedAreaOption, setAreaOption] = React.useState<string>("all")
  const [setSelectedPriceOption, setPriceOption] = React.useState<string>("all")

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 w-full sm:w-[80%]">
      <div className="filter__area flex-1 sm:flex-initial">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Toàn quốc" />
          </SelectTrigger>
          <SelectContent className="flex-col gap-1 p-[15px]">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Chọn theo thành phố/tỉnh thành" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="py-[5px]"></div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Chọn theo thành phố/tỉnh thành" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="py-[5px]"></div>
            <Select>
              <SelectTrigger className="w-[180px] ">
                <SelectValue placeholder="Chọn theo thành phố/tỉnh thành" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="py-[5px]"></div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Chọn theo thành phố/tỉnh thành" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-1 mt-4">
              <Button className="w-[30%] bg-[#fff] text-black hover:bg-[#fff]">Đặt lại</Button>
              <Button className="w-[70%] bg-[#E03C31]">Áp dụng</Button>
            </div>
          </SelectContent>
        </Select>
      </div>

      <Popover open={showAreaFilter} onOpenChange={setShowAreaFilter}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full sm:w-[33%] justify-between bg-white text-gray-600 border">
            <span className="text-sm truncate">Diện tích</span>
            <MdKeyboardArrowDown className="h-4 w-4 flex-shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[90vw] sm:w-[300px] p-0" align="start">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-base">Diện tích</h4>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowAreaFilter(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Diện tích nhỏ nhất</span>
                <span className="text-sm font-medium">Diện tích lớn nhất</span>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  placeholder="Từ"
                  value={minArea}
                  onChange={(e) => setMinArea(e.target.value)}
                  className="flex-1"
                />
                <span>→</span>
                <Input
                  type="text"
                  placeholder="Đến"
                  value={maxArea}
                  onChange={(e) => setMaxArea(e.target.value)}
                  className="flex-1"
                />
              </div>
              <div className="mt-4">
                <Slider
                  defaultValue={[0, 100]}
                  max={100}
                  step={5}
                  value={[Number.parseInt(minArea || "0"), Number.parseInt(maxArea || "100")]}
                  onValueChange={(value) => {
                    setMinArea(value[0].toString())
                    setMaxArea(value[1].toString())
                    setAreaOption("")
                  }}
                />
              </div>
            </div>

            <RadioGroup value={selectedAreaOption} onValueChange={handleAreaOptionChange} className="space-y-2">
              {areaOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} className="text-[#00B4D8] border-[#00B4D8]" />
                  <label htmlFor={option.value} className="text-sm">
                    {option.label}
                  </label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex gap-2 mt-4 border-t pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setMinArea("")
                  setMaxArea("")
                  handleAreaOptionChange("all")
                }}
              >
                Đặt lại
              </Button>
              <Button className="flex-1 bg-[#EF4444] hover:bg-[#FF837A]" onClick={() => setShowAreaFilter(false)}>
                Áp dụng
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <Popover open={showPriceFilter} onOpenChange={setShowPriceFilter}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full sm:w-[33%] justify-between bg-white text-gray-600 border">
            <span className="text-sm truncate">Mức giá</span>
            <MdKeyboardArrowDown className="h-4 w-4 flex-shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[90vw] sm:w-[300px] p-0" align="start">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-base">Mức giá</h4>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowPriceFilter(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Giá thấp nhất</span>
                <span className="text-sm font-medium">Giá cao nhất</span>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  placeholder="Từ"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="flex-1"
                />
                <span>→</span>
                <Input
                  type="text"
                  placeholder="Đến"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="flex-1"
                />
              </div>
              <div className="mt-4">
                <Slider
                  defaultValue={[0, 2000]}
                  max={2000}
                  step={100}
                  value={[Number.parseInt(minPrice || "0"), Number.parseInt(maxPrice || "2000")]}
                  onValueChange={(value) => {
                    setMinPrice(value[0].toString())
                    setMaxPrice(value[1].toString())
                    setPriceOption("")
                  }}
                  className="[&_.bg-\[\#EF4444\]]:bg-[#00B4D8]"
                />
              </div>
            </div>

            <RadioGroup value={selectedPriceOption} onValueChange={handlePriceOptionChange} className="space-y-2">
              {priceOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} className="text-[#00B4D8] border-[#00B4D8]" />
                  <label htmlFor={option.value} className="text-sm">
                    {option.label}
                  </label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex gap-2 mt-4 border-t pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setMinPrice("")
                  setMaxPrice("")
                  handlePriceOptionChange("all")
                }}
              >
                Đặt lại
              </Button>
              <Button className="flex-1 bg-[#EF4444] hover:bg-[#FF837A]" onClick={() => setShowPriceFilter(false)}>
                Áp dụng
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

