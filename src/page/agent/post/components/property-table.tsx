import { useEffect, useRef, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Eye, Pencil, Trash2 } from 'lucide-react';
import { PropertyModal } from './property-modal';
import { Badge } from '@/components/ui/badge';
import { convertDate } from '@/lib/convert-date';

export function formatCurrency(amount: number, currency = 'VND'): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export interface PropertyData {
  createdAt: string;
  updatedAt: string;
  userId: string;
  title: string;
  priceUnit: string;
  address: string;
  price: number;
  squareMeters: number;
  description: string;
  floor: number;
  bedroom: number;
  bathroom: number;
  priority: number;
  isFurniture: boolean;
  direction: string;
  verified: boolean;
  expiredDate: string;
  status: string;
  slug: string;
  user: {
    id: string;
    fullname: string;
    email: string;
    phone: string;
    avatar: string;
  };
  images: {
    imageUrl: string;
  }[];
}

export function PropertyTable({ properties }: { properties: PropertyData[] }) {
  const [selectedProperty, setSelectedProperty] = useState<PropertyData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    dropdownRefs.current = dropdownRefs.current.slice(0, properties.length);
  }, [properties]);

  const handleView = (property: PropertyData, index: number) => {
    if (dropdownRefs.current[index]) {
      dropdownRefs.current[index]?.blur();
    }
    setTimeout(() => {
      setSelectedProperty(property);
      setIsModalOpen(true);
    }, 10);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Đã bàn giao':
        return <Badge className='text-xs font-normal bg-green-500'>Đã bàn giao</Badge>;
      case 'Đã hết hạng':
        return <Badge className='text-xs font-normal bg-red-500'>Đã hết hạng</Badge>;
      case 'Đang bán':
        return <Badge className='text-xs font-normal bg-blue-500'>Đang bán</Badge>;
      case 'Sắp mở bán':
        return <Badge className='text-xs font-normal bg-amber-500'>Sắp mở bán</Badge>;
      default:
        return <Badge className='text-xs font-normal'>{status}</Badge>;
    }
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedProperty(null);
    }, 300);
  };


  console.log('selectedProperty' ,selectedProperty)

  return (
    <div className="rounded-md border relative ">
      <div className="overflow-x-auto custom-scrollbar w-full">
        <Table className="text-xs w-max min-w-full">
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[100px] font-medium whitespace-nowrap sticky left-0 z-20 bg-muted/50">
                Hình ảnh
              </TableHead>
              <TableHead className="w-[250px] font-medium whitespace-nowrap">Tiêu đề</TableHead>
              <TableHead className="w-[150px] font-medium whitespace-nowrap">Giá</TableHead>
              <TableHead className="w-[250px] font-medium whitespace-nowrap">Địa chỉ</TableHead>
              <TableHead className="w-[100px] font-medium whitespace-nowrap">Diện tích</TableHead>
              <TableHead className="w-[100px] font-medium whitespace-nowrap">Phòng ngủ</TableHead>
              <TableHead className="w-[100px] font-medium whitespace-nowrap">Phòng tắm</TableHead>
              <TableHead className="w-[100px] font-medium whitespace-nowrap">Hướng</TableHead>
              <TableHead className="w-[120px] font-medium whitespace-nowrap">Trạng thái</TableHead>
              <TableHead className="w-[150px] font-medium whitespace-nowrap">Ngày tạo</TableHead>
              <TableHead className="w-[150px] font-medium whitespace-nowrap">Ngày hết hạn</TableHead>
              <TableHead className="w-[100px] font-medium text-right whitespace-nowrap sticky right-0 z-20 bg-muted/50">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.map((property,index:number) => (
              <TableRow key={property.title} className="h-16">
                <TableCell className="p-2 sticky left-0 z-10 bg-white dark:bg-gray-950 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                  <div className="flex items-center space-x-1">
                    {property.images.slice(0, 3).map((image, index) => (
                      <div key={index} className="relative w-8 h-8 overflow-hidden rounded-md">
                        <img
                          src={image.imageUrl }
                          alt={property.title}
                          
                          className="object-cover w-full h-full border border-gray-200 "
                        />
                      </div>
                    ))}
                    {property.images.length > 3 && (
                      <span className="text-xs text-muted-foreground">+{property.images.length - 3}</span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium whitespace-nowrap">{property.title}</TableCell>
                <TableCell className="whitespace-nowrap">
                  {formatCurrency(property.price, property.priceUnit)}
                </TableCell>
                <TableCell className="whitespace-nowrap">{property.address}</TableCell>
                <TableCell className="whitespace-nowrap">{property.squareMeters} m²</TableCell>
                <TableCell className="whitespace-nowrap">{property.bedroom}</TableCell>
                <TableCell className="whitespace-nowrap">{property.bathroom}</TableCell>
                <TableCell className="whitespace-nowrap">{property.direction}</TableCell>
                <TableCell className="whitespace-nowrap">{getStatusBadge(property.status)}</TableCell>
                <TableCell className="whitespace-nowrap">{convertDate(property.createdAt)}</TableCell>
                <TableCell className="whitespace-nowrap">{convertDate(property.expiredDate)}</TableCell>
                <TableCell className="text-right sticky right-0 z-10 bg-white dark:bg-gray-950 shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        ref={el => { dropdownRefs.current[index] = el; }}
                        variant="ghost" 
                        className="h-8 w-8 p-0"
                        onBlur={() => {
                        }}
                      >
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      align="end"
                      onCloseAutoFocus={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <DropdownMenuItem onClick={() => handleView(property, index)}>
                        <Eye className="mr-2 h-4 w-4" />
                        <span>Xem</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Pencil className="mr-2 h-4 w-4" />
                        <span>Sửa</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Xóa</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {selectedProperty && (
        <PropertyModal 
          property={selectedProperty} 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}


