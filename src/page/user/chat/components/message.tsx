import { motion } from "framer-motion";
import { Bot, User, MapPin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Link } from "react-router-dom";

function Message ( { message }: { message: { content: any; sender: string; id: number } } )
{
  const isUser = message.sender === "user";
  const isBot = message.sender === "bot";
  const content = message.content;
  const isString = typeof content === "string";
  const hasPosts = content?.posts && Array.isArray( content.posts ) && content.posts.length > 0;

  return (
    <motion.div
      key={ message.id }
      initial={ { opacity: 0, y: 10 } }
      animate={ { opacity: 1, y: 0 } }
      transition={ { duration: 0.3 } }
      className={ `flex items-start gap-2 ${ isUser ? "justify-end" : "justify-start" }` }
    >
      { isBot && (
        <Avatar className="h-8 w-8 bg-primary">
          <AvatarFallback>
            <Bot className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      ) }

      { isString ? (
        <div
          className={ cn(
            "rounded-lg px-3 py-2 max-w-[85%]",
            isUser ? "bg-blue-500 text-white" : "bg-gray-100 text-black"
          ) }
        >
          <p className="text-sm">{ content }</p>
        </div>
      ) : hasPosts ? (
        <div className="w-[85%] rounded-lg overflow-hidden">
          <div className="p-2 font-medium text-sm">Danh sách kết quả</div>
          <div className="flex flex-col gap-[10px]">
            { content.posts.map( ( post: any ) => (
              <div
                key={ post?.id }
                className="p-3 hover:bg-muted/50 transition-colors relative border border-gray-200 rounded-[8px]"
              >
                <div className="flex gap-3">
                  <div className="relative min-w-[100px] h-[75px] rounded-md overflow-hidden">
                    <img
                      src={ post?.images[ 0 ]?.imageUrl }
                      alt={ post?.title }
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                      { post?.images.length }
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-xs line-clamp-2">{ post?.title }</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-red-500 font-bold text-xs">
                        { Math.round( post?.price ).toLocaleString( 'vi-VN' ) }
                      </span>

                      <span className="text-xs">{ post?.priceUnit }</span>
                      <span className="text-xs">{ post?.squareMeters }</span>
                      <span className="text-xs">m^2</span>
                      <span className="text-xs text-muted-foreground">{ post?.pricePerMeter }</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{ post?.address }</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Đăng { formatDistanceToNow( new Date( post?.createdAt ), { addSuffix: true, locale: vi } ) }
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <Button variant="outline" size="sm" className="h-7 text-xs">
                    <Link to={`post/${post?.slug}`} className="">
                      Quan tâm
                    </Link>
                  </Button>
                </div>
              </div>
            ) ) }
          </div>
        </div>
      ) : (
        <div className="rounded-lg px-3 py-2 max-w-[85%] bg-gray-100 text-black">
          <p className="text-sm">{ content?.message || "Không có thông tin để hiển thị" }</p>
        </div>
      ) }

      { isUser && (
        <Avatar className="h-8 w-8 bg-blue-500">
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      ) }
    </motion.div>
  );
}

export default Message;