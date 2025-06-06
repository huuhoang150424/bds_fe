import { useEffect, useRef, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Eye, Pencil, Trash2, Upload } from 'lucide-react';
import { PropertyModal } from './property-modal';
import { Pagination } from '@/components/user/pagination';
import { DeleteModal } from './delete-post';
import { convertDate } from '@/lib/convert-date';
import { Badge } from '@/components/ui/badge';
import { useDeletePost } from '../hooks/use-delete-post';
import { PostEditModalEnhanced } from './edit-post/post-edit-modal-enhanced';
import { usePublishPostDraft } from '../hooks/use-publish-post';
import { PublishPostModal } from './post-draft/publish-post';
import { DeletePostDraftModal } from './post-draft/delete-post-draft';

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
  propertyType: {
    name: string;
  }[];
}

export function PropertyTable({
  data,
  onPageChange,
  typeListPost,
}: {
  data: any;
  onPageChange?: (page: number) => void;
  typeListPost?: string;
}) {
  const [selectedProperty, setSelectedProperty] = useState<any | null>(null);
  
  const [postDraftToDelete, setPostDraftToDelete] = useState<any | null>(null);
  
  const [isDeletePostDraftModalOpen, setIsDeletePostDraftModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<any | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<any>(null);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [postToPublish, setPostToPublish] = useState<any | null>(null);
  const dropdownRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost(typeListPost);
  const { mutate: publishPost, isPending: isPublishing, error } = usePublishPostDraft();

  const handleEdit = (post: any, index: number) => {
    if (dropdownRefs.current[index]) {
      dropdownRefs.current[index]?.blur();
    }
    setTimeout(() => {
      setCurrentPost(post);
      setIsEditModalOpen(true);
    }, 10);
  };

  const handleEditModalClose = (open: boolean) => {
    setIsEditModalOpen(open);
    if (!open) {
      setTimeout(() => {
        setCurrentPost(null);
      }, 300);
    }
  };

  const handlePublishPost = (post: any, index: number) => {
    if (dropdownRefs.current[index]) {
      dropdownRefs.current[index]?.blur();
    }
    setTimeout(() => {
      setPostToPublish(post);
      setIsPublishModalOpen(true);
    }, 10);
  };

  const handleConfirmPublish = () => {
    if (!postToPublish) return;
    publishPost(postToPublish.id, {
      onSuccess: () => {
        setIsPublishModalOpen(false);
        setTimeout(() => {
          setPostToPublish(null);
        }, 300);
      },
    });
  };


  useEffect(() => {
    dropdownRefs.current = dropdownRefs.current.slice(0, data?.data?.data?.length || 0);
  }, [data?.data?.data]);

  console.log(data?.data?.data)

  const handleView = (property: any, index: number) => {
    if (dropdownRefs.current[index]) {
      dropdownRefs.current[index]?.blur();
    }
    setTimeout(() => {
      setSelectedProperty(property);
      setIsModalOpen(true);
    }, 10);
  };

  const handleDeleteClick = (property: any, index: number, isDraft: boolean) => {
    if (dropdownRefs.current[index]) {
      dropdownRefs.current[index]?.blur();
    }
    setTimeout(() => {
      if (isDraft) {
        setPostDraftToDelete(property);
        setIsDeletePostDraftModalOpen(true);
      } else {
        setPropertyToDelete(property);
        setIsDeleteModalOpen(true);
      }
    }, 10);
  };

  const handleConfirmDelete = () => {
    if (!propertyToDelete) return;
    deletePost(propertyToDelete.id, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        setTimeout(() => {
          setPropertyToDelete(null);
        }, 300);
      },
    });
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setTimeout(() => {
      setPropertyToDelete(null);
    }, 300);
  };

  const handleCancelDeletePostDraft = () => {
    setIsDeletePostDraftModalOpen(false);
    setTimeout(() => {
      setPostDraftToDelete(null);
    }, 300);
  };

  const getStatusBadgePost = (status: string) => {
    switch (status) {
      case 'Đã bàn giao':
        return <Badge className='text-xs font-normal bg-green-500'>Đã bàn giao</Badge>;
      case 'Đã hết hạng':
        return <Badge className='text-xs font-normal bg-red-500'>Đã hết hạng</Badge>;
      case 'Đang đàm phán':
        return <Badge className='text-xs font-normal bg-sky-500'>Đang đàm phán</Badge>;
      case 'Còn trống':
        return <Badge className='text-xs font-normal bg-blue-500'>Còn trống</Badge>;
      case 'DRAFT':
        return <Badge className='text-xs font-normal bg-pink-500'>Nháp</Badge>;
      case 'Sắp mở bán':
        return <Badge className='text-xs font-normal bg-amber-500'>Sắp mở bán</Badge>;
      case 'PUBLISHED':
        return <Badge className='text-xs font-normal bg-green-600'>Đã xuất bản</Badge>;
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

  const handleSave = (updatedPost: any) => {
    //setPosts(posts.map((post) => (post.id === updatedPost.id ? { ...post, ...updatedPost } : post)))
  };

  const totalItems = data?.data?.totalItems || 0;
  const itemsPerPage = data?.data?.itemsPerPage || 10;
  const currentPage = data?.data?.currentPage || 1;
  const totalPages = data?.data?.totalPages || 1;
  const startItem = Math.min(totalItems, (currentPage - 1) * itemsPerPage + 1);
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className='rounded-md border relative'>
      <div className='overflow-x-auto custom-scrollbar w-full'>
        <Table className='text-xs w-max min-w-full'>
          <TableHeader className='bg-gray-100'>
            <TableRow>
              <TableHead className='w-[100px] font-medium whitespace-nowrap sticky left-0 z-20 bg-gray-100'>
                Hình ảnh
              </TableHead>
              <TableHead className='w-[250px] font-medium whitespace-nowrap'>Tiêu đề</TableHead>
              <TableHead className='w-[150px] font-medium whitespace-nowrap'>Giá</TableHead>
              <TableHead className='w-[250px] font-medium whitespace-nowrap'>Địa chỉ</TableHead>
              <TableHead className='w-[100px] font-medium whitespace-nowrap'>Diện tích</TableHead>
              <TableHead className='w-[100px] font-medium whitespace-nowrap'>Phòng ngủ</TableHead>
              <TableHead className='w-[100px] font-medium whitespace-nowrap'>Phòng tắm</TableHead>
              <TableHead className='w-[100px] font-medium whitespace-nowrap'>Hướng</TableHead>
              <TableHead className='w-[120px] font-medium whitespace-nowrap'>Trạng thái</TableHead>
              <TableHead className='w-[150px] font-medium whitespace-nowrap'>Ngày tạo</TableHead>
              <TableHead className='w-[150px] font-medium whitespace-nowrap'>Có nội thất</TableHead>
              <TableHead className='w-[150px] font-medium whitespace-nowrap'>Tags</TableHead>
              <TableHead className='w-[150px] font-medium whitespace-nowrap'>Danh mục</TableHead>
              {typeListPost === 'Post' && (
                <TableHead className='w-[150px] font-medium whitespace-nowrap'>Ngày hết hạn</TableHead>
              )}
              <TableHead className='w-[100px] font-medium text-right whitespace-nowrap sticky right-0 z-20 bg-gray-100'>
                Hành động
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.data?.map((property: any, index: number) => (
              <TableRow key={property?.title} className='h-16'>
                <TableCell className='p-2 sticky left-0 z-10 bg-white dark:bg-gray-950 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]'>
                  <div className='flex items-center space-x-1'>
                    {property?.images?.slice(0, 3).map((image: any, imgIndex: number) => (
                      <div key={imgIndex} className='relative w-8 h-8 overflow-hidden rounded-md'>
                        <img
                          src={typeListPost === 'Post' ? image?.imageUrl : image?.image_url}
                          alt={property?.title}
                          className='object-cover w-full h-full border border-gray-200'
                        />
                      </div>
                    ))}
                    {property?.images?.length > 3 && (
                      <span className='text-xs text-muted-foreground'>+{property?.images?.length - 3}</span>
                    )}
                  </div>
                </TableCell>
                <TableCell className='font-medium whitespace-nowrap'>{property?.title}</TableCell>
                <TableCell className='whitespace-nowrap'>
                  <span className='mr-[3px]'>
                    {property?.price?.toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </span>
                  {property?.priceUnit}
                </TableCell>
                <TableCell className='whitespace-nowrap'>{property?.address}</TableCell>
                <TableCell className='whitespace-nowrap'>{property?.squareMeters} m²</TableCell>
                <TableCell className='whitespace-nowrap'>{property?.bedroom}</TableCell>
                <TableCell className='whitespace-nowrap'>{property?.bathroom}</TableCell>
                <TableCell className='whitespace-nowrap'>{property?.direction}</TableCell>
                <TableCell className='whitespace-nowrap'>{getStatusBadgePost(property?.status)}</TableCell>
                <TableCell className='whitespace-nowrap'>{convertDate(property?.createdAt)}</TableCell>
                <TableCell className='whitespace-nowrap'>{property?.isFurniture ? 'Có' : 'Không'}</TableCell>
                <TableCell className='whitespace-nowrap space-x-[3px]'>
                  {property?.tagPosts?.map((tag: any, index: number) => (
                    <Badge
                      key={index}
                      variant='outline'
                      className='bg-red-50 text-red-700 border-red-200 text-[13px]'
                    >
                      {tag?.tag?.tagName}
                    </Badge>
                  ))}
                </TableCell>
                <TableCell className='whitespace-nowrap'>{property?.propertyType?.[0]?.name}</TableCell>
                {typeListPost === 'Post' && (
                  <TableCell className='whitespace-nowrap'>{convertDate(property?.expiredDate)}</TableCell>
                )}
                <TableCell className='text-right sticky right-0 z-10 bg-white dark:bg-gray-950 shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.1)]'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        ref={(el) => {
                          dropdownRefs.current[index] = el;
                        }}
                        variant='ghost'
                        className='h-8 w-8 p-0'
                        onBlur={() => {}}
                      >
                        <span className='sr-only'>Open menu</span>
                        <MoreHorizontal className='h-4 w-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align='end'
                      onCloseAutoFocus={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <DropdownMenuItem onClick={() => handleView(property, index)}>
                        <Eye className='mr-2 h-4 w-4' />
                        <span>Xem</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(property, index)}>
                        <Pencil className='mr-2 h-4 w-4' />
                        <span>Sửa</span>
                      </DropdownMenuItem>
                      {typeListPost === 'PostDraft' && (
                        <DropdownMenuItem onClick={() => handlePublishPost(property, index)}>
                          <Upload className='mr-2 h-4 w-4' />
                          <span>Xuất bản</span>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        onClick={() => handleDeleteClick(property, index, typeListPost === 'PostDraft')}
                      >
                        <Trash2 className='mr-2 h-4 w-4' />
                        <span>{typeListPost === 'PostDraft' ? 'Xóa bản nháp' : 'Xóa'}</span>
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
        <PropertyModal property={selectedProperty} isOpen={isModalOpen} onClose={handleCloseModal} />
      )}
      {propertyToDelete && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          title='Xác nhận xóa'
          property={propertyToDelete}
          isLoading={isDeleting}
        />
      )}
      {postToPublish && (
        <PublishPostModal
          isOpen={isPublishModalOpen}
          onOpenChange={setIsPublishModalOpen}
          post={postToPublish}
          onPublish={handleConfirmPublish}
          isPublishing={isPublishing}
          error={error?.response?.data?.message}
        />
      )}
      {currentPost && (
        <PostEditModalEnhanced
          open={isEditModalOpen}
          onOpenChange={handleEditModalClose}
          post={currentPost}
          onSave={handleSave}
        />
      )}
      {postDraftToDelete && (
        <DeletePostDraftModal
          isOpen={isDeletePostDraftModalOpen}
          onClose={handleCancelDeletePostDraft}
          title='Xóa bản nháp'
          postDraft={postDraftToDelete}
          typeListPost={typeListPost}
        />
      )}

      <div className='flex items-center justify-between px-4 py-3 border-t w-full'>
        <div className='text-xs text-gray-500'>
          {totalItems > 0
            ? `Hiển thị ${startItem} đến ${endItem} trong tổng số ${totalItems} bất động sản`
            : 'Không có bất động sản nào'}
        </div>
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange || (() => {})}
            className='mt-0'
          />
        )}
      </div>
    </div>
  );
}