import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { ListingType, AddressData } from '../listing-wizard';
import { Loading, LoadingSpinner } from '@/components/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAddPost } from '../../hooks/use-add-post';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Ckeditor from '../CKEditor';
import { X, Upload, Plus, GripVertical, ZoomIn, Edit } from 'lucide-react';
import ImageLightbox from './image-lightbox';
import TagInput from '../tag-input';
import { Switch } from '@/components/ui/switch';
import { draftSchema, postSchema, type FormUploadPost } from '../../schema';
interface ListingDetailsStepProps {
  listingType: ListingType;
  addressData: string;
  onBack: () => void;
  selectListingTypeId: string;
}
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
};
export interface ImageFile {
  id: string;
  file: File;
  preview: string;
  isPrimary: boolean;
}
const propertyTypes = ['Căn hộ chung cư', 'Nhà riêng', 'Nhà mặt phố', 'Biệt thự', 'Đất nền'];

export default function ListingDetailsStep({
  listingType,
  addressData,
  onBack,
  selectListingTypeId,
}: ListingDetailsStepProps) {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceFileInputRef = useRef<HTMLInputElement>(null);
  const [resetTagsTrigger, setResetTagsTrigger] = useState(0);

  const defaultValues = {
    title: '',
    description: '',
    price: 0,
    squareMeters: 0,
    bedroom: 0,
    bathroom: 0,
    address: addressData,
    propertyType: '',
    direction: '',
    status: '',
    isFurniture: false,
    tags: [],
    images: [],
    floor: 0,
    listingType: selectListingTypeId,
  };

  const form = useForm<FormUploadPost>({
    resolver: zodResolver(postSchema),
    defaultValues,
  });
  useEffect(() => {
    form.setValue('images', images, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }, [images, form]);

  const resetForm = useCallback(() => {
    form.reset(defaultValues);
    images.forEach((img) => URL.revokeObjectURL(img.preview));
    setImages([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (replaceFileInputRef.current) replaceFileInputRef.current.value = '';
    setLightboxOpen(false);
    setIsDragging(false);
    setResetTagsTrigger((prev) => prev + 1);
  }, [form, images, addressData, selectListingTypeId]);

  const { mutate: addPost, isPending: isPendingCreatePost } = useAddPost(resetForm);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const newImages = newFiles.map((file) => ({
        id: Math.random().toString(36).substring(2, 11),
        file,
        preview: URL.createObjectURL(file),
        isPrimary: images.length === 0 && newFiles.indexOf(file) === 0,
      }));

      const updatedImages = [...images, ...newImages];
      setImages(updatedImages);
      form.setValue('images', updatedImages, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleReplaceImage = (imageId: string) => {
    if (replaceFileInputRef.current) {
      replaceFileInputRef.current.dataset.replaceId = imageId;
      replaceFileInputRef.current.click();
    }
  };

  const handleReplaceFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0 && replaceFileInputRef.current?.dataset.replaceId) {
      const imageId = replaceFileInputRef.current.dataset.replaceId;
      const file = e.target.files[0];
      const imageToReplace = images.find((img) => img.id === imageId);
      if (imageToReplace) {
        URL.revokeObjectURL(imageToReplace.preview);
        const updatedImages = images.map((img) =>
          img.id === imageId ? { ...img, file, preview: URL.createObjectURL(file) } : img,
        );

        setImages(updatedImages);
        form.setValue('images', updatedImages, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        });
      }
      if (replaceFileInputRef.current) {
        replaceFileInputRef.current.value = '';
        delete replaceFileInputRef.current.dataset.replaceId;
      }
    }
  };

  const handleRemoveImage = (id: string) => {
    const imageToRemove = images.find((img) => img.id === id);
    if (imageToRemove) {
      URL.revokeObjectURL(imageToRemove.preview);
    }

    const updatedImages = images.filter((img) => img.id !== id);
    if (imageToRemove?.isPrimary && updatedImages.length > 0) {
      updatedImages[0].isPrimary = true;
    }

    setImages(updatedImages);
    form.setValue('images', updatedImages, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleSetPrimary = (id: string) => {
    const updatedImages = images.map((img) => ({
      ...img,
      isPrimary: img.id === id,
    }));

    setImages(updatedImages);
    form.setValue('images', updatedImages, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files);
      const newImages = newFiles.map((file) => ({
        id: Math.random().toString(36).substring(2, 11),
        file,
        preview: URL.createObjectURL(file),
        isPrimary: images.length === 0 && newFiles.indexOf(file) === 0,
      }));
      const updatedImages = [...images, ...newImages];
      setImages(updatedImages);
      form.setValue('images', updatedImages, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  };

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };
  const createFormData = (values: any) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('price', values.price);
    formData.append('squareMeters', values.squareMeters);
    formData.append('bedroom', values.bedroom);
    formData.append('bathroom', values.bathroom);
    formData.append('address', values.address);
    formData.append('propertyType', values.propertyType);
    formData.append('direction', values.direction);
    formData.append('status', values.status);
    formData.append('isFurniture', values.isFurniture);
    formData.append('floor', values.floor);
    formData.append('listingType', values.listingType);

    if (values.tags && values.tags.length > 0) {
      values.tags.forEach((tag: any) => formData.append('tags', tag));
    }
    if (values.images && values.images.length > 0) {
      values.images.forEach((img: any) => {
        formData.append('images', img.file);
      });
    }
    return formData;
  };
  const handleCreateDraft = () => {
    const currentValues = form.getValues();
    const draftValidation = draftSchema.safeParse(currentValues);
    if (draftValidation.success) {
      const formData = createFormData(currentValues);
      addPost({ type: 'createPostDraft', data: formData });
    } else {
      const formattedErrors = draftValidation.error.format();
      Object.entries(formattedErrors).forEach(([field, error]: [string, any]) => {
        if (field !== '_errors' && error._errors.length > 0) {
          form.setError(field as any, {
            type: 'manual',
            message: error._errors[0],
          });
        }
      });
    }
  };
  const onSubmit = (values: FormUploadPost) => {
    const formData = createFormData(values);
    addPost({ type: 'createPost', data: formData });
  };

  return (
    <Form {...form}>
      <form>
        <motion.div variants={containerVariants} initial='hidden' animate='visible' className=''>
          <motion.h2 variants={itemVariants} className='text-xl font-semibold mb-[15px]'>
            Thông tin chi tiết
          </motion.h2>
          <motion.div variants={containerVariants} className='space-y-5 '>
            <motion.div variants={itemVariants}>
              <div className='flex items-center gap-[30px] w-full '>
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel>
                        <Label htmlFor='title' className='mb-1 block font-medium'>
                          Tiêu đề
                        </Label>
                      </FormLabel>
                      <FormControl>
                        <Input
                          id='title'
                          placeholder='Nhập tiêu đề tin đăng'
                          className=' outline-none px-[18px] py-[8px] rounded-[8px] '
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='price'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel>
                        <Label htmlFor='price' className='mb-1 block font-medium'>
                          {listingType === 'Bán' ? 'Giá bán (VNĐ)' : 'Giá thuê (VNĐ/tháng)'}
                        </Label>
                      </FormLabel>
                      <FormControl>
                        <Input
                          id='price'
                          type='number'
                          placeholder='Nhập giá'
                          {...field}
                          onChange={(e) => {
                            field.onChange(e.target.valueAsNumber || 0);
                          }}
                          className='outline-none px-[18px] py-[8px] rounded-[8px] '
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <div className='flex items-center gap-[30px] w-full '>
                <FormField
                  control={form.control}
                  name='squareMeters'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel>
                        <Label htmlFor='squareMeters' className='mb-1 block font-medium'>
                          Diện tích (m²)
                        </Label>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          id='squareMeters'
                          placeholder='Nhập diện tích'
                          className=' outline-none px-[18px] py-[8px] rounded-[8px] '
                          {...field}
                          onChange={(e) => {
                            field.onChange(e.target.valueAsNumber || 0);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='bedroom'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel>
                        <Label htmlFor='price' className='mb-1 block font-medium'>
                          Số phòng ngủ
                        </Label>
                      </FormLabel>
                      <FormControl>
                        <Input
                          id='bedroom'
                          type='number'
                          placeholder='Nhập số phòng ngủ'
                          {...field}
                          onChange={(e) => {
                            field.onChange(e.target.valueAsNumber || 0);
                          }}
                          className='outline-none px-[18px] py-[8px] rounded-[8px] '
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <div className='flex items-center gap-[30px] w-full '>
                <FormField
                  control={form.control}
                  name='bathroom'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel>
                        <Label htmlFor='bathroom' className='mb-1 block font-medium'>
                          Số phòng tắm
                        </Label>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          id='bathroom'
                          placeholder='Nhập số phòng tắm'
                          className=' outline-none px-[18px] py-[8px] rounded-[8px] '
                          {...field}
                          onChange={(e) => {
                            field.onChange(e.target.valueAsNumber || 0);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='floor'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel>
                        <Label htmlFor='floor' className='mb-1 block font-medium'>
                          Số tầng
                        </Label>
                      </FormLabel>
                      <FormControl>
                        <Input
                          id='floor'
                          type='number'
                          placeholder='Nhập số tầng'
                          {...field}
                          onChange={(e) => {
                            field.onChange(e.target.valueAsNumber || 0);
                          }}
                          className='outline-none px-[18px] py-[8px] rounded-[8px] '
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <div className='flex items-center gap-[30px] w-full '>
                <FormField
                  control={form.control}
                  name='direction'
                  render={({ field }) => (
                    <FormItem className='flex-1 '>
                      <FormLabel>Hướng nhà</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder='Chọn hướng nhà' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='Bắc'>Bắc</SelectItem>
                            <SelectItem value='Nam'>Nam</SelectItem>
                            <SelectItem value='Đông'>Đông</SelectItem>
                            <SelectItem value='Tây'>Tây</SelectItem>
                            <SelectItem value='Đông Bắc'>Đông Bắc</SelectItem>
                            <SelectItem value='Đông Nam'>Đông Nam</SelectItem>
                            <SelectItem value='Tây Bắc'>Tây Bắc</SelectItem>
                            <SelectItem value='Tây Nam'>Tây Nam</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='status'
                  render={({ field }) => (
                    <FormItem className='flex-1 '>
                      <FormLabel>Trạng thái</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder='Chọn trạng thái' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='Còn trống'>Còn trống</SelectItem>
                            <SelectItem value='Đang đàm phán'>Đang đàm phán</SelectItem>
                            <SelectItem value='Đã bàn giao'>Đã bàn giao</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name='isFurniture'
                render={({ field }) => (
                  <FormItem className='flex-1 flex items-center gap-2'>
                    <FormLabel className='text-[16px] font-[500] text-gray-800 mt-[6px] mr-[10px] '>Nội thất</FormLabel>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} className='mt-1' />
                    </FormControl>
                    <span>{field.value ? 'Có nội thất' : 'Không nội thất'}</span>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name='propertyType'
                render={({ field }) => (
                  <FormItem className='flex-1 '>
                    <FormLabel>Danh mục bất động sản</FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id='propertyType' className='w-full'>
                          <SelectValue placeholder='Chọn loại bất động sản' />
                        </SelectTrigger>
                        <SelectContent>
                          {propertyTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name='tags'
                render={({ field }) => (
                  <FormItem className='flex-1 '>
                    <FormLabel>Hash tags bài đăng</FormLabel>
                    <FormControl>
                      <TagInput onSelect={field.onChange} resetTags={resetTagsTrigger} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
            <motion.div variants={itemVariants} className='space-y-2'>
              <Label className='mb-3 block font-medium'>
                Hình ảnh bất động sản <span className='text-red-500'>*</span>
              </Label>
              <div
                className={`relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${
                  isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/70'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type='file'
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  multiple
                  accept='image/*'
                  className='hidden'
                />
                <input
                  type='file'
                  ref={replaceFileInputRef}
                  onChange={handleReplaceFileChange}
                  accept='image/*'
                  className='hidden'
                />
                <div className='flex flex-col items-center text-center'>
                  <Upload className='mb-2 h-10 w-10 text-gray-400' />
                  <h3 className='mb-1 text-lg font-medium'>Kéo thả hoặc nhấp để tải lên</h3>
                  <p className='text-sm text-gray-500'>Hỗ trợ JPG, PNG, GIF (Tối đa 10 hình, mỗi hình không quá 5MB)</p>
                  <Button
                    type='button'
                    variant='outline'
                    size='sm'
                    className='mt-4'
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                  >
                    <Plus className='mr-1 h-4 w-4' /> Chọn hình ảnh
                  </Button>
                </div>
              </div>

              {images.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className='mt-4 space-y-3'>
                  <div className='flex items-center justify-between'>
                    <h4 className='text-sm font-medium'>Hình ảnh đã tải lên ({images.length})</h4>
                    <p className='text-xs text-gray-500'>Nhấn vào hình để xem chi tiết hoặc đặt làm ảnh chính</p>
                  </div>
                  <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4'>
                    {images.map((image, index) => (
                      <motion.div
                        key={image.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className={`group relative aspect-square overflow-hidden rounded-lg border ${
                          image.isPrimary ? 'border-2 border-primary' : 'border-gray-200'
                        }`}
                      >
                        <img
                          src={image.preview || '/placeholder.svg'}
                          alt='Property preview'
                          className='h-full w-full cursor-pointer object-cover transition-transform group-hover:scale-105'
                          onClick={() => openLightbox(index)}
                        />
                        <div className='absolute inset-0 flex items-center justify-center gap-2 bg-black/0 opacity-0 transition-all group-hover:bg-black/30 group-hover:opacity-100'>
                          <button
                            type='button'
                            onClick={(e) => {
                              e.stopPropagation();
                              openLightbox(index);
                            }}
                            className='rounded-full bg-white/90 p-2 text-gray-800 transition-transform hover:scale-110'
                            title='Xem chi tiết'
                          >
                            <ZoomIn className='h-5 w-5' />
                          </button>
                          <button
                            type='button'
                            onClick={(e) => {
                              e.stopPropagation();
                              handleReplaceImage(image.id);
                            }}
                            className='rounded-full bg-white/90 p-2 text-gray-800 transition-transform hover:scale-110'
                            title='Thay thế ảnh'
                          >
                            <Edit className='h-5 w-5' />
                          </button>
                          <button
                            type='button'
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSetPrimary(image.id);
                            }}
                            className='rounded-full bg-white/90 p-2 text-gray-800 transition-transform hover:scale-110'
                            title='Đặt làm ảnh chính'
                          >
                            <span className='text-xs font-medium'>Chính</span>
                          </button>
                        </div>
                        <button
                          type='button'
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveImage(image.id);
                          }}
                          className='absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity hover:bg-red-600 group-hover:opacity-100'
                        >
                          <X className='h-4 w-4' />
                        </button>
                        {image.isPrimary && (
                          <div className='absolute bottom-0 left-0 right-0 bg-primary/80 py-1 text-center text-xs font-medium text-white'>
                            Ảnh chính
                          </div>
                        )}
                        <div className='absolute left-1 top-1 cursor-move opacity-0 group-hover:opacity-70'>
                          <GripVertical className='h-4 w-4 text-white' />
                        </div>
                      </motion.div>
                    ))}
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      className='flex aspect-square cursor-pointer items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 hover:border-primary/70'
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                    >
                      <div className='flex flex-col items-center'>
                        <Plus className='h-8 w-8 text-gray-400' />
                        <span className='mt-1 text-xs text-gray-500'>Thêm ảnh</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </motion.div>
            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô tả</FormLabel>
                    <FormControl>
                      <Ckeditor value={field.value || ''} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          </motion.div>
          <motion.div variants={itemVariants} className='flex justify-between pt-4'>
            <Button variant='outline' type='button' onClick={onBack}>
              Quay lại
            </Button>
            <div className='flex gap-[15px] '>
              {isPendingCreatePost ? (
                <LoadingSpinner className='' />
              ) : (
                <Button
                  type='submit'
                  onClick={form.handleSubmit(onSubmit)}
                  className='relative overflow-hidden bg-red-500 hover:bg-red-600 transition-all duration-all ease-in-out'
                >
                  <motion.span
                    initial={{ x: -5, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Đăng tin
                  </motion.span>
                </Button>
              )}

              <Button
                type='button'
                onClick={handleCreateDraft}
                className='relative overflow-hidden bg-sky-500 hover:bg-sky-600 transition-all duration-all ease-in-out'
              >
                <motion.span initial={{ x: -5, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                  Tạo bản nháp
                </motion.span>
              </Button>
            </div>
          </motion.div>
          <ImageLightbox
            images={images}
            initialIndex={currentImageIndex}
            isOpen={lightboxOpen}
            onClose={() => setLightboxOpen(false)}
            onReplace={handleReplaceImage}
          />
        </motion.div>
      </form>
    </Form>
  );
}
