import { CustomImage } from "@/components/common"

interface ArticleData {
  title: string
  author: string
  source: string
  publishDate: string
  readTime: string
  mainImage: string
  secondImage: string
  mainImageCaption: string
  secondImageCaption: string
  paragraphs: string[]
  relatedArticles: string[]
}

interface ArticleContentProps {
  article: ArticleData
}

export default function ArticleContent({ article }: ArticleContentProps) {
  return (
    <div className="prose">
      <p className="font-medium mb-4 line-clamp-2">{article.paragraphs[0]}</p>

      <div className="my-6 w-full">
        <CustomImage
          src={article.mainImage || "/placeholder.svg?height=400&width=800"}
          alt={article.mainImageCaption}
          width="full"
          height={400}
          className="w-full rounded-md object-cover"
        />
      </div>

      {article.paragraphs.slice(1, -1).map((paragraph, index) => (
        <p key={index + 1} className="mb-4">
          {paragraph}
        </p>
      ))}

      <div className="my-6 w-full">
        <img src={article.secondImage || "/placeholder.svg"} alt="ảnh nền" className="w-full h-[400px] object-cover" />
        <p className="text-sm text-gray-600 mt-2 italic">{article.secondImageCaption}</p>
      </div>

      <p className="mb-4">{article.paragraphs[article.paragraphs.length - 1]}</p>
    </div>
  )
}

