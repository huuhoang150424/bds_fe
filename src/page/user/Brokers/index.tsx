import { useState, useEffect } from 'react';
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
  TrendingUp,
  Home,
  X,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Pagination } from '@/components/user/pagination';
import { Loading } from '@/components/common';
import { Link } from 'react-router-dom';
import { useGetProfessionalAgents } from './hook/use-get-all-boroker';
import { useSearchProfessionalAgents } from './hook/use-search-boroker';

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
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [committedQuery, setCommittedQuery] = useState(''); 
  const [isSearching, setIsSearching] = useState(false);
  const limit = 5;

  const { data: defaultData, isLoading: isDefaultLoading, error: defaultError } = useGetProfessionalAgents(
    currentPage,
    limit
  );
  const { data: searchData, isLoading: isSearchLoading, error: searchError } = useSearchProfessionalAgents(
    committedQuery, 
    currentPage,
    limit,
    isSearching 
  );
  const data = isSearching ? searchData : defaultData;
  const isLoading = isSearching ? isSearchLoading : isDefaultLoading;
  const error = isSearching ? searchError : defaultError;
  const agents = data?.data?.data || [];
  const totalItems = data?.data?.totalItems || 0;
  const totalPages = data?.data?.totalPages || 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setCommittedQuery(searchQuery); 
      setIsSearching(true);
      setCurrentPage(1); 
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setCommittedQuery('');
    setIsSearching(false);
    setCurrentPage(1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="mx-auto py-4 px-[60px]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">
          <h1 className="text-lg font-[600] text-red-500">Danh sách môi giới uy tín hàng đầu</h1>
          <p className="text-xs text-gray-500">Tìm kiếm môi giới viên</p>
        </div>
        <div className="flex space-x-1">
          <div className="relative">
            <Input
              placeholder="Tìm kiếm theo tên, email, số điện thoại..."
              className="outline-none px-[28px] py-[9px] rounded-[6px] w-48 text-xs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Search className="absolute left-2 top-2 h-5 w-3 text-gray-400" />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-2 top-2 h-5 w-5 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Button
            onClick={handleSearch}
            className="bg-red-500 hover:bg-red-600 transition-all duration-300 ease-in-out text-xs py-1 px-3"
            disabled={!searchQuery.trim()}
          >
            Tìm kiếm
          </Button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 mt-[20px]">
        <div className="w-full lg:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-[600] text-gray-700 flex items-center">
              Danh bạ nhà môi giới
              <span className="ml-2 px-2 py-[1px] bg-gradient-to-r from-red-500 via-red-600 to-red-500 text-white text-[11px] rounded-full shadow-sm">
                {totalItems} môi giới
              </span>
            </h2>
            <div className="flex items-center gap-1">
              <span className="text-[13px] text-gray-600 font-medium">Sắp xếp theo:</span>
              <Select defaultValue="newest">
                <SelectTrigger className="w-[140px] focus:ring-0 bg-white border border-gray-200 text-xs">
                  <SelectValue placeholder="Mới nhất" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest" className="text-xs">Mới nhất</SelectItem>
                  <SelectItem value="oldest" className="text-xs">Cũ nhất</SelectItem>
                  <SelectItem value="name" className="text-xs">Theo tên</SelectItem>
                  <SelectItem value="rating" className="text-xs">Đánh giá cao nhất</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <Loading className="my-[200px]" />
          ) : error ? (
            <div className="text-center text-red-500 text-xs">Đã xảy ra lỗi: {error.message}</div>
          ) : (
            <div className="space-y-6">
              {agents.length === 0 ? (
                <div className="text-center text-gray-500 text-xs">
                  {isSearching ? 'Không tìm thấy môi giới nào khớp với tìm kiếm' : 'Không có dữ liệu'}
                </div>
              ) : (
                agents.map((agent: any) => (
                  <div
                    key={agent.id}
                    className={cn(
                      'rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-white border border-gray-200',
                      hoveredAgent === agent.id ? 'ring-1 ring-red-400 ring-offset-2' : ''
                    )}
                    onMouseEnter={() => setHoveredAgent(agent.id)}
                    onMouseLeave={() => setHoveredAgent(null)}
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-1/4 p-[10px] flex justify-center relative overflow-hidden group">
                        <div className="relative w-24 h-24 md:w-full md:h-36 overflow-hidden rounded-lg shadow-sm">
                          <img
                            src={agent.avatar}
                            alt={agent.fullname}
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-red-600/80 via-red-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center md:text-left">
                          <span className="bg-gradient-to-r from-red-600 to-red-500 px-2 py-0.5 rounded-full text-[10px] font-[500] shadow-sm">
                            Chuyên gia BĐS
                          </span>
                        </div>
                      </div>
                      <div className="w-full md:w-3/4 p-[10px] flex flex-col md:flex-row">
                        <div className="flex-1 mb-4 md:mb-0">
                          <div className="flex items-center mb-0.5">
                            <Link
                              to={`/business/${agent.id}`}
                              className="text-lg font-[500] text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-red-600 mr-1"
                            >
                              {agent.fullname}
                            </Link>
                            <Badge
                              variant="outline"
                              className="bg-yellow-50 text-yellow-700 border-yellow-200 shadow-sm text-[10px]"
                            >
                              <Star className="h-2.5 w-2.5 fill-yellow-500 text-yellow-500 mr-0.5" />
                              {agent.totalScore}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-0.5 font-medium text-xs">Chuyên viên tư vấn</p>
                          <p className="text-gray-500 text-xs mb-2">{agent.ratingCount} đánh giá</p>
                          <div className="flex items-center gap-1 mb-3 text-gray-700">
                            <Phone className="h-3 w-3 text-red-500" />
                            <span className="font-medium text-xs">{agent.phone}</span>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="outline"
                              className="border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-full px-3 text-xs shadow-sm hover:shadow transition-all duration-300"
                            >
                              <Mail className="h-3 w-3 mr-0.5" />
                              Gửi Email
                            </Button>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-[600] mb-1 text-gray-700 text-[14px] flex items-center">
                            <span className="w-1.5 h-4 bg-gradient-to-b from-red-500 to-red-400 rounded-full mr-1"></span>
                            Chuyên môn
                          </h4>
                          <ul className="space-y-0.5">
                            {(JSON.parse(agent.expertise || '[]') as string[]).map((area: string, i: number) => (
                              <li key={i} className="flex items-start gap-0.5 group/item">
                                <ChevronRight className="h-4 w-4 text-red-500 flex-shrink-0 transition-transform duration-300 group-hover/item:translate-x-0.5" />
                                <span className="text-gray-700 group-hover/item:text-red-600 transition-colors duration-300 text-xs">
                                  {area}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="flex border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                      <div className="flex-1 flex items-center justify-center gap-[6px] p-2 text-center border-r border-gray-100 group">
                        <div className="text-xs text-gray-500 flex items-center justify-center gap-0.5">
                          <TrendingUp className="h-3 w-3 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <span>Lượt yêu thích</span>
                        </div>
                        <div className="font-bold text-gray-800 text-xs">{agent.wishlistCount}</div>
                      </div>
                      <div className="flex-1 flex items-center justify-center gap-[6px] p-2 text-center border-r border-gray-100 group">
                        <div className="text-xs text-gray-500 flex items-center justify-center gap-0.5">
                          <Home className="h-3 w-3 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <span>Địa chỉ</span>
                        </div>
                        <div className="font-bold text-gray-800 text-xs">{agent.address}</div>
                      </div>
                      <div className="flex-1 flex items-center justify-center gap-[6px] p-2 text-center group">
                        <div className="text-xs text-gray-500 flex items-center justify-center gap-0.5">
                          <Calendar className="h-3 w-3 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <span>Kinh nghiệm</span>
                        </div>
                        <div className="font-bold text-gray-800 text-xs">{agent.experience_years} năm</div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                className="mt-0"
              />
            </div>
          )}
        </div>

        <div className="w-full lg:w-1/4">
          <div className="rounded-xl p-3 border border-gray-200 bg-white relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-red-100 rounded-full opacity-50" />
            <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-red-100 rounded-full opacity-50" />

            <h2 className="text-lg font-[600] mb-3 text-center relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-red-600">
                Dự án nổi bật
              </span>
            </h2>

            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="group cursor-pointer hover:translate-y-[-3px] transition-all duration-300"
                >
                  <div className="relative h-36 mb-2 overflow-hidden rounded-lg shadow-sm group-hover:shadow-md transition-all duration-300">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkQKv-OD4gRTARNaGz8tAp0IwzR-VhzvgKcg&s"
                      alt={project.name}
                      className="object-cover transition-transform duration-500 group-hover:scale-105 w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute inset-0 flex flex-col justify-end p-3 transform translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="bg-gradient-to-r from-red-600 to-red-500 px-1.5 py-0.5 rounded-md text-[10px] text-white shadow-sm mb-1 w-fit">
                        {project.badge}
                      </span>
                      <div className="text-white font-bold text-xs mb-0.5">{project.price}</div>
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-1">
                          <button className="bg-white/20 p-1 rounded-full hover:bg-white/30 transition-colors">
                            <Heart className="h-3 w-3 text-white" />
                          </button>
                          <button className="bg-white/20 p-1 rounded-full hover:bg-white/30 transition-colors">
                            <Eye className="h-3 w-3 text-white" />
                          </button>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-white/80 text-[10px]">{project.units} căn hộ</span>
                          <span className="text-white/80 text-[10px]">Hoàn thành: {project.completion}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-[600] text-gray-700 group-hover:text-red-600 transition-colors duration-300 text-sm">
                    {project.name}
                  </h3>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-3 w-3 mr-0.5 text-red-500" />
                    <span className="text-xs">{project.location}</span>
                  </div>
                </div>
              ))}
            </div>

            <Button className="w-full mt-6 bg-gradient-to-r from-red-500 via-red-600 to-red-500 hover:from-red-600 hover:via-red-700 hover:to-red-600 rounded-full shadow-sm hover:shadow-md transition-all duration-300 group text-xs">
              <span>Xem tất cả dự án</span>
              <span className="absolute right-3 opacity-0 group-hover:opacity-100 transform translate-x-1 group-hover:translate-x-0 transition-all duration-300">
                <ArrowRight className="h-3 w-3" />
              </span>
            </Button>
          </div>

          <div className="mt-6 rounded-xl p-4 shadow-md bg-gradient-to-br from-red-500 via-red-600 to-red-500 text-white relative overflow-hidden">
            <div className="absolute -top-8 -right-8 w-16 h-16 bg-white/10 rounded-full" />
            <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-white/10 rounded-full" />

            <h3 className="font-bold mb-3 flex items-center text-sm">
              <Star className="h-4 w-4 mr-1 fill-yellow-300 text-yellow-300" />
              Thống kê nổi bật
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/10 rounded-lg p-2 hover:bg-white/20 transition-colors duration-300">
                <div className="text-[10px] text-white/80">Tổng môi giới</div>
                <div className="text-lg font-bold">1,248</div>
              </div>
              <div className="bg-white/10 rounded-lg p-2 hover:bg-white/20 transition-colors duration-300">
                <div className="text-[10px] text-white/80">Giao dịch tháng</div>
                <div className="text-lg font-bold">3,842</div>
              </div>
              <div className="bg-white/10 rounded-lg p-2 hover:bg-white/20 transition-colors duration-300">
                <div className="text-[10px] text-white/80">Dự án mới</div>
                <div className="text-lg font-bold">24</div>
              </div>
              <div className="bg-white/10 rounded-lg p-2 hover:bg-white/20 transition-colors duration-300">
                <div className="text-[10px] text-white/80">Đánh giá</div>
                <div className="text-lg font-bold">4.8/5</div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl p-4 shadow-md bg-white relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-red-100 rounded-full opacity-50" />
            <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-red-100 rounded-full opacity-50" />

            <h3 className="font-bold mb-3 text-gray-800 flex items-center text-sm">
              <span className="w-1.5 h-4 bg-gradient-to-b from-red-500 to-red-400 rounded-full mr-1"></span>
              Lọc nhanh
            </h3>

            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 rounded-md shadow-sm text-xs"
              >
                <MapPin className="h-3 w-3 mr-1 text-red-500" />
                Quận Hoàng Mai
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 rounded-md shadow-sm text-xs"
              >
                <MapPin className="h-3 w-3 mr-1 text-red-500" />
                Quận Cầu Giấy
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 rounded-md shadow-sm text-xs"
              >
                <MapPin className="h-3 w-3 mr-1 text-red-500" />
                Quận Long Biên
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 rounded-md shadow-sm text-xs"
              >
                <MapPin className="h-3 w-3 mr-1 text-red-500" />
                Quận Hà Đông
              </Button>
            </div>

            <Button className="w-full mt-3 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md shadow-sm text-xs">
              Xem tất cả khu vực
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}