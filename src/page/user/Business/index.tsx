import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CompanySection from '@/page/user/Business/components/company-section';
import FeaturedListings from '@/page/user/Business/components/featured-listing';
import {
  companiesDes,
  companiesConstruct,
  companiesAgencies,
  companiesConsulation,
  companiesFianecial,
  companiesMaterial,
  companiesInterior,
  companiesOther,
  allCities,
} from '@/constant/constBusiness';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { CustomImage } from '@/components/common';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useScrollToTopOnMount from '@/hooks/use-scroll-top';

export default function Business() {
  useScrollToTopOnMount();
  return (
    <div className='max-w-6xl mx-auto pt-[80px]'>
      {/* Header */}
      <div className='mt-4 flex flex-col md:flex-row gap-2'>
        <div className='flex-1 flex gap-2'>
          <Input placeholder='Tìm kiếm theo từ khóa' className='flex-1' />
          <Select>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Lĩnh vực' />
            </SelectTrigger>
            <SelectContent>
              <ScrollArea className='h-[200px] rounded-md'>
                <div>
                  <SelectGroup>
                    <SelectItem value='apple'>Chủ đầu tư</SelectItem>
                    <SelectItem value='banana'>Thi công xây dựng</SelectItem>
                    <SelectItem value='blueberry'>Tư vấn thiết kế</SelectItem>
                    <SelectItem value='grapes'>Trang trí nội thất</SelectItem>
                    <SelectItem value='pineapple'>Tài chính, pháp lý</SelectItem>
                    <SelectItem value='q'>Vật liệu xây dựng</SelectItem>
                  </SelectGroup>
                  <Separator className='my-2' />
                </div>
              </ScrollArea>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Thành phố' />
            </SelectTrigger>
            <SelectContent>
              <ScrollArea className='h-[200px] rounded-md'>
                <div>
                  <SelectGroup>
                    {allCities.map((city, index) => (
                      <SelectItem value={city}>{city}</SelectItem>
                    ))}
                  </SelectGroup>
                  <Separator className='my-2' />
                </div>
              </ScrollArea>
            </SelectContent>
          </Select>
        </div>
        <Button className='bg-red-500 hover:bg-red-600'>
          <Search className='mr-2 h-4 w-4' />
          Tìm kiếm
        </Button>
      </div>

      <div className='container mx-auto py-6'>
        <div className='flex flex-col lg:flex-row gap-6'>
          <div className='lg:w-3/4'>
            <p className='text-sm text-muted-foreground mb-4'>
              Các doanh nghiệp cùng tư bài đăng sản phẩm tại Việt Nam
            </p>

            {/* Developers Section */}
            <CompanySection title='Chủ đầu tư' companies={companiesDes} />

            {/* Construction Section */}
            <CompanySection title='Thi công xây dựng' companies={companiesConstruct} />

            {/* Design Consultation Section */}
            <CompanySection title='Tư vấn thiết kế' companies={companiesConsulation} />

            {/* Real Estate Agencies Section */}
            <CompanySection title='Sàn giao dịch bất động sản' companies={companiesAgencies} />

            {/* Interior Design Section */}
            <CompanySection title='Trang trí nội thất' companies={companiesInterior} />

            {/* Construction Materials Section */}
            <CompanySection title='Vật liệu xây dựng' companies={companiesMaterial} />

            {/* Financial and Legal Section */}
            <CompanySection title='Tài chính pháp lý' companies={companiesFianecial} />

            {/* Other Services Section */}
            <CompanySection title='Các lĩnh vực khác' companies={companiesOther} />
          </div>

          {/* Sidebar */}
          <div className='lg:w-1/4'>
            <div className='border rounded-md p-4 mb-4'>
              <div className='flex items-center justify-between mb-4'>
                <h3 className='font-medium'>Nhận bản tin từ Batdongsan.com.vn</h3>
              </div>
              <div className='flex gap-2 mb-4'>
                <Input placeholder='Nhập email' />
                <Button className='bg-red-500 hover:bg-red-600'>Đăng ký</Button>
              </div>
            </div>

            <div className='border rounded-md overflow-hidden mb-4'>
              <h3 className='bg-gray-100 p-3 font-medium'>DỰ ÁN NỔI BẬT</h3>
              <FeaturedListings />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
