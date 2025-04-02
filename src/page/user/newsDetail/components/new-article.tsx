"use client"

import { useState } from "react"
import { article, anotherArticle } from "@/constant/constNewsDetail"
import HeaderNavigation from "./header-navigation"
import ArticleHeader from "./article-header"
import ArticleContent from "./article-content"
import ArticleFooter from "./article-footer"
import RelatedArticles from "./relate-article"
import MostViewedArticles from "./most-view-article"


function NewsArticle() {
  const [visible, setVisible] = useState<number>(3)

  const toggleVisible = () => {
    setVisible((prev) => prev + 3)
  }

  return (
    <div className="flex flex-col max-w-6xl bg-white pt-[80px] mx-auto">
      {/* Header Navigation */}
      <HeaderNavigation title={article.title} />

      <div className="px-4 py-4">
        {/* Article Title and Meta */}
        <ArticleHeader
          title={article.title}
          author={article.author}
          publishDate={article.publishDate}
          readTime={article.readTime}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-7 px-4 pb-6">
        <article className="col-span-8">
          {/* Article Content */}
          <ArticleContent article={article} />

          {/* Article Footer */}
          <ArticleFooter author={article.author} source={article.source} publishDate={article.publishDate} />

          {/* Related Articles */}
          <RelatedArticles articles={anotherArticle} visible={visible} toggleVisible={toggleVisible} />
        </article>

        {/* Most Viewed Articles Sidebar */}
        <div className="col-span-4">
          <MostViewedArticles relatedArticles={article.relatedArticles} />
        </div>
      </div>
    </div>
  )
}

export default NewsArticle

