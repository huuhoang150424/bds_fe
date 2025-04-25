import type React from "react"
import { cn } from "@/lib/utils"

interface CardInfoProps {
  icon: React.ReactNode
  title: string
  value: React.ReactNode
  className?: string
}

export function CardInfo({ icon, title, value, className }: CardInfoProps) {
  return (
    <div
      className={cn("flex items-center gap-3 bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm", className)}
    >
      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-red-100 to-rose-100 rounded-full flex items-center justify-center text-red-600">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <div className="text-base font-[400] text-gray-600 mt-[2px] ">{value}</div>
      </div>
    </div>
  )
}
