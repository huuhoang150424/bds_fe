import type React from 'react';
import { useState, useEffect } from 'react';
import {
  Home,
  MapPin,
  DollarSign,
  SquareIcon as SquareFootage,
  Building,
  Bed,
  Bath,
  Compass,
  Star,
  Calendar,
  FileText,
  ImageIcon,
  TagIcon,
  Trash2,
  Loader2,
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { CardInfo } from './card-info';
import { FileUpload } from './file-upload';
import { SuccessNotification } from './success-notification';
import Ckeditor from '../CKEditor';

const PriceUnit = {
  VND: 'VND',
  USD: 'USD',
};

const Directions = {
  NORTH: 'Bắc',
  SOUTH: 'Nam',
  EAST: 'Đông',
  WEST: 'Tây',
  NORTHEAST: 'Đông Bắc',
  NORTHWEST: 'Tây Bắc',
  SOUTHEAST: 'Đông Nam',
  SOUTHWEST: 'Tây Nam',
};

const StatusPost = {
  AVAILABLE: 'Còn trống',
  NEGOTIATING: 'Đang đám phán',
  DELIVERED: 'Đã bàn giao',
};
const sampleTags = [
  { id: '1', tagName: 'Gần trung tâm' },
  { id: '2', tagName: 'View đẹp' },
  { id: '3', tagName: 'Gần trường học' },
  { id: '4', tagName: 'Gần bệnh viện' },
  { id: '5', tagName: 'Gần siêu thị' },
  { id: '6', tagName: 'Gần công viên' },
  { id: '7', tagName: 'Nội thất cao cấp' },
  { id: '8', tagName: 'Giá tốt' },
  { id: '9', tagName: 'Mới xây' },
  { id: '10', tagName: 'Đã có sổ' },
];

interface ImageWithFile {
  id?: string;
  imageUrl: string;
  file?: File;
}

interface PostEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post?: any;
  onSave: (post: any) => void;
}
const propertyTypeCategory = ['Căn hộ chung cư', 'Nhà riêng', 'Nhà mặt phố', 'Biệt thự', 'Đất nền'];
export function PostEditModalEnhanced({ open, onOpenChange, post, onSave }: PostEditModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    priceUnit: PriceUnit.VND,
    address: '',
    price: 0,
    squareMeters: 0,
    description: '',
    floor: 0,
    bedroom: 0,
    bathroom: 0,
    priority: 0,
    isFurniture: false,
    direction: Directions.NORTH,
    verified: false,
    expiredDate: new Date(),
    status: StatusPost.AVAILABLE,
    images: [] as ImageWithFile[],
    propertyTypes: [] as string[],
    tags: [] as string[],
  });

  const [date, setDate] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState<'basic' | 'details' | 'images'>('basic');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (post) {
      setFormData({
        ...post,
        expiredDate: post.expiredDate ? new Date(post.expiredDate) : new Date(),
        propertyTypes: post.propertyTypes?.map((pt: any) => pt.id) || [],
        tags: post.tagPosts?.map((tp: any) => tp.tagId) || [],
        images: post.images || [],
      });
      setDate(post.expiredDate ? new Date(post.expiredDate) : new Date());
    }
  }, [post]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? Number.parseFloat(value) : value,
    });
  };
  // console.log(post.tagPosts)
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleTagChange = (tagId: string) => {
    const currentTags = [...formData.tags];
    const index = currentTags.indexOf(tagId);

    if (index === -1) {
      currentTags.push(tagId);
    } else {
      currentTags.splice(index, 1);
    }

    setFormData({
      ...formData,
      tags: currentTags,
    });
  };

  const handleFilesSelected = (files: File[]) => {
    const newImages = files.map((file) => ({
      imageUrl: URL.createObjectURL(file),
      file,
    }));

    setFormData({
      ...formData,
      images: [...formData.images, ...newImages],
    });
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...formData.images];
    if (newImages[index].file && newImages[index].imageUrl.startsWith('blob:')) {
      URL.revokeObjectURL(newImages[index].imageUrl);
    }

    newImages.splice(index, 1);
    setFormData({
      ...formData,
      images: newImages,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      onSave(formData);
      setShowSuccess(true);
      onOpenChange(false);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    formData.images.forEach((image) => {
      if (image.file && image.imageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(image.imageUrl);
      }
    });
  };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          if (!isSubmitting) {
            onOpenChange(isOpen);
          }
        }}
      >
        <DialogContent className='sm:max-w-[800px] max-h-[90vh] overflow-y-auto p-0 gap-0'>
          <div className='bg-gradient-to-r from-red-400 to-red-500 p-4 px-6 rounded-t-lg'>
            <DialogHeader className='space-y-[3px] '>
              <DialogTitle className='text-[17px] font-[500] text-white'>Chỉnh sửa bất động sản</DialogTitle>
              <p className='text-green-50 text-[13px]'>Cập nhật thông tin chi tiết về bất động sản của bạn</p>
            </DialogHeader>
          </div>

          <div className='flex border-b'>
            <Button
              variant={'outline'}
              className={`flex-1 py-2 px-4 text-center font-medium text-[14px] h-full border-t-0 border-x-0 transition-colors rounded-none ${activeTab === 'basic' ? 'text-red-600 border-b-2 border-red-500' : 'text-gray-500 hover:text-gray-700 border-transparent'}`}
              onClick={() => setActiveTab('basic')}
              disabled={isSubmitting}
            >
              Thông tin cơ bản
            </Button>
            <Button
                          variant={'outline'}
              className={`flex-1 py-2 px-4 text-center font-medium text-[14px] h-full border-t-0 border-x-0 transition-colors rounded-none  ${activeTab === 'details' ? 'text-red-600 border-b-2 border-red-500' : 'text-gray-500 hover:text-gray-700 border-transparent'}`}
              onClick={() => setActiveTab('details')}
              disabled={isSubmitting}
            >
              Thông tin chi tiết
            </Button>
            <Button
                          variant={'outline'}
              className={`flex-1 py-2 px-4 text-center font-medium text-[14px] h-full border-t-0 border-x-0 transition-colors rounded-none  ${activeTab === 'images' ? 'text-red-600 border-b-2 border-red-500' : 'text-gray-500 hover:text-gray-700 border-transparent'}`}
              onClick={() => setActiveTab('images')}
              disabled={isSubmitting}
            >
              Hình ảnh & Tags
            </Button>
          </div>

          <form onSubmit={handleSubmit} className='p-6 space-y-6'>
            {activeTab === 'basic' && (
              <>
                <div className='space-y-4'>
                  <CardInfo
                    icon={<Home className='h-5 w-5' />}
                    title='Tiêu đề bất động sản'
                    value={
                      <Input
                        id='title'
                        name='title'
                        value={formData.title}
                        onChange={handleChange}
                        className='mt-[6px]  text-[15px] w-[70%] text-gray-600 font-[400] px-[12px] py-[7px] border border-gray-200  shadow-none focus:ring-0 bg-transparent outline-none rounded-[10px]  '
                        required
                        placeholder='Nhập tiêu đề bất động sản'
                        disabled={isSubmitting}
                      />
                    }
                  />

                  <CardInfo
                    icon={<MapPin className='h-5 w-5' />}
                    title='Địa chỉ'
                    value={
                      <Input
                        id='address'
                        name='address'
                        value={formData.address}
                        onChange={handleChange}
                        className='mt-[6px]  text-[15px] w-[70%] text-gray-600 font-[400] px-[12px] py-[7px] border border-gray-200  shadow-none focus:ring-0 bg-transparent outline-none rounded-[10px] '
                        required
                        placeholder='Nhập địa chỉ đầy đủ'
                        disabled={isSubmitting}
                      />
                    }
                  />

                  <CardInfo
                    icon={<DollarSign className='h-5 w-5' />}
                    title='Giá'
                    value={
                      <div className='flex gap-2 items-center'>
                        <Input
                          id='price'
                          name='price'
                          type='number'
                          value={formData.price}
                          onChange={handleChange}
                          className='mt-[6px]  text-[15px] w-[70%] text-gray-600 font-[400] px-[12px] py-[7px] border border-gray-200  shadow-none focus:ring-0 bg-transparent outline-none rounded-[10px]  w-2/3'
                          required
                          placeholder='Nhập giá'
                          disabled={isSubmitting}
                        />
                      </div>
                    }
                  />

                  <CardInfo
                    icon={<SquareFootage className='h-5 w-5' />}
                    title='Diện tích (m²)'
                    value={
                      <Input
                        id='squareMeters'
                        name='squareMeters'
                        type='number'
                        value={formData.squareMeters}
                        onChange={handleChange}
                        className='mt-[6px]  text-[15px] w-[70%] text-gray-600 font-[400] px-[12px] py-[7px] border border-gray-200  shadow-none focus:ring-0 bg-transparent outline-none rounded-[10px] '
                        required
                        placeholder='Nhập diện tích'
                        disabled={isSubmitting}
                      />
                    }
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='description' className='text-base font-medium text-gray-700 flex items-center gap-2'>
                    <FileText className='h-5 w-5 text-red-600' />
                    Mô tả
                  </Label>
                  <Ckeditor 
                    value={formData.description || ''} 
                    onChange={()=>{}} 
                  />
                </div>

                <div className='space-y-4'>
                  <Label className='text-base font-medium text-gray-700 flex items-center gap-2'>
                    <Building className='h-5 w-5 text-red-600' />
                    Loại bất động sản
                  </Label>
                  <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
                    <Select                       value={formData.status}
                      onValueChange={(value) => handleSelectChange('propertyTypes', value)}>
                                            <SelectTrigger id='propertyType' className='w-full'>
                                              <SelectValue placeholder='Chọn loại bất động sản' />
                                            </SelectTrigger>
                                            <SelectContent className='z-[99999] '>
                                              {propertyTypeCategory.map((type) => (
                                                <SelectItem key={type} value={type}>
                                                  {type}
                                                </SelectItem>
                                              ))}
                                            </SelectContent>
                                          </Select>
                  </div>
                </div>
                <div className='space-y-4'>
                  <Label className='text-base font-medium text-gray-700 flex items-center gap-2'>
                    <Building className='h-5 w-5 text-red-600' />
                    Danh mục
                  </Label>
                  <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
                    <span className="text-[15px] text-gray-600">{post?.propertyType[0]?.listingType?.listingType }</span>
            
                  </div>
                </div>
              </>
            )}

            {activeTab === 'details' && (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <CardInfo
                  icon={<Building className='h-5 w-5' />}
                  title='Tầng'
                  value={
                    <Input
                      id='floor'
                      name='floor'
                      type='number'
                      value={formData.floor}
                      onChange={handleChange}
                      className='mt-[6px]  text-[15px] w-[70%] text-gray-600 font-[400] px-[12px] py-[7px] border border-gray-200  shadow-none focus:ring-0 bg-transparent outline-none rounded-[10px] '
                      required
                      disabled={isSubmitting}
                    />
                  }
                />

                <CardInfo
                  icon={<Bed className='h-5 w-5' />}
                  title='Phòng ngủ'
                  value={
                    <Input
                      id='bedroom'
                      name='bedroom'
                      type='number'
                      value={formData.bedroom}
                      onChange={handleChange}
                      className='mt-[6px]  text-[15px] w-[70%] text-gray-600 font-[400] px-[12px] py-[7px] border border-gray-200  shadow-none focus:ring-0 bg-transparent outline-none rounded-[10px] '
                      required
                      disabled={isSubmitting}
                    />
                  }
                />

                <CardInfo
                  icon={<Bath className='h-5 w-5' />}
                  title='Phòng tắm'
                  value={
                    <Input
                      id='bathroom'
                      name='bathroom'
                      type='number'
                      value={formData.bathroom}
                      onChange={handleChange}
                      className='mt-[6px]  text-[15px] w-[70%] text-gray-600 font-[400] px-[12px] py-[7px] border border-gray-200  shadow-none focus:ring-0 bg-transparent outline-none rounded-[10px] '
                      required
                      disabled={isSubmitting}
                    />
                  }
                />

                <CardInfo
                  icon={<Compass className='h-5 w-5' />}
                  title='Hướng'
                  value={
                    <Select
                      value={formData.direction}
                      onValueChange={(value) => handleSelectChange('direction', value)}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger className='text-base border-0 shadow-none focus:ring-0 p-0 bg-transparent'>
                        <SelectValue placeholder='Chọn hướng' />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(Directions).map((direction) => (
                          <SelectItem key={direction} value={direction} className='text-base'>
                            {direction}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  }
                />

                <CardInfo
                  icon={<Calendar className='h-5 w-5' />}
                  className='text-[15px] font-[500] text-gray-600'
                  title='Ngày hết hạn'
                  value={ format(date, 'dd/MM/yyyy', { locale: vi })}
                />

                <div className='col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4'>
                  <div className='flex items-center space-x-3 bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm'>
                    <Switch
                      id='isFurniture'
                      checked={formData.isFurniture}
                      onCheckedChange={(checked) => handleSwitchChange('isFurniture', checked)}
                      className='data-[state=checked]:bg-red-500'
                      disabled={isSubmitting}
                    />
                    <Label htmlFor='isFurniture' className='text-[15px] font-[500] text-gray-600'>
                      Có nội thất
                    </Label>
                  </div>

                  <div className='bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm'>
                    <Label htmlFor='status' className='text-sm font-medium text-gray-500'>
                      Trạng thái
                    </Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => handleSelectChange('status', value)}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger className='mt-[6px]  text-[15px] w-[70%] text-gray-600 font-[400] px-[12px] py-[7px] border border-gray-200  shadow-none focus:ring-0 bg-transparent outline-none rounded-[10px] '>
                        <SelectValue placeholder='Chọn trạng thái' />
                      </SelectTrigger>
                      <SelectContent className='z-[9999999] '>
                        {Object.values(StatusPost).map((status) => (
                          <SelectItem key={status} value={status} className='text-base'>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'images' && (
              <div className='space-y-6'>
                <div className='space-y-4'>
                  <div className='flex items-center gap-2'>
                    <ImageIcon className='h-5 w-5 text-red-600' />
                    <h3 className='text-[16px] font-[500] '>Hình ảnh bất động sản</h3>
                  </div>

                  <FileUpload
                    onFilesSelected={handleFilesSelected}
                    accept='image/*'
                    multiple={true}
                    maxFiles={10}
                    className={isSubmitting ? 'opacity-50 pointer-events-none' : ''}
                  />

                  <div className='grid grid-cols-2 md:grid-cols-3 gap-4 mt-4'>
                    {formData.images.map((image, index) => (
                      <div key={index} className='relative group'>
                        <img
                          src={image.imageUrl}
                          alt={`Hình ảnh ${index + 1}`}
                          className='w-full h-32 object-cover rounded-lg border border-gray-200'
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder.svg?height=128&width=128';
                          }}
                        />
                        <Button
                          type='button'
                          variant='destructive'
                          size='icon'
                          className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity'
                          onClick={() => handleRemoveImage(index)}
                          disabled={isSubmitting}
                        >
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      </div>
                    ))}
                    {formData.images.length === 0 && (
                      <div className='col-span-full text-center p-8 border border-dashed rounded-lg border-gray-300'>
                        <ImageIcon className='h-10 w-10 mx-auto text-gray-400' />
                        <p className='mt-2 text-gray-500'>Chưa có hình ảnh nào</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className='space-y-4 pt-6 border-t'>
                  <div className='flex items-center gap-2'>
                    <TagIcon className='h-5 w-5 text-red-600' />
                    <h3 className='text-[16px] font-[500]'>Tags</h3>
                  </div>

                  <div className='flex flex-wrap gap-2'>
                    {sampleTags.map((tag) => (
                      <Badge
                        key={tag.id}
                        variant={formData.tags.includes(tag.id) ? 'default' : 'outline'}
                        className={`cursor-pointer text-[14px] font-[400] py-1 px-3 ${
                          formData.tags.includes(tag.id) ? 'bg-red-500 hover:bg-red-600' : 'hover:bg-red-100'
                        } ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}
                        onClick={() => !isSubmitting && handleTagChange(tag.id)}
                      >
                        {tag.tagName}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className='flex justify-end space-x-4 pt-6 border-t mt-6'>
              <Button
                type='button'
                variant='outline'
                onClick={() => onOpenChange(false)}
                className='text-[15px] font-[400] text-gray-600 border-gray-300 hover:bg-gray-100 transition-colors'
                disabled={isSubmitting}
              >
                Hủy
              </Button>
              <Button
                type='submit'
                className='text-[15px] font-[400] bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 transition-colors'
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Đang xử lý...
                  </>
                ) : (
                  'Lưu thay đổi'
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <SuccessNotification
        show={showSuccess}
        onClose={handleSuccessClose}
        title='Cập nhật thành công'
        message='Vui lòng lưu biên lai để xuất trình khi nhận kết quả hồ sơ tại cơ quan chức năng'
      />
    </>
  );
}
