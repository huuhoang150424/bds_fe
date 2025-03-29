"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { newsByTab } from "@/constant/const-home"

interface NewsItem {
  title: string
  time: string
  img: string
  description?: string
}

interface NewsData {
  highlight: NewsItem[]
  news: NewsItem[]
  "bds-tphcm": NewsItem[]
  "bds-hanoi": NewsItem[]
}

export default function NewsSection() {
  const [activeNewsTab, setActiveNewsTab] = useState<keyof NewsData>("highlight")

  return (
    <div className="max-w-5xl mx-auto p-[60px]">
      <Tabs value={String(activeNewsTab)} onValueChange={(value: string) => setActiveNewsTab(value as keyof NewsData)}>
        <div className="flex items-center justify-between">
          <TabsList className="mb-4 border-b flex flex-wrap gap-2 md:gap-4">
            <TabsTrigger
              value="highlight"
              className={cn(
                "font-semibold border-b-2 transition-colors",
                activeNewsTab === "highlight" ? "border-red-500 text-red-500" : "border-transparent",
              )}
            >
              Tin nổi bật
            </TabsTrigger>
            <TabsTrigger
              value="news"
              className={cn(
                "font-semibold border-b-2 transition-colors",
                activeNewsTab === "news" ? "border-red-500 text-red-500" : "border-transparent",
              )}
            >
              Tin tức
            </TabsTrigger>
            <TabsTrigger
              value="bds-tphcm"
              className={cn(
                "font-semibold border-b-2 transition-colors",
                activeNewsTab === "bds-tphcm" ? "border-red-500 text-red-500" : "border-transparent",
              )}
            >
              BĐS TPHCM
            </TabsTrigger>
            <TabsTrigger
              value="bds-hanoi"
              className={cn(
                "font-semibold border-b-2 transition-colors",
                activeNewsTab === "bds-hanoi" ? "border-red-500 text-red-500" : "border-transparent",
              )}
            >
              BĐS Hà Nội
            </TabsTrigger>
          </TabsList>
          <Button variant="link" className="text-red-500">
            Xem thêm →
          </Button>
        </div>

        <TabsContent value={String(activeNewsTab)} className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="col-span-1 md:col-span-2 border-none shadow-none">
              <div className="relative h-48 rounded-lg overflow-hidden">
                <img
                  src={newsByTab[activeNewsTab][0].img || "/placeholder.svg"}
                  alt={newsByTab[activeNewsTab][0].title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="mt-2 px-0">
                <h3 className="text-lg font-semibold hover:text-red-500 cursor-pointer transition-colors">
                  {newsByTab[activeNewsTab][0].title}
                </h3>
                <p className="text-gray-500 text-sm flex items-center mt-1">⏳ {newsByTab[activeNewsTab][0].time}</p>
                {newsByTab[activeNewsTab][0].description && (
                  <p className="text-gray-600 mt-2 text-sm line-clamp-2">{newsByTab[activeNewsTab][0].description}</p>
                )}
              </CardContent>
            </Card>

            <div className="space-y-3">
              {newsByTab[activeNewsTab].slice(1).map((item: NewsItem, index: number) => (
                <div
                  key={index}
                  className="border-b pb-2 last:border-none hover:bg-gray-50 transition-colors rounded p-2 cursor-pointer"
                >
                  <h4 className="text-sm font-semibold hover:text-red-500 transition-colors">{item.title}</h4>
                  <p className="text-gray-500 text-xs flex items-center mt-1">⏳ {item.time}</p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

