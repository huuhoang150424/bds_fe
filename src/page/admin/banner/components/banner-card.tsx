
import { formatDistanceToNow } from "date-fns"
import { Eye, EyeOff, Calendar, ExternalLink, MoreVertical, ArrowUp } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"
import { Link } from "react-router-dom"

interface BannerCardProps {
  banner: {
    banner_id: string
    title: string
    thumb_url: string
    target_url: string
    display_order: number
    is_active: boolean
    start_date: string
    end_date: string
    created_by: {
      user_id: number
      name: string
      avatar: string
    }
    created_at: string
    updated_at: string
  }
  className?: string
}

export default function BannerCard({ banner, className }: BannerCardProps) {
  const start_date = new Date(banner.start_date)
  const end_date = new Date(banner.end_date)
  const now = new Date()

  let status = "upcoming"
  if (now >= start_date && now <= end_date) {
    status = "active"
  } else if (now > end_date) {
    status = "expired"
  }

  return (
    <Card className={cn("overflow-hidden border-red-100 hover:border-red-200 transition-colors", className)}>
      <div className="relative aspect-[3/1]">
        <img src={banner.thumb_url || "/placeholder.svg"} alt={banner.title} className="object-cover" />
        <div className="absolute top-2 right-2 flex gap-1.5">
          <Badge
            variant="secondary"
            className={`text-[10px] font-medium ${
              banner.is_active
                ? "bg-green-100 text-green-700 hover:bg-green-200"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <div className="flex items-center gap-1">
              {banner.is_active ? <Eye className="h-2.5 w-2.5" /> : <EyeOff className="h-2.5 w-2.5" />}
              {banner.is_active ? "Active" : "Inactive"}
            </div>
          </Badge>
          <Badge
            variant="secondary"
            className={`text-[10px] font-medium ${
              status === "active"
                ? "bg-green-100 text-green-700"
                : status === "upcoming"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-amber-100 text-amber-700"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
        <div className="absolute bottom-2 left-2">
          <Badge variant="secondary" className="text-[10px] font-medium bg-red-500 text-white hover:bg-red-600">
            <div className="flex items-center gap-1">
              <ArrowUp className="h-2.5 w-2.5" />
              Order: {banner.display_order}
            </div>
          </Badge>
        </div>
      </div>
      <CardHeader className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <Avatar className="h-6 w-6">
              <AvatarImage src={banner.created_by.avatar || "/placeholder.svg"} alt={banner.created_by.name} />
              <AvatarFallback className="text-[10px] bg-red-100 text-red-500">
                {banner.created_by.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xs font-medium">{banner.created_by.name}</p>
              <p className="text-[10px] text-muted-foreground">
                {formatDistanceToNow(new Date(banner.created_at), { addSuffix: true })}
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <MoreVertical className="h-3 w-3" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="text-xs">
              <DropdownMenuLabel className="text-xs">Actions</DropdownMenuLabel>
              <DropdownMenuItem className="text-xs">Edit</DropdownMenuItem>
              <DropdownMenuItem className="text-xs">{banner.is_active ? "Deactivate" : "Activate"}</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-xs">Duplicate</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive text-xs">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <Link to={`/banners/${banner.banner_id}`} className="group">
          <h3 className="text-sm font-semibold group-hover:text-red-500 transition-colors line-clamp-1">
            {banner.title}
          </h3>
          <div className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
            <ExternalLink className="h-3 w-3" />
            <span className="truncate">{banner.target_url}</span>
          </div>
        </Link>
      </CardContent>
      <CardFooter className="p-3 pt-0 flex items-center justify-between text-[10px] text-muted-foreground border-t border-red-50 mt-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>From: {format(start_date, "MMM dd, yyyy")}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>To: {format(end_date, "MMM dd, yyyy")}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
