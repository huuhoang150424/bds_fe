import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

const newss = [
  {
    category: 'TIN TỨC',
    date: '10/03/2025 11:03',
    author: 'Nguyễn Nam',
    title: 'Đất Đấu Giá Hưng Yên Nổi Sóng Đầu Năm',
    description:
      'Thị trường đất đấu giá lại tiếp tục dậy sóng khi các phiên đấu giá đất tại Hưng Yên ghi nhận mức trúng đấu giá khủng. Việc các phiên đấu giá đất có mức giá trúng tăng cao khiến nhiều người lo ngại...',
    image:
      'https://th.bing.com/th?id=OIP.qPwKLrByk5_ml6xFUnv6FAHaEK&w=333&h=187&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
    view: 100000,
  },
  {
    category: 'KINH TẾ',
    date: '12/03/2025 09:15',
    author: 'Trần Minh',
    title: 'Giá Vàng Tiếp Tục Biến Động Mạnh',
    description:
      'Thị trường vàng chứng kiến biến động mạnh khi giá vàng thế giới liên tục tăng giảm thất thường. Các chuyên gia dự báo xu hướng giá vàng trong thời gian tới vẫn còn nhiều biến động...',
    image:
      'https://th.bing.com/th?id=OIP.vcn1Yqi9gWTpRwIbjS75bwHaGa&w=268&h=232&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
    view: 100001,
  },
  {
    category: 'BẤT ĐỘNG SẢN',
    date: '15/03/2025 14:20',
    author: 'Lê Hoàng',
    title: 'Hà Nội Duyệt Quy Hoạch Mới Cho Khu Đô Thị Tây Hồ',
    description:
      'UBND TP Hà Nội vừa thông qua quy hoạch chi tiết cho khu đô thị Tây Hồ, dự kiến thu hút nhiều nhà đầu tư lớn. Dự án này hứa hẹn sẽ mang đến diện mạo mới cho khu vực ven hồ...',
    image:
      'https://th.bing.com/th?id=OIP.vcn1Yqi9gWTpRwIbjS75bwHaGa&w=268&h=232&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
    view: 100003,
  },
  {
    category: 'CÔNG NGHỆ',
    date: '17/03/2025 16:45',
    author: 'Phạm Hùng',
    title: 'Apple Ra Mắt iPhone 16 Với Nhiều Nâng Cấp Mới',
    description:
      'Apple vừa chính thức ra mắt dòng iPhone 16 với nhiều cải tiến đáng kể về camera, hiệu năng và thời lượng pin. Sản phẩm này được kỳ vọng sẽ tạo nên cơn sốt trong giới công nghệ...',
    image:
      'https://th.bing.com/th?id=OIP.vcn1Yqi9gWTpRwIbjS75bwHaGa&w=268&h=232&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
    view: 100006,
  },
  {
    category: 'THỂ THAO',
    date: '20/03/2025 18:30',
    author: 'Đỗ Trung',
    title: 'Đội Tuyển Việt Nam Chuẩn Bị Cho Trận Giao Hữu Quốc Tế',
    description:
      'Đội tuyển bóng đá Việt Nam đang gấp rút chuẩn bị cho trận giao hữu quốc tế sắp tới, với mục tiêu thử nghiệm đội hình và chiến thuật mới nhằm hướng tới những giải đấu quan trọng...',
    image:
      'https://th.bing.com/th?id=OIP.vcn1Yqi9gWTpRwIbjS75bwHaGa&w=268&h=232&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
    view: 100009,
  },
  {
    category: 'GIÁO DỤC',
    date: '22/03/2025 07:50',
    author: 'Lê Hạnh',
    title: 'Bộ GD-ĐT Công Bố Lịch Thi Tốt Nghiệp THPT 2025',
    description:
      'Bộ Giáo dục và Đào tạo vừa công bố lịch thi tốt nghiệp THPT năm 2025. Kỳ thi sẽ diễn ra trong ba ngày với nhiều thay đổi đáng chú ý trong cách thức tổ chức và nội dung đề thi...',
    image:
      'https://th.bing.com/th?id=OIP.vcn1Yqi9gWTpRwIbjS75bwHaGa&w=268&h=232&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
    view: 100010,
  },
  {
    category: 'SỨC KHỎE',
    date: '25/03/2025 10:15',
    author: 'Ngô Thanh',
    title: 'Những Loại Thực Phẩm Tốt Cho Tim Mạch',
    description:
      'Các chuyên gia dinh dưỡng khuyến cáo rằng việc bổ sung các thực phẩm như cá hồi, quả bơ và hạnh nhân vào chế độ ăn uống hàng ngày có thể giúp giảm nguy cơ mắc bệnh tim mạch...',
    image:
      'https://th.bing.com/th?id=OIP.vcn1Yqi9gWTpRwIbjS75bwHaGa&w=268&h=232&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
    view: 101000,
  },
  {
    category: 'GIẢI TRÍ',
    date: '28/03/2025 20:00',
    author: 'Bùi Anh',
    title: 'Phim Bom Tấn Mới Của Marvel Lập Kỷ Lục Doanh Thu',
    description:
      'Bộ phim siêu anh hùng mới nhất của Marvel đã lập kỷ lục doanh thu phòng vé ngay trong tuần đầu công chiếu, thu hút sự quan tâm lớn từ người hâm mộ trên toàn thế giới...',
    image:
      'https://th.bing.com/th?id=OIP.vcn1Yqi9gWTpRwIbjS75bwHaGa&w=268&h=232&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
    view: 110000,
  },
  {
    category: 'KHOA HỌC',
    date: '01/04/2025 08:45',
    author: 'Hà An',
    title: 'NASA Công Bố Kế Hoạch Chinh Phục Sao Hỏa',
    description:
      'NASA vừa tiết lộ kế hoạch đưa con người lên sao Hỏa vào năm 2035, đánh dấu một bước tiến lớn trong công cuộc khám phá vũ trụ...',
    image:
      'https://th.bing.com/th?id=OIP.vcn1Yqi9gWTpRwIbjS75bwHaGa&w=268&h=232&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
    view: 120000,
  },
  {
    category: 'Ô TÔ',
    date: '03/04/2025 13:20',
    author: 'Phạm Long',
    title: 'Tesla Ra Mắt Dòng Xe Điện Mới Giá Rẻ',
    description: 'Tesla vừa công bố mẫu xe điện mới với giá phải chăng hơn, nhắm tới phân khúc khách hàng phổ thông...',
    image:
      'https://th.bing.com/th?id=OIP.vcn1Yqi9gWTpRwIbjS75bwHaGa&w=268&h=232&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
    view: 95000,
  },
  {
    category: 'KINH DOANH',
    date: '05/04/2025 11:30',
    author: 'Vũ Hùng',
    title: 'Amazon Đầu Tư 1 Tỷ USD Vào Thị Trường Đông Nam Á',
    description:
      'Amazon vừa công bố khoản đầu tư lớn vào thị trường Đông Nam Á nhằm mở rộng hệ sinh thái thương mại điện tử...',
    image:
      'https://th.bing.com/th?id=OIP.vcn1Yqi9gWTpRwIbjS75bwHaGa&w=268&h=232&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
    view: 105000,
  },
  {
    category: 'DU LỊCH',
    date: '07/04/2025 09:00',
    author: 'Nguyễn Lâm',
    title: 'Top 10 Điểm Đến Đẹp Nhất Việt Nam 2025',
    description:
      'Danh sách những điểm đến hấp dẫn nhất Việt Nam trong năm 2025 vừa được công bố, hứa hẹn nhiều trải nghiệm tuyệt vời...',
    image:
      'https://th.bing.com/th?id=OIP.vcn1Yqi9gWTpRwIbjS75bwHaGa&w=268&h=232&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
    view: 89000,
  },
  {
    category: 'THỜI TRANG',
    date: '10/04/2025 17:45',
    author: 'Lê Minh',
    title: 'Xu Hướng Thời Trang Mùa Hè 2025',
    description:
      'Những phong cách thời trang nổi bật cho mùa hè 2025 đang được các chuyên gia dự đoán sẽ trở thành xu hướng...',
    image:
      'https://th.bing.com/th?id=OIP.vcn1Yqi9gWTpRwIbjS75bwHaGa&w=268&h=232&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
    view: 102000,
  },
  {
    category: 'CÔNG NGHỆ',
    date: '12/04/2025 15:20',
    author: 'Trần Đạt',
    title: 'Google Nâng Cấp AI Mới Trong Tìm Kiếm',
    description:
      'Google vừa công bố phiên bản AI tìm kiếm mới giúp cải thiện trải nghiệm người dùng với tốc độ nhanh hơn...',
    image:
      'https://th.bing.com/th?id=OIP.vcn1Yqi9gWTpRwIbjS75bwHaGa&w=268&h=232&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
    view: 98000,
  },
];

