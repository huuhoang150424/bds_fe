import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useScrollToTopOnMount from '@/hooks/use-scroll-top';
import {
  Search,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Star,
  Heart,
  Eye,
  Calendar,
  Award,
  TrendingUp,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const agents = [
  {
    id: 0,
    name: 'Nguyễn Thị Hải',
    title: 'Chuyên viên tư vấn, Phòng Kinh Doanh',
    phone: '0987654321',
    badge: 'Top môi giới',
    rating: 4.9,
    reviews: 124,
    experience: '5 năm',
    transactions: 48,
    responseRate: '98%',
    areas: [
      'Quận Hoàng Mai & Thanh Xuân, Hà Nội',
      'Khu vực quanh Hồ Tây',
      'Khu đô thị mới Starlake',
      'Các dự án quanh phố Láng Hạ, Hà Nội',
    ],
  },
  {
    id: 1,
    name: 'Trần Tuấn Anh',
    title: 'Chuyên viên tư vấn, Phòng Kinh Doanh',
    phone: '0987123456',
    badge: '5+ năm kinh nghiệm',
    rating: 4.7,
    reviews: 98,
    experience: '6 năm',
    transactions: 62,
    responseRate: '95%',
    areas: ['Khu vực chung cư Vinhomes Sky Lake', 'Khu đô thị Times City', 'Khu vực chung cư The Manor Central Park'],
  },
  {
    id: 2,
    name: 'Phạm Anh',
    title: 'Chuyên viên tư vấn, Phòng Kinh Doanh',
    phone: '0987111222',
    badge: 'Chuyên gia BĐS cao cấp',
    rating: 4.8,
    reviews: 156,
    experience: '8 năm',
    transactions: 87,
    responseRate: '99%',
    areas: [
      'Khu đô thị mới Ciputra, Long Biên',
      'Khu vực chung cư Royal City',
      'Khu đô thị Ecopark',
      'Khu vực phía Bắc và Đông Trung Tâm',
    ],
  },
];

const projects = [
  {
    id: 0,
    name: 'Vinhome Ocean Park',
    location: 'Gia Lâm, Hà Nội',
    badge: 'Dự án hot',
    price: 'Từ 1.8 tỷ',
    units: 120,
    completion: '2023',
  },
  {
    id: 1,
    name: 'The Zenpark Residences',
    location: 'Cầu Giấy, Hà Nội',
    badge: 'Mở bán giai đoạn 2',
    price: 'Từ 3.2 tỷ',
    units: 86,
    completion: '2024',
  },
  {
    id: 2,
    name: 'Sunshine Diamond River',
    location: 'Long Biên, Hà Nội',
    badge: 'Giá tốt nhất thị trường',
    price: 'Từ 2.5 tỷ',
    units: 150,
    completion: '2023',
  },
];

export default function RealEstateAgentDirectory() {
  useScrollToTopOnMount();
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredAgent, setHoveredAgent] = useState<number | null>(null);

  return (
    <div className='mx-auto py-6 px-[100px] '>
      <div className='flex items-center justify-between mb-6'>
        <div className='flex-1'>
          <h1 className='text-xl font-[600] text-red-500'>Danh sách môi giới uy tín hàng đầu</h1>
          <p className='text-sm text-gray-500'>Tìm kiếm môi giới viên</p>
        </div>
        <div className='flex space-x-1'>
          <div className='relative'>
            <Input placeholder='Tìm kiếm' className='outline-none px-[36px] py-[8px] rounded-[8px] w-64' />
            <Search className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
          </div>
          <Button className='bg-red-500 hover:bg-red-600 transition-all duration-300 ease-in-out '>Tìm kiếm</Button>
        </div>
      </div>
      <div className='flex flex-col lg:flex-row gap-10 mt-[30px] '>
        <div className='w-full lg:w-3/4'>
          <div className='flex justify-between items-center mb-8'>
            <h2 className='text-xl font-[600] text-gray-700 flex items-center'>
              Danh bạ nhà môi giới
              <span className='ml-3 px-3 py-[1px]  bg-gradient-to-r from-red-500 via-red-600 to-red-500 text-white text-[13px] rounded-full shadow-sm'>
                24 môi giới
              </span>
            </h2>
            <div className='flex items-center gap-2'>
              <span className='text-[15px] text-gray-600 font-medium'>Sắp xếp theo:</span>
              <Select defaultValue='newest'>
                <SelectTrigger className='w-[180px] focus:ring-0 bg-white border border-gray-200 '>
                  <SelectValue placeholder='Mới nhất' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='newest'>Mới nhất</SelectItem>
                  <SelectItem value='oldest'>Cũ nhất</SelectItem>
                  <SelectItem value='name'>Theo tên</SelectItem>
                  <SelectItem value='rating'>Đánh giá cao nhất</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className='space-y-10'>
            {agents.map((agent) => (
              <div
                key={agent.id}
                className={cn(
                  'rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white border border-gray-200 ',
                  hoveredAgent === agent.id ? 'ring-2 ring-red-400 ring-offset-4' : '',
                )}
                onMouseEnter={() => setHoveredAgent(agent.id)}
                onMouseLeave={() => setHoveredAgent(null)}
              >
                <div className='flex flex-col md:flex-row'>
                  <div className='w-full md:w-1/4 p-[14px] flex justify-center relative overflow-hidden group'>
                    <div className='relative w-30 h-30 md:w-full md:h-48 overflow-hidden rounded-xl shadow-md'>
                      <img
                        src='https://i.pinimg.com/736x/7e/a9/36/7ea9367d037f4f1c849ac4ff3d9495e0.jpg'
                        alt={agent.name}
                        className='object-cover transition-transform duration-500 group-hover:scale-105'
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-red-600/80 via-red-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                    </div>
                    <div className='absolute bottom-6 left-6 right-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center md:text-left'>
                      <span className='bg-gradient-to-r from-red-600 to-red-500 px-3 py-1 rounded-full text-xs font-[500] shadow-lg'>
                        {agent.badge}
                      </span>
                    </div>
                  </div>
                  <div className='w-full md:w-3/4 p-[14px] flex flex-col md:flex-row'>
                    <div className='flex-1 mb-6 md:mb-0'>
                      <div className='flex items-center mb-1'>
                        <h3 className='text-xl font-[500] text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-red-600 mr-2'>
                          {agent.name}
                        </h3>
                        <Badge variant='outline' className='bg-yellow-50 text-yellow-700 border-yellow-200 shadow-sm'>
                          <Star className='h-3 w-3 fill-yellow-500 text-yellow-500 mr-1' />
                          {agent.rating}
                        </Badge>
                      </div>
                      <p className='text-gray-600 mb-1 font-medium'>{agent.title}</p>
                      <p className='text-gray-500 text-sm mb-3'>{agent.reviews} đánh giá</p>
                      <div className='flex items-center gap-2 mb-4 text-gray-700'>
                        <Phone className='h-4 w-4 text-red-500' />
                        <span className='font-medium'>{agent.phone}</span>
                      </div>
                      <div className='flex gap-2'>
                        <Button
                          variant='outline'
                          className='border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-full px-4 shadow-sm hover:shadow transition-all duration-300'
                        >
                          <Mail className='h-4 w-4 mr-1' />
                          Gửi Email
                        </Button>
                        <Button
                          variant='outline'
                          className='border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-full px-[10px] shadow-sm hover:shadow transition-all duration-300'
                        >
                          <Heart className='h-4 w-4' />
                        </Button>
                      </div>
                    </div>
                    <div className='flex-1'>
                      <h4 className='font-[600] mb-2 text-gray-700 text-[18px] flex items-center'>
                        <span className='w-2 h-6 bg-gradient-to-b from-red-500 to-red-400 rounded-full mr-2'></span>
                        Chuyên môn
                      </h4>
                      <ul className='space-y-1'>
                        {agent.areas.map((area, i) => (
                          <li key={i} className='flex items-start gap-1 group/item'>
                            <ChevronRight className='h-5 w-5 text-red-500 flex-shrink-0 transition-transform duration-300 group-hover/item:translate-x-1' />
                            <span className='text-gray-700 group-hover/item:text-red-600 transition-colors duration-300'>
                              {area}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className='flex border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white'>
                  <div className='flex-1 flex items-center justify-center gap-[10px] p-3 text-center border-r border-gray-100 group'>
                    <div className='text-sm text-gray-500 flex items-center justify-center gap-1'>
                      <TrendingUp className='h-3.5 w-3.5 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity' />
                      <span>Giao dịch</span>
                    </div>
                    <div className='font-bold text-gray-800'>{agent.transactions}</div>
                  </div>
                  <div className='flex-1 flex items-center justify-center gap-[10px] p-3 text-center border-r border-gray-100 group'>
                    <div className='text-sm text-gray-500 flex items-center justify-center gap-1'>
                      <Award className='h-3.5 w-3.5 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity' />
                      <span>Phản hồi</span>
                    </div>
                    <div className='font-bold text-gray-800'>{agent.responseRate}</div>
                  </div>
                  <div className='flex-1 flex items-center justify-center gap-[10px] p-3 text-center group'>
                    <div className='text-sm text-gray-500 flex items-center justify-center gap-1'>
                      <Calendar className='h-3.5 w-3.5 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity' />
                      <span>Kinh nghiệm</span>
                    </div>
                    <div className='font-bold text-gray-800'>{agent.experience}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        <div className='w-full lg:w-1/4'>
          <div className='rounded-2xl p-4 border border-gray-200  bg-white relative overflow-hidden'>
            <div className='absolute -top-20 -right-20 w-40 h-40 bg-red-100 rounded-full opacity-50' />
            <div className='absolute -bottom-20 -left-20 w-40 h-40 bg-red-100 rounded-full opacity-50' />

            <h2 className='text-xl font-[600] mb-4 text-center relative inline-block'>
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-red-600'>
                Dự án nổi bật
              </span>
            </h2>

            <div className='space-y-6'>
              {projects.map((project) => (
                <div
                  key={project.id}
                  className='group cursor-pointer hover:translate-y-[-5px] transition-all duration-300'
                >
                  <div className='relative h-46 mb-3 overflow-hidden rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300'>
                    <img
                      src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkQKv-OD4gRTARNaGz8tAp0IwzR-VhzvgKcg&s'
                      alt={project.name}
                      className='object-cover transition-transform duration-500 group-hover:scale-105 w-full h-full '
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

                    <div className='absolute inset-0 flex flex-col justify-end p-4 transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300'>
                      <span className='bg-gradient-to-r from-red-600 to-red-500 px-2 py-1 rounded-md text-xs text-white shadow-lg mb-2 w-fit'>
                        {project.badge}
                      </span>
                      <div className='text-white font-bold mb-1'>{project.price}</div>
                      <div className='flex justify-between items-center'>
                        <div className='flex space-x-2'>
                          <button className='bg-white/20 p-1.5 rounded-full hover:bg-white/30 transition-colors'>
                            <Heart className='h-3.5 w-3.5 text-white' />
                          </button>
                          <button className='bg-white/20 p-1.5 rounded-full hover:bg-white/30 transition-colors'>
                            <Eye className='h-3.5 w-3.5 text-white' />
                          </button>
                        </div>
                        <div className='flex flex-col items-end'>
                          <span className='text-white/80 text-xs'>{project.units} căn hộ</span>
                          <span className='text-white/80 text-xs'>Hoàn thành: {project.completion}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h3 className='font-[600] text-gray-700 group-hover:text-red-600 transition-colors duration-300 text-lg'>
                    {project.name}
                  </h3>
                  <div className='flex items-center text-gray-600'>
                    <MapPin className='h-4 w-4 mr-1 text-red-500' />
                    <span className='text-sm'>{project.location}</span>
                  </div>
                </div>
              ))}
            </div>

            <Button className='w-full mt-8 bg-gradient-to-r from-red-500 via-red-600 to-red-500 hover:from-red-600 hover:via-red-700 hover:to-red-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group'>
              <span>Xem tất cả dự án</span>
              <span className='absolute right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300'>
                <ArrowRight className='h-4 w-4' />
              </span>
            </Button>
          </div>

          {/* Stats Card */}
          <div className='mt-8 rounded-2xl p-5 shadow-lg bg-gradient-to-br from-red-500 via-red-600 to-red-500 text-white relative overflow-hidden'>
            <div className='absolute -top-10 -right-10 w-20 h-20 bg-white/10 rounded-full' />
            <div className='absolute -bottom-10 -left-10 w-20 h-20 bg-white/10 rounded-full' />

            <h3 className='font-bold mb-4 flex items-center'>
              <Star className='h-5 w-5 mr-2 fill-yellow-300 text-yellow-300' />
              Thống kê nổi bật
            </h3>

            <div className='grid grid-cols-2 gap-4'>
              <div className='bg-white/10 rounded-xl p-3 hover:bg-white/20 transition-colors duration-300'>
                <div className='text-xs text-white/80'>Tổng môi giới</div>
                <div className='text-xl font-bold'>1,248</div>
              </div>
              <div className='bg-white/10 rounded-xl p-3 hover:bg-white/20 transition-colors duration-300'>
                <div className='text-xs text-white/80'>Giao dịch tháng</div>
                <div className='text-xl font-bold'>3,842</div>
              </div>
              <div className='bg-white/10 rounded-xl p-3 hover:bg-white/20 transition-colors duration-300'>
                <div className='text-xs text-white/80'>Dự án mới</div>
                <div className='text-xl font-bold'>24</div>
              </div>
              <div className='bg-white/10 rounded-xl p-3 hover:bg-white/20 transition-colors duration-300'>
                <div className='text-xs text-white/80'>Đánh giá</div>
                <div className='text-xl font-bold'>4.8/5</div>
              </div>
            </div>
          </div>

          <div className='mt-8 rounded-2xl p-5 shadow-lg bg-white relative overflow-hidden'>
            <div className='absolute -top-20 -right-20 w-40 h-40 bg-red-100 rounded-full opacity-50' />
            <div className='absolute -bottom-20 -left-20 w-40 h-40 bg-red-100 rounded-full opacity-50' />

            <h3 className='font-bold mb-4 text-gray-800 flex items-center'>
              <span className='w-2 h-6 bg-gradient-to-b from-red-500 to-red-400 rounded-full mr-2'></span>
              Lọc nhanh
            </h3>

            <div className='space-y-3'>
              <Button
                variant='outline'
                className='w-full justify-start border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 rounded-lg shadow-sm'
              >
                <MapPin className='h-4 w-4 mr-2 text-red-500' />
                Quận Hoàng Mai
              </Button>
              <Button
                variant='outline'
                className='w-full justify-start border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 rounded-lg shadow-sm'
              >
                <MapPin className='h-4 w-4 mr-2 text-red-500' />
                Quận Cầu Giấy
              </Button>
              <Button
                variant='outline'
                className='w-full justify-start border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 rounded-lg shadow-sm'
              >
                <MapPin className='h-4 w-4 mr-2 text-red-500' />
                Quận Long Biên
              </Button>
              <Button
                variant='outline'
                className='w-full justify-start border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 rounded-lg shadow-sm'
              >
                <MapPin className='h-4 w-4 mr-2 text-red-500' />
                Quận Hà Đông
              </Button>
            </div>

            <Button className='w-full mt-4 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg shadow-sm'>
              Xem tất cả khu vực
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
