import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import useScrollToTopOnMount from '@/hooks/use-scroll-top';

export default function ErrorPage() {
  useScrollToTopOnMount();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#fff] text-white text-center px-4">
      <img
        src="https://consultation.co.jp/img/404-page-animation-example.gif"
        alt="404 GIF"
        className="w-[800px] "
      />
      <h1 className="text-3xl font-bold mt-4">Oops! Trang không tồn tại</h1>
      <p className="text-lg text-gray-400 mt-2">
        Trang bạn đang tìm kiếm không khả dụng hoặc đã bị xóa.
      </p>
      <Button  className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2">
        <Link to={'/'} className='flex'><ArrowLeft className="w-4 h-4 mr-2" />
        Quay lại</Link>
      </Button>
    </div>
  );
}
