import type React from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X, Bot, User, MapPin, Search, Heart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Property
{
  id: number
  title: string
  price: string
  size: string
  pricePerMeter: string
  location: string
  date: string
  images: string[]
}

interface ChatUser
{
  id: number
  name: string
  avatar: string
  status: "online" | "offline" | "away"
  lastSeen?: string
}

interface Message
{
  id: number
  content: string | Property[]
  sender: "user" | "bot"
  timestamp: Date
  type: "text" | "listings"
}

export default function RealEstateChat ()
{
  const [ isOpen, setIsOpen ] = useState( false )
  const [ input, setInput ] = useState( "" )
  const [ selectedUser, setSelectedUser ] = useState<number | null>( null )
  const [ messages, setMessages ] = useState<Message[]>( [
    {
      id: 1,
      content: "Xin chào! Tôi là trợ lý bất động sản. Bạn muốn tìm kiếm bất động sản nào?",
      sender: "bot",
      timestamp: new Date(),
      type: "text",
    },
  ] )

  const properties: Property[] = [
    {
      id: 1,
      title: "Bán nhà biệt thự mini mới xây hiện đại full nội thất ngang 7,5x12m trong trung tâm quận 10",
      price: "25,2 tỷ",
      size: "100 m²",
      pricePerMeter: "252 triệu/m²",
      location: "Phường 8, Quận 10, Hồ Chí Minh",
      date: "28/03/2025",
      images: [ "https://vn.toto.com/wp-content/uploads/2024/07/thiet-ke-nha-1.webp" ],
    },
    {
      id: 2,
      title: "Biệt thự khu cao cấp Phan Kế Bình, Đa Kao Quận 1. Không có căn thứ 2",
      price: "140 tỷ",
      size: "224,5 m²",
      pricePerMeter: "623,608 triệu/m²",
      location: "20 Đường Phan Kế Bình, Phường Đa Kao, Quận 1, Hồ Chí Minh",
      date: "27/03/2025",
      images: [ "https://vn.toto.com/wp-content/uploads/2024/07/thiet-ke-nha-1.webp" ],
    },
    {
      id: 3,
      title: "Chính chủ bán biệt thự Nam Kỳ Khởi Nghĩa, Phường 6, quận 3. DT: 25x25m. 2 tầng. Giá 160 tỷ",
      price: "160 tỷ",
      size: "625 m²",
      pricePerMeter: "256 triệu/m²",
      location: "Nam Kỳ Khởi Nghĩa, Phường 6, Quận 3, Hồ Chí Minh",
      date: "26/03/2025",
      images: [ "https://vn.toto.com/wp-content/uploads/2024/07/thiet-ke-nha-1.webp" ],
    },
  ]

  const toggleChat = () =>
  {
    setIsOpen( !isOpen )
  }

  const handleSendMessage = ( e: React.FormEvent ) =>
  {
    e.preventDefault()
    if ( !input.trim() ) return
    const userMessage: Message = {
      id: messages.length + 1,
      content: input,
      sender: "user",
      timestamp: new Date(),
      type: "text",
    }

    setMessages( [ ...messages, userMessage ] );
    setInput( "" );
    setTimeout( () =>
    {
      const botMessage: Message = {
        id: messages.length + 2,
        content: properties,
        sender: "bot",
        timestamp: new Date(),
        type: "listings",
      }
      setMessages( ( prev ) => [ ...prev, botMessage ] )
    }, 1000 )
  }

  const handleUserSelect = ( userId: number ) =>
  {
    setSelectedUser( userId === selectedUser ? null : userId )
  }

  function UsersList ()
  {
    const users: ChatUser[] = [
      {
        id: 1,
        name: "Nguyễn Văn A",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "online",
      },
      {
        id: 2,
        name: "Trần Thị B",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "online",
      },
      {
        id: 3,
        name: "Lê Văn C",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "away",
        lastSeen: "10 phút trước",
      },
      {
        id: 4,
        name: "Phạm Thị D",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "offline",
        lastSeen: "1 giờ trước",
      },
      {
        id: 5,
        name: "Hoàng Văn E",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "online",
      },
      {
        id: 6,
        name: "Ngô Thị F",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "offline",
        lastSeen: "2 giờ trước",
      },
      {
        id: 7,
        name: "Đỗ Văn G",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "away",
        lastSeen: "30 phút trước",
      },
      {
        id: 8,
        name: "Vũ Thị H",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "online",
      },
      {
        id: 9,
        name: "Bùi Văn I",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "offline",
        lastSeen: "3 giờ trước",
      },
      {
        id: 10,
        name: "Dương Thị K",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "away",
        lastSeen: "45 phút trước",
      },
      {
        id: 11,
        name: "Lý Văn L",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "online",
      },
      {
        id: 12,
        name: "Hồ Thị M",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "offline",
        lastSeen: "1 ngày trước",
      },
    ]

    return (
      <div className="flex flex-col">
        { users.map( ( user ) => (
          <div
            key={ user.id }
            className={ cn(
              "flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors cursor-pointer",
              selectedUser === user.id && "bg-muted",
            ) }
            onClick={ () => handleUserSelect( user.id ) }
          >
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarFallback>{ user.name.charAt( 0 ) }</AvatarFallback>
              </Avatar>
              <span
                className={ cn(
                  "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white",
                  user.status === "online" ? "bg-green-500" : user.status === "away" ? "bg-yellow-500" : "bg-gray-400",
                ) }
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">{ user.name }</p>
              <p className="text-xs text-muted-foreground truncate">
                { user.status === "online"
                  ? "Đang hoạt động"
                  : user.status === "away"
                    ? `Vắng mặt - ${ user.lastSeen }`
                    : `Ngoại tuyến - ${ user.lastSeen }` }
              </p>
            </div>
            { selectedUser === user.id && <Check className="h-4 w-4 text-primary" /> }
          </div>
        ) ) }
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 left-4 z-[9999999999] ">
      <AnimatePresence>
        { isOpen ? (
          <motion.div
            initial={ { scale: 0.5, opacity: 0 } }
            animate={ { scale: 1, opacity: 1 } }
            exit={ { scale: 0.5, opacity: 0 } }
            transition={ { type: "spring", stiffness: 300, damping: 30 } }
            className="mb-4"
          >
            <Card className="w-[800px] rounded-[8px] shadow-lg overflow-hidden border border-gray-200">
              <CardHeader className="bg-red-500  text-primary-foreground p-4 flex flex-row justify-between items-center">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  <h3 className="font-semibold">Trợ lý bất động sản</h3>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={ toggleChat }
                  className="h-8 w-8 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <div className="flex">
                {/* Chat area */ }
                <div className="flex-1 border-r flex flex-col">
                  <CardContent className="p-0 flex-1">
                    <ScrollArea className="h-[450px]">
                      <div className="p-4 space-y-4">
                        { messages.map( ( message ) => (
                          <motion.div
                            key={ message.id }
                            initial={ { opacity: 0, y: 10 } }
                            animate={ { opacity: 1, y: 0 } }
                            transition={ { duration: 0.3 } }
                            className={ `flex items-start gap-2 ${ message.sender === "user" ? "justify-end" : "" }` }
                          >
                            { message.sender === "bot" && (
                              <Avatar className="h-8 w-8 bg-primary">
                                <AvatarFallback>
                                  <Bot className="h-4 w-4" />
                                </AvatarFallback>
                              </Avatar>
                            ) }

                            { message.type === "text" ? (
                              <div
                                className={ cn(
                                  "rounded-lg px-3 py-2 max-w-[85%]",
                                  message.sender === "user" ? "bg-blue-500 text-white" : "bg-muted",
                                ) }
                              >
                                <p className="text-sm">{ message.content as string }</p>
                                <p className="text-xs opacity-70 mt-1">
                                  { message.timestamp.toLocaleTimeString( [], { hour: "2-digit", minute: "2-digit" } ) }
                                </p>
                              </div>
                            ) : (
                              <div className="w-[85%] bg-gray-50 rounded-lg overflow-hidden">
                                <div className="p-2 bg-gray-100 border-b font-medium text-sm">Danh sách kết quả</div>
                                <div className="flex flex-col">
                                  { ( message.content as Property[] ).map( ( property ) => (
                                    <div
                                      key={ property.id }
                                      className="p-3 border-b hover:bg-muted/50 transition-colors relative"
                                    >
                                      <div className="flex gap-3">
                                        <div className="relative min-w-[100px] h-[75px] rounded-md overflow-hidden">
                                          <img
                                            src={ property.images[ 0 ] || "/placeholder.svg" }
                                            alt={ property.title }
                                            className="object-cover w-full h-full"
                                          />
                                          <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                                            { property.images.length }
                                          </div>
                                        </div>
                                        <div className="flex-1">
                                          <h3 className="font-medium text-xs line-clamp-2">{ property.title }</h3>
                                          <div className="flex items-center gap-2 mt-1">
                                            <span className="text-red-500 font-bold text-xs">{ property.price }</span>
                                            <span className="text-xs">•</span>
                                            <span className="text-xs">{ property.size }</span>
                                            <span className="text-xs">•</span>
                                            <span className="text-xs text-muted-foreground">
                                              { property.pricePerMeter }
                                            </span>
                                          </div>
                                          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                                            <MapPin className="h-3 w-3" />
                                            <span className="truncate">{ property.location }</span>
                                          </div>
                                          <div className="text-xs text-muted-foreground mt-1">
                                            Đăng vào ngày { property.date }
                                          </div>
                                        </div>
                                      </div>
                                      <div className="flex gap-2 mt-2">
                                        <Button variant="outline" size="sm" className="flex-1 h-7 text-xs">
                                          <Search className="h-3 w-3 mr-1" /> Phân tích
                                        </Button>
                                        <Button variant="outline" size="sm" className="flex-1 h-7 text-xs">
                                          <Heart className="h-3 w-3 mr-1" /> Quan tâm
                                        </Button>
                                      </div>
                                      <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                                        { property.id }
                                      </div>
                                    </div>
                                  ) ) }
                                </div>
                                <p className="text-xs opacity-70 p-2 text-right">
                                  { message.timestamp.toLocaleTimeString( [], { hour: "2-digit", minute: "2-digit" } ) }
                                </p>
                              </div>
                            ) }

                            { message.sender === "user" && (
                              <Avatar className="h-8 w-8 bg-blue-500">
                                <AvatarFallback>
                                  <User className="h-4 w-4" />
                                </AvatarFallback>
                              </Avatar>
                            ) }
                          </motion.div>
                        ) ) }
                      </div>
                    </ScrollArea>
                  </CardContent>
                  <CardFooter className="p-3 border-t">
                    <form onSubmit={ handleSendMessage } className="flex w-full gap-2">
                      <Input
                        placeholder="Nhập yêu cầu tìm kiếm..."
                        value={ input }
                        onChange={ ( e ) => setInput( e.target.value ) }
                        className="flex-1"
                      />
                      <Button type="submit" size="icon" className="rounded-full">
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </CardFooter>
                </div>

                {/* Users list */ }
                <div className="w-[250px]">
                  <div className="p-3 border-b">
                    <h3 className="font-medium text-sm">Danh sách người dùng</h3>
                    { selectedUser && (
                      <p className="text-xs text-muted-foreground mt-1">Đã chọn người dùng #{ selectedUser }</p>
                    ) }
                  </div>
                  <ScrollArea className="h-[450px]">
                    <UsersList />
                  </ScrollArea>
                </div>
              </div>
            </Card>
          </motion.div>
        ) : null }
      </AnimatePresence>


      <motion.div whileHover={ { scale: 1.1 } } whileTap={ { scale: 0.9 } }>
        <Button variant={ 'outline' } onClick={ toggleChat } size="icon" className="h-14 w-14 rounded-full shadow-lg bg-red-500 hover:bg-red-[400] transition-all duration-300 ease-in-out">
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      </motion.div>
    </div>
  )
}



