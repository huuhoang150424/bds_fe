import { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  ChevronUp,
  Send,
  Globe,
  Facebook,
  Youtube,
  Instagram,
  ArrowUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [email, setEmail] = useState('');

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className='bg-gradient-to-r from-slate-900 to-slate-800 text-white relative px-[60px] '>
      <div className='container mx-auto py-8 px-4 md:px-6'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 items-center border-b border-slate-700 pb-8'>
          <div className='flex flex-col items-center md:items-start'>
            <div className='flex items-center gap-2 mb-2'>
              <div className='h-10 w-10 relative'>
                <div className='absolute inset-0 bg-red-500 rounded-md rotate-45 transform-gpu transition-transform hover:rotate-90 duration-500'></div>
                <div className='absolute inset-0 flex items-center justify-center'>
                  <span className='text-white font-bold'>BĐS</span>
                </div>
              </div>
              <div>
                <h2 className='text-xl font-bold'>.com.vn</h2>
                <p className='text-xs text-slate-300'>by PropertyGuru</p>
              </div>
            </div>
          </div>

          <div className='flex items-center justify-center md:justify-start gap-3 group'>
            <div className='bg-red-500 p-2 rounded-full transition-all duration-300 group-hover:bg-white group-hover:text-red-500'>
              <Phone size={20} className='animate-pulse' />
            </div>
            <div>
              <p className='text-slate-300 text-sm'>Hotline</p>
              <p className='font-bold'>1900 1881</p>
            </div>
          </div>

          <div className='flex items-center justify-center md:justify-start gap-3 group'>
            <div className='bg-red-500 p-2 rounded-full transition-all duration-300 group-hover:bg-white group-hover:text-red-500'>
              <MapPin size={20} />
            </div>
            <div>
              <p className='text-slate-300 text-sm'>Hỗ trợ khách hàng</p>
              <p className='font-bold'>trogiup.batdongsan.com.vn</p>
            </div>
          </div>

          <div className='flex items-center justify-center md:justify-start gap-3 group'>
            <div className='bg-red-500 p-2 rounded-full transition-all duration-300 group-hover:bg-white group-hover:text-red-500'>
              <Mail size={20} />
            </div>
            <div>
              <p className='text-slate-300 text-sm'>Chăm sóc khách hàng</p>
              <p className='font-bold'>hotro@batdongsan.com.vn</p>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 py-8'>
          <div className='space-y-4'>
            <h3 className='font-bold text-lg border-l-4 border-red-500 pl-3'>CÔNG TY CỔ PHẦn BẤT ĐỘNG SẢN VIỆT NAM</h3>
            <div className='flex items-start gap-3 group'>
              <MapPin size={20} className='text-red-500 mt-1 group-hover:animate-bounce' />
              <p className='text-sm'>Tầng 31, Keangnam Hanoi Landmark, Phạm Hùng, Nam Từ Liêm, Hà Nội</p>
            </div>
            <div className='flex items-center gap-3 group'>
              <Phone size={20} className='text-red-500 group-hover:animate-pulse' />
              <p className='text-sm'>(024) 3562 5939 - (024) 3562 5940</p>
            </div>
          </div>

          <div className='space-y-4'>
            <h3 className='font-bold text-lg border-l-4 border-red-500 pl-3'>HƯỚNG DẪN</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  to={'/'}
                  className='text-sm text-slate-300 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2 group'
                >
                  <span className='h-1 w-1 bg-red-500 rounded-full group-hover:w-2 transition-all duration-300'></span>
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link
                  to={'/'}
                  className='text-sm text-slate-300 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2 group'
                >
                  <span className='h-1 w-1 bg-red-500 rounded-full group-hover:w-2 transition-all duration-300'></span>
                  Báo giá và hỗ trợ
                </Link>
              </li>
              <li>
                <Link
                  to={'/'}
                  className='text-sm text-slate-300 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2 group'
                >
                  <span className='h-1 w-1 bg-red-500 rounded-full group-hover:w-2 transition-all duration-300'></span>
                  Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link
                  to={'/'}
                  className='text-sm text-slate-300 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2 group'
                >
                  <span className='h-1 w-1 bg-red-500 rounded-full group-hover:w-2 transition-all duration-300'></span>
                  Góp ý báo lỗi
                </Link>
              </li>
              <li>
                <Link
                  to={'/'}
                  className='text-sm text-slate-300 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2 group'
                >
                  <span className='h-1 w-1 bg-red-500 rounded-full group-hover:w-2 transition-all duration-300'></span>
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          <div className='space-y-4'>
            <h3 className='font-bold text-lg border-l-4 border-red-500 pl-3'>QUY ĐỊNH</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  to={'/'}
                  className='text-sm text-slate-300 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2 group'
                >
                  <span className='h-1 w-1 bg-red-500 rounded-full group-hover:w-2 transition-all duration-300'></span>
                  Quy định đăng tin
                </Link>
              </li>
              <li>
                <Link
                  to={'/'}
                  className='text-sm text-slate-300 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2 group'
                >
                  <span className='h-1 w-1 bg-red-500 rounded-full group-hover:w-2 transition-all duration-300'></span>
                  Quy chế hoạt động
                </Link>
              </li>
              <li>
                <Link
                  to={'/'}
                  className='text-sm text-slate-300 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2 group'
                >
                  <span className='h-1 w-1 bg-red-500 rounded-full group-hover:w-2 transition-all duration-300'></span>
                  Điều khoản thỏa thuận
                </Link>
              </li>
              <li>
                <Link
                  to={'/'}
                  className='text-sm text-slate-300 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2 group'
                >
                  <span className='h-1 w-1 bg-red-500 rounded-full group-hover:w-2 transition-all duration-300'></span>
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link
                  to={'/'}
                  className='text-sm text-slate-300 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2 group'
                >
                  <span className='h-1 w-1 bg-red-500 rounded-full group-hover:w-2 transition-all duration-300'></span>
                  Giải quyết khiếu nại
                </Link>
              </li>
            </ul>
          </div>

          <div className='space-y-4'>
            <h3 className='font-bold text-lg border-l-4 border-red-500 pl-3'>ĐĂNG KÝ NHẬN TIN</h3>
            <div className='relative'>
              <Input
                type='email'
                placeholder='Nhập email của bạn'
                className='outline-none px-[16px] py-[8px] rounded-[8px] bg-slate-800 border-slate-700 text-white pr-10 focus:ring-red-500 focus:border-red-500 '
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                size='icon'
                className='absolute right-0 top-0 h-full bg-red-500 hover:bg-red-600 rounded-l-none'
                onClick={() => setEmail('')}
              >
                <Send size={18} className='group-hover:translate-x-1 transition-transform duration-300' />
              </Button>
            </div>

            <div>
              <h3 className='font-bold text-lg border-l-4 border-red-500 pl-3 mb-4'>QUỐC GIA & NGÔN NGỮ</h3>
              <div className='relative'>
                <Button
                  variant='outline'
                  className='w-full justify-between bg-slate-800 border-slate-700 text-white hover:bg-slate-700'
                >
                  <div className='flex items-center gap-2'>
                    <Globe size={18} />
                    <span>Việt Nam</span>
                  </div>
                  <ChevronDown size={18} />
                </Button>
              </div>
            </div>

            <div className='flex gap-4 pt-4'>
              <Link to={'/'} className='bg-slate-800 p-2 rounded-full hover:bg-red-500 transition-colors duration-300'>
                <Facebook size={20} />
              </Link>
              <Link to={'/'} className='bg-slate-800 p-2 rounded-full hover:bg-red-500 transition-colors duration-300'>
                <Youtube size={20} />
              </Link>
              <Link to={'/'} className='bg-slate-800 p-2 rounded-full hover:bg-red-500 transition-colors duration-300'>
                <Instagram size={20} />
              </Link>
            </div>
          </div>
        </div>
        <div className='border-t border-slate-700 pt-6'>
          <button
            onClick={toggleExpand}
            className='flex items-center gap-2 text-lg font-bold mb-4 w-full justify-between'
          >
            <div className='flex items-center gap-2'>
              <span className='h-4 w-1 bg-red-500'></span>
              <span>Xem chi nhánh của bdsNHH.com.vn</span>
            </div>
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {isExpanded && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 animate-fadeIn'>
              <div className='bg-slate-800 p-4 rounded-lg hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 transform hover:-translate-y-1'>
                <h4 className='font-bold mb-2'>Chi nhánh TP Hồ Chí Minh</h4>
                <p className='text-sm text-slate-300 mb-2'>
                  Tầng 8, Tháp B tòa nhà Viettel Complex, 285 Cách Mạng Tháng Tám, Phường 12, Quận 10, TP Hồ Chí Minh
                </p>
                <p className='text-sm flex items-center gap-2'>
                  <Phone size={16} className='text-red-500' /> Hotline: 1900 1881
                </p>
              </div>

              <div className='bg-slate-800 p-4 rounded-lg hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 transform hover:-translate-y-1'>
                <h4 className='font-bold mb-2'>Chi nhánh Hải Phòng</h4>
                <p className='text-sm text-slate-300 mb-2'>
                  Phòng 502, TD Business Center, lô 20A Lê Hồng Phong, quận Ngô Quyền, TP. Hải Phòng
                </p>
                <p className='text-sm flex items-center gap-2'>
                  <Phone size={16} className='text-red-500' /> Hotline: 1900 1881
                </p>
              </div>

              <div className='bg-slate-800 p-4 rounded-lg hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 transform hover:-translate-y-1'>
                <h4 className='font-bold mb-2'>Chi nhánh Bình Dương</h4>
                <p className='text-sm text-slate-300 mb-2'>
                  Phòng 10, tầng 16, Becamex Tower, số 230 Đại lộ Bình Dương, Phú Hòa, TP.Thủ Dầu Một, tỉnh Bình Dương
                </p>
                <p className='text-sm flex items-center gap-2'>
                  <Phone size={16} className='text-red-500' /> Hotline: 1900 1881
                </p>
              </div>

              <div className='bg-slate-800 p-4 rounded-lg hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 transform hover:-translate-y-1'>
                <h4 className='font-bold mb-2'>Chi nhánh Đà Nẵng</h4>
                <p className='text-sm text-slate-300 mb-2'>
                  Tầng 9, tòa nhà Vĩnh Trung Plaza, số 255 – 257 Hùng Vương, phường Vĩnh Trung, quận Thanh Khê, TP Đà
                  Nẵng
                </p>
                <p className='text-sm flex items-center gap-2'>
                  <Phone size={16} className='text-red-500' /> Hotline: 1900 1881
                </p>
              </div>

              <div className='bg-slate-800 p-4 rounded-lg hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 transform hover:-translate-y-1'>
                <h4 className='font-bold mb-2'>Chi nhánh Vũng Tàu</h4>
                <p className='text-sm text-slate-300 mb-2'>
                  Tầng 4, tòa nhà ACB, số 12 Hoàng Hoa Thám, phường 2, TP Vũng Tàu, tỉnh Bà Rịa - Vũng Tàu
                </p>
                <p className='text-sm flex items-center gap-2'>
                  <Phone size={16} className='text-red-500' /> Hotline: 1900 1881
                </p>
              </div>

              <div className='bg-slate-800 p-4 rounded-lg hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 transform hover:-translate-y-1'>
                <h4 className='font-bold mb-2'>Chi nhánh Nha Trang</h4>
                <p className='text-sm text-slate-300 mb-2'>
                  Tầng 6, Tòa nhà CTCP Điện Lực Khánh Hòa, 11 Lý Thánh Tôn, Phường Vạn Thạnh, TP Nha Trang, Khánh Hòa
                </p>
                <p className='text-sm flex items-center gap-2'>
                  <Phone size={16} className='text-red-500' /> Hotline: 1900 1881
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Copyright section */}
        <div className='border-t border-slate-700 mt-6 pt-6 text-sm text-slate-400'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            <div>
              <p>Copyright © 2007 - {new Date().getFullYear()} Batdongsan.com.vn</p>
              <p className='mt-2'>Giấy ĐKKD số 0104630479 do Sở KHĐT TP Hà Nội cấp lần đầu ngày 02/06/2010</p>
              <p className='mt-1'>
                Giấy phép thiết lập trang thông tin điện tử tổng hợp trên mạng số 191/GP-TTĐT do Sở TTTT Hà Nội cấp ngày
                31/08/2023
              </p>
            </div>

            <div>
              <p>Chịu trách nhiệm nội dung GP ICP Bà Đặng Thị Hường</p>
              <p className='mt-1'>Chịu trách nhiệm sản GĐTMĐT: Ông Bạch Dương</p>
              <p className='mt-1'>Quy chế, quy định giao dịch có hiệu lực từ 08/08/2023</p>
              <p className='mt-1'>Ghi rõ nguồn "Batdongsan.com.vn" khi phát hành lại thông tin từ website này.</p>
            </div>
          </div>

          <div className='flex justify-between items-center mt-6'>
            <div className='flex gap-4'>
              <Link to={'/'} className='hover:text-white transition-colors duration-300'>
                <Facebook size={20} />
              </Link>
              <Link to={'/'} className='hover:text-white transition-colors duration-300'>
                <Youtube size={20} />
              </Link>
              <Link to={'/'} className='hover:text-white transition-colors duration-300'>
                <Instagram size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={scrollToTop}
        className='fixed bottom-6 right-16 bg-red-500 p-3 rounded-full shadow-lg hover:bg-red-600 transition-all duration-300 transform hover:-translate-y-1 z-50 group'
      >
        <ArrowUp size={24} className='text-white group-hover:animate-bounce' />
      </button>
    </footer>
  );
}
