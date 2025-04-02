import { Home, ChevronRight } from "lucide-react"

interface HeaderNavigationProps {
  title: string
}

export default function HeaderNavigation({ title }: HeaderNavigationProps) {
  return (
    <header className="sticky top-0 z-10 border-b bg-white">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Home className="h-4 w-4 text-gray-600" />
          <span className="text-sm text-gray-600">Tin tức</span>
          <ChevronRight className="h-3 w-3 text-gray-400" />
          <span className="text-sm text-gray-600 truncate max-w-[200px] md:max-w-md">{title}</span>
        </div>
        <div className="relative">
          <input
            type="search"
            placeholder="Nhập từ khóa tìm kiếm"
            className="py-1 px-3 text-sm border rounded-md w-32 md:w-64"
          />
        </div>
      </div>
    </header>
  )
}

