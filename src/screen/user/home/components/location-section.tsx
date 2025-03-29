import type { CityInfo } from "@/constant/const-home"

interface LocationSectionProps {
  cityInfos: CityInfo[]
}

export default function LocationSection({ cityInfos }: LocationSectionProps) {
  return (
    <div className="max-w-6xl mx-auto px-[60px] py-[60px]">
      <div className="title flex justify-between items-center pb-[20px]">
        <h2 className="text-[22px] font-bold">Bất động sản theo địa điểm</h2>
      </div>

      <div className="grid grid-cols-7 grid-rows-4 gap-6">
        {cityInfos.map((city, index) => (
          <div
            key={city.name}
            className={`relative rounded-lg overflow-hidden group cursor-pointer
              ${index === 0 ? "col-span-3 row-span-4" : ""} 
              ${index === 1 ? "col-span-2 row-span-2 col-start-4" : ""}
              ${index === 2 ? "col-span-2 row-span-2 col-start-6" : ""}
              ${index === 3 ? "col-span-2 row-span-2 col-start-4 row-start-3" : ""}
              ${index === 4 ? "col-span-2 row-span-2 col-start-6 row-start-3" : ""}`}
          >
            <img
              src={city.image || "/placeholder.svg"}
              alt={city.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold mb-1">{city.name}</h3>
                <p className="text-sm text-gray-200">{city.count.toLocaleString("vi-VN")} tin đăng</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

