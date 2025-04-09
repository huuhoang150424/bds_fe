"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {featuredProperties} from '@/constant/const-dashboard'

// Định nghĩa interface cho dữ liệu bất động sản
interface Property {
  id: number;
  title: string;
  type: string;
  price: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
}

// Dữ liệu mẫu


// Component chính: FeaturedProperties
export function Prominent() {
  return (
    <section className="py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold tracking-tight">
          Bất động sản nổi bật
        </h2>
        <Button variant="outline" size="sm" className="rounded-md">
          Xem tất cả
        </Button>
      </div>
      <div className="grid gap-[30px] md:grid-cols-2 lg:grid-cols-3">
        {featuredProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
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
          src={property.image}
          alt={property.title}
          className="object-cover w-full h-full"
        />
        <Badge className="absolute top-2 right-2 bg-primary text-white">
          {property.type}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1 truncate">
          {property.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-2 truncate">
          {property.address}
        </p>
        <p className="font-bold text-[#E03C31] mb-3">{property.price}</p>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>{property.bedrooms} Phòng ngủ</span>
          <span>{property.bathrooms} Phòng tắm</span>
          <span>{property.area} m²</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default Prominent;