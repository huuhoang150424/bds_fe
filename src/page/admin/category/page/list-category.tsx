
import useScrollToTopOnMount from '@/hooks/use-scroll-top';
import { ListingTypeTable } from '../components/listing-type-table';

export default function ListCategory() {
  useScrollToTopOnMount();


  return (
    <div className="">
      <h1 className="text-[18px] text-gray-700 font-[600]">Danh sách danh mục của hệ thống</h1>
      <ListingTypeTable />
    </div>
  );
}
