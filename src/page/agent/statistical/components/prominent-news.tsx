
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {featuredProperties} from '@/constant/const-dashboard'
import { useGetPostOutstanding } from "../hooks/use-get-post-oustanding";
import { Key } from "lucide-react";
import { Link } from "react-router-dom";

interface propertyType {
  name : string
}

interface images {
  image_url : string
}
// Định nghĩa interface cho dữ liệu bất động sản
interface Property {
  id: number;
  title: string;
  slug: string;
  score: number;
  price: number;
  address: string;
  bedrooms: number;
  bathrooms: number;
  squareMeters: number;
  status : string;
  createdAt: string;
  propertyType : propertyType[];
  images: images[];
}

// Dữ liệu 



// Component chính: FeaturedProperties
export function Prominent() {
  const {data, isLoading, isError} = useGetPostOutstanding() ;
  // console.log("data outstanding", data?.data);
  return (
    <section className="py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold tracking-tight">
          Bất động sản nổi bật
        </h2>
        <Button variant="outline" size="sm" className="rounded-md">
          <Link to={'/post'}>Xem tất cả</Link>
        </Button>
      </div>
      <div className="grid gap-[30px] md:grid-cols-2 lg:grid-cols-3">
        {data?.data.slice(0,3).map((property : Property) => (
          <Link key={`${property?.id}-index`} to={`/post/${property?.slug}`}>
          <PropertyCard key={property.id} property={property} />
          </Link> 
        ))}
      </div>
    </section>
  );
}

// Component con: PropertyCard
export function PropertyCard({ property }: { property: Property }) {
  return (
    <Card className="overflow-hidden rounded-lg  transition-shadow duration-200 border border-gray-200 hover:shadow-xl">
      <div className="relative aspect-video">
        <img
          src={property?.images[0]?.image_url}
          alt={property?.title}
          className="object-cover w-full h-full"
        />
        <Badge className="absolute top-2 right-2 bg-primary text-white">
          {property?.score} điểm
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1 truncate">
          {property?.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-2 truncate">
          {property?.address}
        </p>
        <p className="font-bold text-[#E03C31] mb-3">{Math.round(property?.price).toLocaleString('vi-VN')}</p>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>{property?.propertyType[0]?.name}</span>
          {/* <span>{property.bedrooms} Phòng ngủ</span>
          <span>{property.bathrooms} Phòng tắm</span> */}
          <span>{property?.squareMeters} m²</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default Prominent;