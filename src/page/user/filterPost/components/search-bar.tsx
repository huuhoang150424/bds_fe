import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronDown, Search, X, Map, Trash2 } from 'lucide-react';
import { useAddress } from '@/page/agent/post/hooks/use-get-address';

interface SearchBarProps {
  showMap: boolean;
  setShowMap: (show: boolean) => void;

  onSearch: (address:string[])=>void;
}

export default function SearchBar({ showMap, setShowMap, onSearch }: SearchBarProps) {
  const { provinceQuery } = useAddress();
  const { data: provinceData, isLoading } = provinceQuery;

  const [selectedProvinces, setSelectedProvinces] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const MAX_SELECTIONS = 5;
  const canSelectMore = selectedProvinces.length < MAX_SELECTIONS;
  const hasSelectedProvinces = selectedProvinces.length > 0;

  const handleProvinceSelect = (province: string) => {
    if (canSelectMore) {
      const updatedProvinces = [...selectedProvinces, province];
      setSelectedProvinces(updatedProvinces);
      setSearchInput('');
    }
  };

  const handleRemoveProvince = (province: string) => {
    const updatedProvinces = selectedProvinces.filter((p) => p !== province);
    setSelectedProvinces(updatedProvinces);
  };

  const handleClearAll = () => {
    setSelectedProvinces([]);
    setSearchInput('');
  };

  const handleBlur = () => {
    setTimeout(() => setIsDropdownOpen(false), 200);
  };

  const handleSearch = () =>onSearch(selectedProvinces);

  
  return (
    <div className='flex flex-col md:flex-row md:items-center gap-4'>
      <div className='relative w-full'>
        <div className='flex items-center border rounded-lg p-2 bg-white'>
          <Search className='h-5 w-5 text-gray-400 mr-2' />

          <div className='flex flex-wrap gap-2 flex-1'>
            {selectedProvinces.map((province) => (
              <div key={province} className='flex items-center bg-gray-100 rounded-md px-2 py-1'>
                <span className='text-sm'>{province}</span>
                <button
                  onClick={() => handleRemoveProvince(province)}
                  className='ml-1 text-gray-500 hover:text-gray-700'
                >
                  <X className='h-3 w-3' />
                </button>
              </div>
            ))}

            <div className='relative flex-1 min-w-[120px]'>
              <input
                type='text'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onFocus={() => setIsDropdownOpen(true)}
                onBlur={handleBlur}
                placeholder={
                  !canSelectMore
                    ? 'Đã chọn tối đa 5 địa điểm'
                    : selectedProvinces.length === 0
                      ? 'Tìm kiếm tỉnh thành...'
                      : ''
                }
                disabled={!canSelectMore}
                className='w-full border-none outline-none text-sm'
              />
            </div>
          </div>

          {hasSelectedProvinces && (
            <Button
              variant='ghost'
              size='sm'
              className='mr-1 text-gray-500 hover:text-red-500 p-0'
              onClick={handleClearAll}
              title='Xóa tất cả'
            >
              <Trash2 className='h-4 w-4' />
            </Button>
          )}

          <Button
            className='mr-2 px-1'
            variant='ghost'
            size='sm'
            onClick={() => canSelectMore && setIsDropdownOpen(!isDropdownOpen)}
            disabled={!canSelectMore}
          >
            <ChevronDown className='h-4 w-4' />
          </Button>
          <Button className='bg-red-500 hover:bg-red-600 text-white' onClick={handleSearch}>
            Tìm kiếm
          </Button>
        </div>

        {isDropdownOpen && canSelectMore && (
          <div className='absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto'>
            {provinceData?.data?.map((province: any) => (
              <div
                key={province?.id}
                className='px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm'
                onClick={() => {
                  handleProvinceSelect(province?.name);
                  setIsDropdownOpen(false);
                }}
              >
                {province?.name}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='md:w-[15%] h-[52px]'>
        <Button
          className={cn(
            'w-full h-full flex items-center justify-center gap-2 rounded-lg font-medium transition-all',
            showMap ? 'bg-gray-200 hover:bg-gray-300 text-gray-700' : 'bg-[#009BA1] hover:bg-[#1DBABF] text-white',
          )}
          onClick={() => setShowMap(!showMap)}
        >
          <Map />
          <span className='hidden sm:inline'>{showMap ? 'Ẩn bản đồ' : 'Lọc bản đồ'}</span>
        </Button>
      </div>
    </div>
  );
}
