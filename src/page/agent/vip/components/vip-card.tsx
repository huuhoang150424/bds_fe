
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Building2, Check, Home, Star, X } from 'lucide-react';

function VipCard() {
  return (
    <div><div className='grid grid-cols-1 md:grid-cols-3 gap-[30px] mb-16'>
    {/* Basic Membership */}
    <Card className='overflow-hidden border border-gray-200 rounded-[10px]'>
      <CardHeader className='bg-gradient-to-r from-gray-50 to-gray-100'>
        <div className='flex items-center justify-between'>
          <CardTitle>Hội viên Cơ bản</CardTitle>
          <div className='w-16 h-16 flex items-center justify-center'>
            <Star className='w-12 h-12 text-yellow-400' />
          </div>
        </div>
        <CardDescription>Phù hợp với mới giới mới hoặc giỏ hàng nhỏ</CardDescription>
      </CardHeader>
      <CardContent className='p-6'>
        <div className='mb-4'>
          <p className='text-sm text-gray-500'>từ</p>
          <div className='flex items-end'>
            <span className='text-2xl font-bold'>517.000</span>
            <span className='text-sm ml-1 text-gray-500'>đ/tháng</span>
            <span className='text-sm text-red-500 ml-2'>(-32%)</span>
          </div>
          <p className='text-sm text-gray-500'>
            Tiết kiệm đến <span className='font-bold'>243.000 đ</span> mỗi tháng
          </p>
        </div>

        <Button className='w-full bg-[#E03C31] hover:bg-[#FF837A] text-white'>Mua ngay</Button>

        <Separator className='my-4' />

        <div className='space-y-4'>
          <div>
            <h3 className='font-medium mb-2 text-gray-700'>Gói tin hàng tháng</h3>
            <ul className='space-y-2'>
              <li className='flex items-center gap-2'>
                <X className='h-4 w-4 text-red-500' />
                <span className='text-sm text-gray-600'>Tin VIP Vàng (hiển thị 7 ngày)</span>
              </li>
              <li className='flex items-center gap-2'>
                <X className='h-4 w-4 text-red-500' />
                <span className='text-sm text-gray-600'>Tin VIP Bạc (hiển thị 7 ngày)</span>
              </li>
              <li className='flex items-center gap-2'>
                <Check className='h-4 w-4 text-green-500' />
                <span className='text-sm text-gray-600'>15 Tin Thường (hiển thị 10 ngày)</span>
              </li>
              <li className='flex items-center gap-2'>
                <Check className='h-4 w-4 text-green-500' />
                <span className='text-sm text-gray-600'>15 lượt đẩy cho Tin Thường</span>
              </li>
            </ul>
          </div>

          <Separator />

          <div>
            <h3 className='font-medium mb-2 text-gray-700'>Tiện ích</h3>
            <ul className='space-y-2'>
              <li className='flex items-center gap-2'>
                <X className='h-4 w-4 text-red-500' />
                <span className='text-sm text-gray-600'>Xuất bản nhanh</span>
              </li>
              <li className='flex items-center gap-2'>
                <X className='h-4 w-4 text-red-500' />
                <span className='text-sm text-gray-600'>Bản quyền ảnh</span>
              </li>
              <li className='flex items-center gap-2'>
                <X className='h-4 w-4 text-red-500' />
                <span className='text-sm text-gray-600'>Hẹn giờ đăng tin</span>
              </li>
              <li className='flex items-center gap-2'>
                <X className='h-4 w-4 text-red-500' />
                <span className='text-sm text-gray-600'>Báo cáo hiệu suất</span>
              </li>
              <li className='flex items-center gap-2'>
                <X className='h-4 w-4 text-red-500' />
                <span className='text-sm text-gray-600'>Thao tác với nhiều tin</span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Standard Membership */}
    <Card className='overflow-hidden border border-gray-200 rounded-[10px]'>
      <CardHeader className='bg-gradient-to-r from-red-50 to-red-100'>
        <div className='flex items-center justify-between'>
          <CardTitle>Hội viên Tiêu chuẩn</CardTitle>
          <div className='w-16 h-16 flex items-center justify-center'>
            <Home className='w-12 h-12 text-red-500' />
          </div>
        </div>
        <CardDescription>Phù hợp với môi giới chuyên nghiệp có giỏ hàng từ 10 BĐS</CardDescription>
      </CardHeader>
      <CardContent className='p-6'>
        <div className='mb-4'>
          <p className='text-sm text-gray-500'>từ</p>
          <div className='flex items-end'>
            <span className='text-2xl font-bold'>1.383.000</span>
            <span className='text-sm ml-1 text-gray-500'>đ/tháng</span>
            <span className='text-sm text-red-500 ml-2'>(-34%)</span>
          </div>
          <p className='text-sm text-gray-500'>
            Tiết kiệm đến <span className='font-bold'>729.000 đ</span> mỗi tháng
          </p>
        </div>

        <Button className='w-full bg-[#E03C31] hover:bg-[#FF837A] text-white'>Mua ngay</Button>

        <Separator className='my-4' />

        <div className='space-y-4'>
          <div>
            <h3 className='font-medium mb-2 text-gray-700'>Gói tin hàng tháng</h3>
            <ul className='space-y-2'>
              <li className='flex items-center gap-2'>
                <X className='h-4 w-4 text-red-500' />
                <span className='text-sm text-gray-600'>Tin VIP Vàng (hiển thị 7 ngày)</span>
              </li>
              <li className='flex items-center gap-2'>
                <Check className='h-4 w-4 text-green-500' />
                <span className='text-sm text-gray-600'>1 Tin VIP Bạc (hiển thị 7 ngày)</span>
              </li>
              <li className='flex items-center gap-2'>
                <Check className='h-4 w-4 text-green-500' />
                <span className='text-sm text-gray-600'>30 Tin Thường (hiển thị 10 ngày)</span>
              </li>
              <li className='flex items-center gap-2'>
                <Check className='h-4 w-4 text-green-500' />
                <span className='text-sm text-gray-600'>30 lượt đẩy cho Tin Thường</span>
              </li>
            </ul>
          </div>

          <Separator />

          <div>
            <h3 className='font-medium mb-2 text-gray-700'>Tiện ích</h3>
            <ul className='space-y-2'>
              <li className='flex items-center gap-2'>
                <Check className='h-4 w-4 text-green-500' />
                <span className='text-sm text-gray-600'>Xuất bản nhanh</span>
              </li>
              <li className='flex items-center gap-2'>
                <Check className='h-4 w-4 text-green-500' />
                <span className='text-sm text-gray-600'>Bản quyền ảnh</span>
              </li>
              <li className='flex items-center gap-2'>
                <Check className='h-4 w-4 text-green-500' />
                <span className='text-sm text-gray-600'>Hẹn giờ đăng tin</span>
              </li>
              <li className='flex items-center gap-2'>
                <Check className='h-4 w-4 text-green-500' />
                <span className='text-sm text-gray-600'>Báo cáo hiệu suất</span>
              </li>
              <li className='flex items-center gap-2'>
                <Check className='h-4 w-4 text-green-500' />
                <span className='text-sm text-gray-600'>Thao tác với nhiều tin</span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Premium Membership */}
    <Card className='overflow-hidden border border-gray-200 rounded-[10px]'>
      <CardHeader className='bg-gradient-to-r from-blue-50 to-blue-100'>
        <div className='flex items-center justify-between'>
          <CardTitle>Hội viên Cao cấp</CardTitle>
          <div className='w-16 h-16 flex items-center justify-center'>
            <Building2 className='w-12 h-12 text-blue-500' />
          </div>
        </div>
        <CardDescription>Phù hợp với môi giới có giỏ hàng và ngân sách quảng cáo lớn</CardDescription>
      </CardHeader>
      <CardContent className='p-6'>
        <div className='mb-4'>
          <p className='text-sm text-gray-500'>từ</p>
          <div className='flex items-end'>
            <span className='text-2xl font-bold'>2.833.000</span>
            <span className='text-sm ml-1 text-gray-500'>đ/tháng</span>
            <span className='text-sm text-red-500 ml-2'>(-39%)</span>
          </div>
          <p className='text-sm text-gray-500'>
            Tiết kiệm đến <span className='font-bold'>1.812.000 đ</span> mỗi tháng
          </p>
        </div>

        <Button className='w-full bg-[#E03C31] hover:bg-[#FF837A] text-white'>Mua ngay</Button>

        <Separator className='my-4' />

        <div className='space-y-4'>
          <div>
            <h3 className='font-medium mb-2 text-gray-700'>Gói tin hàng tháng</h3>
            <ul className='space-y-2'>
              <li className='flex items-center gap-2'>
                <Check className='h-4 w-4 text-green-500' />
                <span className='text-sm text-gray-600'>1 Tin VIP Vàng (hiển thị 7 ngày)</span>
              </li>
              <li className='flex items-center gap-2'>
                <Check className='h-4 w-4 text-green-500' />
                <span className='text-sm text-gray-600'>2 Tin VIP Bạc (hiển thị 7 ngày)</span>
              </li>
              <li className='flex items-center gap-2'>
                <Check className='h-4 w-4 text-green-500' />
                <span className='text-sm text-gray-600'>50 Tin Thường (hiển thị 10 ngày)</span>
              </li>
              <li className='flex items-center gap-2'>
                <Check className='h-4 w-4 text-green-500' />
                <span className='text-sm text-gray-600'>50 lượt đẩy cho Tin Thường</span>
              </li>
            </ul>
          </div>

          <Separator />

          <div>
            <h3 className='font-medium mb-2 text-gray-700'>Tiện ích</h3>
            <ul className='space-y-2'>
              <li className='flex items-center gap-2'>
                <Check className='h-4 w-4 text-green-500' />
                <span className='text-sm text-gray-600'>Xuất bản nhanh</span>
              </li>
              <li className='flex items-center gap-2'>
                <Check className='h-4 w-4 text-green-500' />
                <span className='text-sm text-gray-600'>Bản quyền ảnh</span>
              </li>
              <li className='flex items-center gap-2'>
                <Check className='h-4 w-4 text-green-500' />
                <span className='text-sm text-gray-600'>Hẹn giờ đăng tin</span>
              </li>
              <li className='flex items-center gap-2'>
                <Check className='h-4 w-4 text-green-500' />
                <span className='text-sm text-gray-600'>Báo cáo hiệu suất</span>
              </li>
              <li className='flex items-center gap-2'>
                <Check className='h-4 w-4 text-green-500' />
                <span className='text-sm text-gray-600'>Thao tác với nhiều tin</span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  </div></div>
  )
}

export default VipCard