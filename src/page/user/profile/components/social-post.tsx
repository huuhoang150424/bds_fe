"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ImageIcon, Smile, Sticker, ThumbsUp, MessageCircle, Share2, Gift } from "lucide-react"
import { CustomImage } from '@/components/common';
import { useState } from "react"

export default function SocialPost() {
  const [comment, setComment] = useState("")

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 p-4">
      <Card className="max-w-xl mx-auto bg-zinc-800 border-zinc-700">
        <CardHeader className="space-y-4">
          <div className="flex items-start gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>F</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-semibold">Fantastic</h2>
                <span className="text-xs text-zinc-400">• 4 ngày</span>
              </div>
              <p className="text-sm">Không cần cao để giựt spotlight =))))</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg overflow-hidden">
            <CustomImage src="/placeholder.svg" alt="Post image" width={500} height={500} className="w-full object-cover" />
          </div>
          <div className="flex items-center justify-between text-sm text-zinc-400">
            <div className="flex items-center gap-1">
              <span className="flex items-center gap-1">
                <ThumbsUp className="w-4 h-4 text-blue-500" />
                44
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button className="hover:text-zinc-300">3 bình luận</button>
              <button className="hover:text-zinc-300">2 chia sẻ</button>
            </div>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-zinc-700">
            <Button variant="ghost" className="flex-1 gap-2">
              <ThumbsUp className="w-4 h-4" />
              Thích
            </Button>
            <Button variant="ghost" className="flex-1 gap-2">
              <MessageCircle className="w-4 h-4" />
              Bình luận
            </Button>
            <Button variant="ghost" className="flex-1 gap-2">
              <Share2 className="w-4 h-4" />
              Chia sẻ
            </Button>
          </div>
        </CardContent>
        <CardFooter className="block space-y-4">
          <div className="flex items-start gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="bg-zinc-700 rounded-lg p-2">
                <p className="font-semibold text-sm">Nguyễn Thị Xuân Nga</p>
                <p className="text-sm">Fantastic có ưi để thương quá tr</p>
              </div>
              <div className="flex items-center gap-4 mt-1 text-xs text-zinc-400">
                <button className="hover:text-zinc-300">Thích</button>
                <button className="hover:text-zinc-300">Phản hồi</button>
                <span>4 ngày</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex items-center gap-2 bg-zinc-700/50 rounded-full px-4 py-2">
              <Input
                type="text"
                placeholder="Trả lời Fantastic..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-sm p-0"
              />
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Smile className="w-5 h-5 text-zinc-400" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Sticker className="w-5 h-5 text-zinc-400" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Gift className="w-5 h-5 text-zinc-400" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ImageIcon className="w-5 h-5 text-zinc-400" />
                </Button>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