const orderNewsByTime = (newsArray: any[]) => {
  return newsArray.sort(
    (a, b) =>
      new Date(b.date.split(' ')[0].split('/').reverse().join('-') + 'T' + b.date.split(' ')[1]).getTime() -
      new Date(a.date.split(' ')[0].split('/').reverse().join('-') + 'T' + a.date.split(' ')[1]).getTime(),
  );
};
console.log(orderNewsByTime(newss));

const orderNewsByView = (newsArray: any[]) => {
  return newsArray.sort((a, b) => b.view - a.view);
};

console.log(orderNewsByView(newss)[0]);
const latestNews = orderNewsByTime(newss)[0];

function News() {
  const [visibleProperties, setVisibleProperties] = useState<number>(8);
  const handleLoadMore = () => {
    setVisibleProperties((prev) => prev + 3);
  };
  return (
    <div className='max-w-6xl h-full mx-auto pt-[80px] px-4 md:px-6 lg:px-8'>
      {/* Search */}
      <div className='search bg-yellow-500'></div>

      {/* Title Section */}
      <div className='flex flex-col items-center px-4 md:px-8 lg:px-[210px] py-8 md:py-12 lg:py-[60px]'>
        <div className='title mb-4 md:mb-[20px] text-center'>
          <h1 className='font-[500] text-2xl md:text-3xl lg:text-[40px] leading-tight md:leading-[64px]'>
            Tin tức bất động sản mới nhất
          </h1>
        </div>
        <div className='descrip font-[400] text-sm md:text-base lg:text-[16px] leading-relaxed md:leading-[26px] text-center max-w-3xl'>
          <p>
            Thông tin mới, đầy đủ, hấp dẫn về thị trường bất động sản Việt Nam thông qua dữ liệu lớn về giá, giao dịch,
            nguồn cung - cầu và khảo sát thực tế của đội ngũ phóng viên, biên tập của Batdongsan.com.vn
          </p>
        </div>
      </div>

      {/* Main News Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-4'>
        <div className='col-span-1 lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-7'>
          {/* Latest News */}
          <div className='firstNew relative col-span-1 lg:col-span-8'>
            <img 
              src={latestNews.image} 
              alt='ảnh nền' 
              className='w-full h-[240px] md:h-[300px] lg:h-[360px] object-cover rounded-lg'
            />
            <div className='absolute inset-0 bg-black/30 rounded-lg'></div>
            <div className='absolute w-full top-[45%] p-4 md:p-6 lg:p-[30px] flex flex-col items-start gap-2'>
              <div className='flex text-gray-100 text-xs md:text-sm lg:text-[14px] gap-2 font-[400] leading-relaxed'>
                <span>{latestNews.date}</span>
                <span>{latestNews.category}</span>
              </div>
              <div>
                <span className='font-[500] text-lg md:text-xl lg:text-[24px] leading-tight md:leading-[32px] text-[#fff]'>
                  {latestNews.title}
                </span>
              </div>
              <div>
                <span className='text-sm md:text-base lg:text-[16px] font-[400] leading-relaxed md:leading-[26px] w-full text-[#fff] line-clamp-2 md:line-clamp-3'>
                  {latestNews.description}
                </span>
              </div>
            </div>
          </div>

          {/* Side News */}
          <div className='col-span-1 lg:col-span-4'>
            {orderNewsByTime(newss)
              .slice(2, 5)
              .map((news, index) => (
                <div key={index} className='w-full'>
                  <div className='pr-4 md:pr-[15px] py-4 md:py-[15px] space-y-1'>
                    <div className='flex text-gray-400 text-xs md:text-sm gap-2 font-[400]'>
                      <span>{news.date}</span>
                      <span>{news.author}</span>
                    </div>
                    <div>
                      <span className='font-[400] text-base md:text-lg lg:text-xl line-clamp-2'>
                        {news.title}
                      </span>
                    </div>
                  </div>
                  <div className='border border-gray-100'></div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* News List and Sidebar */}
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-4 mt-8'>
        {/* News List */}
        <div className='col-span-1 lg:col-span-8'>
          <div className='mt-4 md:mt-[30px]'>
            {newss.slice(5, visibleProperties).map((news, index) => (
              <div key={index} className='grid grid-cols-1 md:grid-cols-12 mb-4 md:mb-[20px] w-full gap-4 md:gap-5'>
                <div className='col-span-1 md:col-span-4 relative'>
                  <img 
                    src={news.image} 
                    alt='ảnh new' 
                    className='rounded-[8px] w-full h-[200px] md:h-[150px] object-cover'
                  />
                  <div className='absolute top-2 md:top-[10px] bg-[#505050] rounded-br-[5px] rounded-tr-[5px] px-2 md:px-[10px] py-1 md:py-[2px] text-[#fff] text-xs md:text-sm'>
                    Tin tức
                  </div>
                </div>
                <div className='col-span-1 md:col-span-8 pr-4 md:pr-[15px] py-4 md:py-[15px] space-y-1'>
                  <div className='flex text-gray-400 text-xs md:text-sm gap-2 font-[400]'>
                    <span>{news.date}</span>
                    <span>{news.author}</span>
                  </div>
                  <div>
                    <span className='font-[400] text-base md:text-lg lg:text-xl line-clamp-2'>
                      {news.title}
                    </span>
                  </div>
                  <div>
                    <span className='text-xs md:text-sm font-[400] w-full line-clamp-2 md:line-clamp-3'>
                      {news.description}
                    </span>
                  </div>
                </div>
                <div className='border border-gray-100 col-span-1 md:col-span-12 mt-4 md:mt-[20px]'></div>
              </div>
            ))}

            {visibleProperties < newss.length && (
              <div className='flex justify-center my-8'>
                <Button
                  onClick={handleLoadMore}
                  className='bg-white text-[#E03C31] hover:bg-[#E03C31] hover:text-white border border-[#E03C31] px-6 md:px-8 py-2 rounded-full transition-colors duration-300 text-sm md:text-base'
                >
                  Xem thêm
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className='col-span-1 lg:col-span-4 lg:col-start-9'>
          <div className='border rounded-[8px] sticky top-24'>
            <div className='font-[500] text-base md:text-lg text-center p-4 md:p-[15px]'>
              <span>Bài viết được xem nhiều nhất</span>
            </div>
            <div className='border border-gray-100'></div>
            <div>
              {orderNewsByView(newss)
                .slice(0, 5)
                .map((news, index) => (
                  <div key={index} className='px-4 md:px-[20px]'>
                    <div className='flex items-center justify-start gap-4 py-4'>
                      <div className='rounded-[50%] w-8 h-8 md:w-[32px] md:h-[32px] text-[#E03C31] bg-[#FFECEB] p-2 md:p-[8px] flex items-center justify-center text-sm md:text-base'>
                        <span>{index + 1}</span>
                      </div>
                      <div className='text-sm md:text-base line-clamp-2'>{news.title}</div>
                    </div>
                    <div className='border border-gray-100'></div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default News;
