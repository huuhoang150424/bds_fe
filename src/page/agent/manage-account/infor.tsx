import { format } from "date-fns"
import { Check } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Mock user data
const mockUser = {
  user_id: 1,
  fullname: "Nguyễn Văn A",
  email: "nguyenvana@example.com",
  emailVerified: true,
  phone: "0912 345 678",
  password: "********", // Masked for security
  role: "USER", // Assuming Role enum has USER
  avatar: "/placeholder.svg?height=128&width=128",
  balance: 5750000,
  score: 420,
  created_at: new Date("2023-01-15T08:30:00"),
}

// Mapping for role names in Vietnamese
const roleNames = {
  USER: "Người dùng",
  ADMIN: "Quản trị viên",
  MODERATOR: "Điều hành viên",
}

export function UserProfile() {
  return (
    <Card className="max-w-2xl my-[60px] mx-auto border rounded-[10px] ">
      <CardHeader>
        <CardTitle>Thông Tin Cá Nhân</CardTitle>
        <CardDescription>Xem thông tin cá nhân của bạn</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col items-center mb-6">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={mockUser.avatar} alt={mockUser.fullname} />
              <AvatarFallback>{mockUser.fullname.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-semibold">{mockUser.fullname}</h3>
            <Badge variant="outline" className="mt-1">
              {mockUser.role === "USER"
                ? roleNames.USER
                : mockUser.role === "ADMIN"
                  ? roleNames.ADMIN
                  : roleNames.MODERATOR}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <Label className="text-muted-foreground text-sm">Mã người dùng</Label>
              <p className="font-medium">{mockUser.user_id}</p>
            </div>

            <div className="space-y-1">
              <Label className="text-muted-foreground text-sm">Email</Label>
              <div className="flex items-center gap-2">
                <p className="font-medium">{mockUser.email}</p>
                {mockUser.emailVerified && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 ">
                    <Check className="h-3 w-3 mr-1" />
                  </Badge>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-muted-foreground text-sm">Số điện thoại</Label>
              <p className="font-medium">{mockUser.phone}</p>
            </div>

            <div className="space-y-1">
              <Label className="text-muted-foreground text-sm">Mật khẩu</Label>
              <p className="font-medium">{mockUser.password}</p>
            </div>

            <div className="space-y-1">
              <Label className="text-muted-foreground text-sm">Vai trò</Label>
              <p className="font-medium">
                {mockUser.role === "USER"
                  ? roleNames.USER
                  : mockUser.role === "ADMIN"
                    ? roleNames.ADMIN
                    : roleNames.MODERATOR}
              </p>
            </div>

            <div className="space-y-1">
              <Label className="text-muted-foreground text-sm">Ngày tạo</Label>
              <p className="font-medium">{format(mockUser.created_at, "dd/MM/yyyy")}</p>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-primary/5 rounded-lg p-4">
              <Label className="text-muted-foreground text-sm block mb-1">Số dư</Label>
              <p className="text-2xl font-bold">{mockUser.balance.toLocaleString("vi-VN")} đ</p>
            </div>

            <div className="bg-primary/5 rounded-lg p-4">
              <Label className="text-muted-foreground text-sm block mb-1">Điểm</Label>
              <p className="text-2xl font-bold">{mockUser.score} điểm</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-6">
        <p className="text-xs text-muted-foreground">Cập nhật lần cuối: {format(new Date(), "dd/MM/yyyy")}</p>
      </CardFooter>
    </Card>
  )
}

