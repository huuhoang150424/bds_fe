import { Link } from "react-router-dom"

interface MostViewedArticlesProps {
  relatedArticles: string[]
}

export default function MostViewedArticles({ relatedArticles }: MostViewedArticlesProps) {
  return (
    <div className="border rounded-[8px]">
      <div className="font-[500] text-lg text-center p-[15px]">
        <span>Bài viết được xem nhiều nhất</span>
      </div>
      <div className="border border-gray-100 col-span-12 mb-[20px]"></div>
      <div>
        {relatedArticles.map((news, index) => (
          <Link to={"/new/:id"} key={index}>
            <div className="px-[20px]">
              <div className="flex items-center justify-start gap-4">
                <div className="rounded-[50%] w-[32px] h-[32px] text-[#E03C31] bg-[#FFECEB] p-[8px] flex items-center justify-center">
                  <span>{index + 1}</span>
                </div>
                <div>{news}</div>
              </div>
              <div className="border border-gray-100 my-[20px]"></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

