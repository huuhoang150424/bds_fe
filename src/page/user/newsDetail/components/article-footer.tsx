import { Facebook, Linkedin, Twitter } from "lucide-react"

interface ArticleFooterProps {
  author: string
  source: string
  publishDate: string
}

export default function ArticleFooter({ author, source, publishDate }: ArticleFooterProps) {
  return (
    <div className="mt-8 pt-4 border-t">
      <div className="flex flex-wrap justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">Tác giả: {author}</p>
          <p className="text-sm text-gray-600">Nguồn tin: {source}</p>
          <p className="text-sm text-gray-600">Thời gian xuất bản: {publishDate}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-sm text-gray-600 mb-2">Chia sẻ với mọi người:</p>
          <div className="flex space-x-2">
            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <Facebook className="h-4 w-4 text-gray-600" />
            </button>
            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <Linkedin className="h-4 w-4 text-gray-600" />
            </button>
            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <Twitter className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

