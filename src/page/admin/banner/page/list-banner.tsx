import useScrollToTopOnMount from '@/hooks/use-scroll-top';
import { BannerTable } from "../components/banner-table";

export default function ListBanner() {
  useScrollToTopOnMount();



  return (
    <div className="">
      <div className="mb-2">
        <h1 className="text-xl font-[500] text-gray-700  tracking-tight">Danh sách banner</h1>
        <p className="text-muted-foreground text-[14px]">Tạo, sắp xếp và quản lý banner trang web</p>
      </div>
      <BannerTable />
    </div>
  );
}
