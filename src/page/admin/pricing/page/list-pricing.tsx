import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useScrollToTopOnMount from '@/hooks/use-scroll-top';
import PricingCard from '../components/pricing-card';
import { PricingLevel } from '../components/column';
import { useGetPricings } from '../hooks/use-get-pricings';
import { PricingTable } from '../components/pricing-table';

export default function ListPricing() {
  useScrollToTopOnMount();
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isLoading } = useGetPricings(page, limit);
  const handleChangePage = (page: number) => {
    setPage(page);
  };
  const handleDelete = (id: string) => {};

  return (
    <div className=''>
      <div className='flex items-center justify-between mb-4'>
        <div>
          <h1 className='text-xl font-[600] text-gray-700  tracking-tight'>Danh sách gói vip</h1>
          <p className='text-muted-foreground text-xs'>Quản lý gói vip</p>
        </div>
      </div>
      <Tabs defaultValue='tables' className='space-y-1'>
        <div className='flex items-center justify-between'>
          <TabsList className=' border border-gray-200 bg-transparent'>
            <TabsTrigger
              value='tables'
              className='text-[13px] px-6 data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:shadow-sm'
            >
              Bảng
            </TabsTrigger>
            <TabsTrigger
              value='card'
              className='text-[13px] px-6 data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:shadow-sm'
            >
              Card
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value='tables' className='space-y-5'>
          <PricingTable data={data} isLoading={isLoading} handleChangePage={handleChangePage} />
        </TabsContent>
        <TabsContent value='card' className='space-y-5 '>
          <div className='grid gap-5 grid-cols-4 mt-4'>
            {data?.data?.data?.map((pkg: any) => (
              <PricingCard
                key={pkg?.id}
                pricing={pkg}
                onDelete={() => handleDelete(pkg?.id)}
                featured={pkg?.name === PricingLevel.PREMIUM}
              />
            ))}
          </div>
          {data?.data?.data?.length === 0 && (
            <div className='text-center py-10 text-muted-foreground text-xs'>No pricing packages found.</div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
