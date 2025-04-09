"use client"

import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { CustomImage } from "@/components/common"

interface RelatedArticle {
  image: string
  title?: string
}

interface RelatedArticlesProps {
  articles: RelatedArticle[]
  visible: number
  toggleVisible: () => void
}

export default function RelatedArticles({ articles, visible, toggleVisible }: RelatedArticlesProps) {
  return (
    <div className="max-w-4xl mx-auto mt-12 mb-16">
      <h2 className="text-xl font-bold mb-6 pb-2 border-b">Bài viết khác</h2>
      {articles.slice(0, visible).map((article, index) => (
        <Link to={"/new/:id"} key={index}>
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-4 mb-[30px]">
              <div className="relative md:w-1/3 h-48 md:h-auto">
                <div className="absolute top-[10px] left-0 bg-gray-800 text-white text-xs font-medium px-2 py-1 z-10 rounded-l-[10px]">
                  TIN TỨC
                </div>
                <CustomImage
                  src={article.image}
                  alt="Các Kênh Dẫn Vốn"
                  width="auto"
                  height={150}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="md:w-2/3 space-y-2">
                <div className="text-sm text-gray-500 mb-2">15/03/2025 07:55 • Nguyễn Nam</div>
                <h3 className="text-lg font-bold mb-2 hover:text-red-500 transition-colors">
                  <a href="#">Các Kênh Dẫn Vốn Đang Tác Động Như Thế Nào Đến Thị Trường Bất Động Sản Việt Nam?</a>
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                  Tín dụng ngân hàng và phát hành trái phiếu là 2 trong số nhiều kênh dẫn vốn của thị trường bất động
                  sản Việt Nam. Đây cũng là những nguồn vốn đã tác động mạnh đến quá trình lên xuống, sự thăng trầm của
                  thị trường...
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}

      {visible < articles.length && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={toggleVisible}
            className="bg-white text-[#E03C31] hover:bg-[#E03C31] hover:text-white border border-[#E03C31] px-8 py-2 rounded-full transition-colors duration-300"
          >
            Xem thêm
          </Button>
        </div>
      )}
    </div>
  )
}

