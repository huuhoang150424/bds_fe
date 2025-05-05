import {
  Bed,
  Bath,
  ArrowRightIcon as ArrowsOutCardinal,
  Building,
  Check,
  Navigation,
  Calendar,
  Heart,
  Share2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { formatCurrency } from '@/page/admin/pricing/components/column';
import { Link } from 'react-router-dom';

interface PropertyCardProps {
  property: any;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const {
    title,
    price,
    priceUnit,
    address,
    squareMeters,
    bedroom,
    bathroom,
    floor,
    direction,
    status,
    verified,
    expiredDate,
    images,
    propertyType,
  } = property;

  const formattedPrice = formatCurrency(price);
  const propertyTypeText = propertyType[0]?.name || 'Bất động sản';
  const listingTypeText = propertyType[0]?.listingType?.listingType || '';
  const expireDate = new Date(expiredDate);
  const daysLeft = Math.ceil((expireDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Đang đàm phán':
        return 'bg-amber-500 hover:bg-amber-600';
      case 'Đang bán':
        return 'bg-emerald-500 hover:bg-emerald-600';
      default:
        return 'bg-sky-500 hover:bg-sky-600';
    }
  };


  return (
    <Card className="overflow-hidden group transition-all duration-200 h-full flex flex-col rounded-lg border border-gray-200">
      <div className="relative h-32 w-full overflow-hidden">
        <div className="w-full h-full p-1">
          <img
            src={images[0]?.imageUrl}
            className="w-full h-full object-cover rounded-[6px] "
            alt={title}
          />
        </div>
        <div className="absolute top-1.5 left-1.5 z-10 flex gap-0.5">
          <Badge className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-medium px-1.5 py-0.3 rounded-full text-[10px]">
            {listingTypeText}
          </Badge>
          <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium px-1.5 py-0.3 rounded-full text-[10px]">
            {propertyTypeText}
          </Badge>
        </div>
        {verified && (
          <Badge className="absolute top-1.5 right-1.5 z-10 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium px-1.5 py-0.3 rounded-full text-[10px]">
            <Check className="mr-0.5 h-2.5 w-2.5" /> Xác thực
          </Badge>
        )}
        <Badge
          className={`absolute bottom-1.5 right-1.5 z-10 ${getStatusColor(status)} text-white font-medium px-1.5 py-0.3 rounded-full text-[10px]`}
        >
          {status}
        </Badge>
        <div className="absolute top-[100px] left-[15px] z-10 flex gap-0.5">
          <button className="bg-white/90 hover:bg-white p-0.5 rounded-full transition-all duration-200 text-gray-500 hover:text-rose-500 hover:scale-105">
            <Heart className="h-3.5 w-3.5" />
          </button>
          <button className="bg-white/90 hover:bg-white p-0.5 rounded-full transition-all duration-200 text-gray-500 hover:text-blue-500 hover:scale-105">
            <Share2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <CardContent className="flex-grow pt-2 px-3">
        <h3 className="text-base font-semibold line-clamp-1 mb-1.5 text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
          {title}
        </h3>
        <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600 mb-2">
          {formattedPrice}
        </p>
        <p className="text-gray-600 text-xs mb-2 line-clamp-1 flex items-center">
          <span className="inline-block mr-1 text-gray-400">
            <Navigation className="h-3.5 w-3.5" />
          </span>
          {address}
        </p>

        <div className="grid grid-cols-2 gap-1 text-xs text-gray-700 mb-2">
          <div className="flex items-center bg-gray-50 p-1.5 rounded-md hover:bg-gray-100 transition-colors duration-200">
            <ArrowsOutCardinal className="h-3.5 w-3.5 mr-1.5 text-blue-500" />
            <span>{squareMeters} m²</span>
          </div>
          <div className="flex items-center bg-gray-50 p-1.5 rounded-md hover:bg-gray-100 transition-colors duration-200">
            <Bed className="h-3.5 w-3.5 mr-1.5 text-blue-500" />
            <span>{bedroom} PN</span>
          </div>
          <div className="flex items-center bg-gray-50 p-1.5 rounded-md hover:bg-gray-100 transition-colors duration-200">
            <Bath className="h-3.5 w-3.5 mr-1.5 text-blue-500" />
            <span>{bathroom} PT</span>
          </div>
          <div className="flex items-center bg-gray-50 p-1.5 rounded-md hover:bg-gray-100 transition-colors duration-200">
            <Building className="h-3.5 w-3.5 mr-1.5 text-blue-500" />
            <span>Tầng {floor}</span>
          </div>
        </div>

        <div className="mt-1.5 flex items-center text-xs text-gray-600 bg-gray-50 p-1.5 rounded-md hover:bg-gray-100 transition-colors duration-200">
          <Navigation className="h-3.5 w-3.5 mr-1.5 text-blue-500" />
          <span>Hướng: {direction}</span>
        </div>
      </CardContent>

      <CardFooter className="border-t pt-2 px-3 pb-3 flex justify-between items-center">
        <div className="flex items-center text-xs text-gray-600 bg-gray-50 p-1.5 rounded-md hover:bg-gray-100 transition-colors duration-200">
          <Calendar className="h-3.5 w-3.5 mr-1.5 text-amber-500" />
          <span>Còn {daysLeft} ngày</span>
        </div>
        <Link
          to={`/post/${property.slug}`}
          className="text-xs font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 px-2.5 py-1.5 rounded-md transition-all duration-200 hover:scale-105"
        >
          Chi tiết
        </Link>
      </CardFooter>
    </Card>
  );
}