import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {  type PropertyData } from './property-table';

interface PropertyModalProps {
  property: PropertyData;
  isOpen: boolean;
  onClose: () => void;
}

export function PropertyModal({ property, isOpen, onClose }: PropertyModalProps) {

  
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent className='sm:max-w-[700px] max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='text-lg'>{property.title}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue='details'>
          <TabsList className='grid w-full grid-cols-2 border border-gray-200 '>
            <TabsTrigger className='data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm ' value='details'>Chi tiết</TabsTrigger>
            <TabsTrigger className='data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm ' value='images'>Hình ảnh</TabsTrigger>
          </TabsList>

          <TabsContent value='details'>
            <div className='grid grid-cols-2 gap-4 py-4 text-sm'>
              <Card className='border border-gray-200 rounded-[6px]'>
                <CardContent className='p-4 space-y-2'>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Giá:</span>
                    <span className='font-medium '>
                    {property?.price?.toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </span>
                  {property?.priceUnit}
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Diện tích:</span>
                    <span>{property.squareMeters} m²</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Phòng ngủ:</span>
                    <span>{property.bedroom}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Phòng tắm:</span>
                    <span>{property.bathroom}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Tầng:</span>
                    <span>{property.floor}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className='border border-gray-200 rounded-[6px]'>
                <CardContent className='p-4 space-y-2'>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Hướng:</span>
                    <span>{property.direction}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Nội thất:</span>
                    <span>{property.isFurniture ? 'Có' : 'Không'}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Trạng thái:</span>
                    <Badge>{property.status}</Badge>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Ngày tạo:</span>
                    <span>{new Date(property.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Ngày hết hạn:</span>
                    <span>{new Date(property.expiredDate).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>

              <div className='col-span-2'>
                <Card className='border border-gray-200 rounded-[6px]'>
                  <CardContent className='p-4'>
                    <h3 className='font-medium mb-2'>Địa chỉ</h3>
                    <p>{property.address}</p>
                  </CardContent>
                </Card>
              </div>

              <div className='col-span-2'>
                <Card className='border border-gray-200 rounded-[6px]'>
                  <CardContent className='p-4'>
                    <h3 className='font-medium mb-2'>Mô tả</h3>
                    <div className="" dangerouslySetInnerHTML={{ __html:property.description || '' }} ></div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value='images'>
            <div className='grid grid-cols-2 gap-4 py-4'>
              {property.images.map((image, index) => (
                <div key={index} className='relative aspect-video  '>
                  <img src={image.imageUrl} alt={`${property.title} - Ảnh ${index + 1}`} className='object-cover w-full h-full border border-gray-300 rounded-md' />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
