
import { CustomImage } from "@/components/common"
import { MapPin, Calendar } from "lucide-react"
import {featuredListings} from '@/constant/constBusiness'


export default function FeaturedListings() {
  return (
    <div className="divide-y">
      {featuredListings.map((listing) => (
        <a href="#" key={listing.id} className="block p-3 hover:bg-gray-50">
          <div className="flex gap-3">
            <CustomImage
              src={listing.image || "/placeholder.svg"}
              alt={listing.title}
              width={80}
              height={60}
              className="rounded-md object-cover w-20 h-16"
            />
            <div className="flex-1">
              <h4 className="font-medium text-sm line-clamp-2">{listing.title}</h4>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{listing.location}</span>
              </div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <Calendar className="h-3 w-3 mr-1" />
                <span>{listing.date}</span>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}

