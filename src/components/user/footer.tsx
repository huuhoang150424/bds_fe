const Footer = () => {
  return (
    <footer className='bg-gray-100 p-10 mt-8'>
      <div className='container mx-auto grid grid-cols-12 gap-6 text-gray-800'>
        <div className='col-span-4'>
          <div className='flex items-center space-x-2'>
            <img src='/logo.png' alt='Logo' className='w-10 h-10' />
            <span className='text-xl font-bold text-orange-500'>Batdongsan©Online.vn</span>
          </div>
          <p className='font-bold mt-2'>CÔNG TY CỔ PHẦN BẤT ĐỘNG SẢN SAIGON LAND</p>
          <p className='text-sm mt-1'>
            Giấy phép đăng ký kinh doanh số 0315459774 do Sở Kế hoạch đầu tư TP Hồ Chí Minh cấp 04/01/2019.
          </p>
          <p className='text-sm mt-1'>📍 Số M2 Đường 38, Phường 6, Quận 4, TP Hồ Chí Minh.</p>
          <p className='text-sm mt-1'>📞 0911798899 - 0377556806</p>
        </div>
        <div className='col-span-2'>
          <h3 className='font-bold'>VỀ CHÚNG TÔI</h3>
          <ul className='text-sm mt-2 space-y-1'>
            <li>
              <a href='#'>Giới thiệu</a>
            </li>
            <li>
              <a href='#'>Liên hệ</a>
            </li>
            <li>
              <a href='#'>Chi phí đăng tin</a>
            </li>
            <li>
              <a href='#'>Hướng dẫn nạp tiền</a>
            </li>
          </ul>
        </div>
        <div className='col-span-2'>
          <h3 className='font-bold'>QUY ĐỊNH</h3>
          <ul className='text-sm mt-2 space-y-1'>
            <li>
              <a href='#'>Quy chế hoạt động</a>
            </li>
            <li>
              <a href='#'>Chính sách bảo mật</a>
            </li>
            <li>
              <a href='#'>Điều khoản sử dụng</a>
            </li>
            <li>
              <a href='#'>Giải quyết khiếu nại</a>
            </li>
          </ul>
        </div>
        <div className='col-span-4'>
          <h3 className='font-bold'>THÔNG TIN</h3>
          <p className='text-sm mt-2'>
            Chịu trách nhiệm & đại diện pháp luật: Dương Ngọc Báu. Vui lòng ghi rõ nguồn batdongsanonline.vn khi sử dụng
            dữ liệu của chúng tôi.
          </p>
          <p className='text-sm mt-2'>Doanh nghiệp có nhu cầu đăng tin số lượng lớn, vui lòng liên hệ Hotline.</p>
          <div className='flex space-x-2 mt-2'>
            <img src='/protected.png' alt='Protected' className='h-6' />
            <img src='/registered.png' alt='Registered' className='h-6' />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
