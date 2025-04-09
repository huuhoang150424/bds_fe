import { Clock } from "lucide-react"

interface ArticleHeaderProps {
  title: string
  author: string
  publishDate: string
  readTime: string
}

export default function ArticleHeader({ title, author, publishDate, readTime }: ArticleHeaderProps) {
  return (
    <>
      {/* Article Title */}
      <h1 className="text-2xl md:text-3xl font-bold mb-4">{title}</h1>

      {/* Article Meta */}
      <div className="flex items-center mb-6">
        <div className="flex items-center text-red-500 mr-4">
          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-2">
            <Clock className="h-4 w-4 text-red-500" />
          </div>
          <div>
            <p className="text-sm font-medium">Đăng đăng bởi {author}</p>
            <p className="text-xs text-gray-600">
              Cập nhật lần cuối vào {publishDate} • Đọc trong khoảng {readTime}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

