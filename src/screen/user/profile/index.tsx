import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, MapPin, Eye, Clock, Link2 } from "lucide-react"
import { CustomImage } from '@/components/common';

export default function Profile() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-[300px_1fr] gap-8">
          {/* Profile Section */}
          <div className="space-y-6">
            <div className="text-center">
              <Avatar className="w-32 h-32 mx-auto">
                <AvatarImage src="/placeholder.svg" alt="Agent" />
                <AvatarFallback>NK</AvatarFallback>
              </Avatar>
              <h2 className="mt-4 text-xl font-bold">Nguyễn Đăng Khoa</h2>
              <p className="text-sm text-muted-foreground">Môi giới chuyên nghiệp</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Có chứng chỉ môi giới</span>
                <span>52 tin đăng</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Eye className="w-4 h-4" />
                <span>49.400+ lượt xem tin</span>
              </div>

              <Button className="w-full gap-2">
                <MessageCircle className="w-4 h-4" />
                Chat Zalo
              </Button>

              <div className="flex items-center justify-center gap-4 pt-4">
                <Button variant="ghost" size="icon">
                  <Link2 className="w-4 h-4" />
                </Button>
                {/* Add other social links */}
              </div>
            </div>
          </div>

          {/* Listings Grid */}
          <div className="space-y-6">
            <div className="flex gap-4">
              <Button variant="secondary" className="rounded-full">
                Tin đăng bán (51)
              </Button>
              <Button variant="ghost" className="rounded-full">
                Tin đăng cho thuê (1)
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="relative aspect-video">
                    <CustomImage src="/placeholder.svg" alt="Property" className="object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold line-clamp-2">Căn hộ cao cấp quận 9</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>Quận 9, Hồ Chí Minh</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>2 ngày trước</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-primary font-bold">2.5 tỷ</span>
                        <span className="text-sm text-muted-foreground">75 m²</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      
      
    </div>
  )
}

