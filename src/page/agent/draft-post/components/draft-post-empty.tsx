import { Home } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DraftPostsEmptyProps {
  searchQuery: string
}

export function DraftPostsEmpty({ searchQuery }: DraftPostsEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <Home className="h-10 w-10 text-muted-foreground" />
      </div>
      <h2 className="mt-6 text-xl font-semibold">
        {searchQuery ? "Không tìm thấy bất động sản nháp" : "Chưa có bất động sản nháp nào"}
      </h2>
      <p className="mt-2 text-muted-foreground">
        {searchQuery
          ? "Thử tìm kiếm với từ khóa khác hoặc tạo bài đăng mới."
          : "Bắt đầu đăng bất động sản đầu tiên của bạn ngay bây giờ."}
      </p>
      <Button className="mt-6">Tạo bài đăng mới</Button>
    </div>
  )
}

