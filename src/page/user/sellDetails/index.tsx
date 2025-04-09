// @ts-nocheck

import { useState } from 'react';
import { cn } from '@/lib/utils';
import SearchBar from './components/search-bar';
import FilterOptions from './components/filter-options';

import FilterSidebar from './components/filter-sidebar';
import Map from '@/page/user/sellDetails/components/Map';
import { allCities, cityInfos, featuredCities, realEstateListings } from '@/constant/const-sell-detail';
import PropertyListings from './components/property-listing';
import SearchInterface from './components/search-interface';
import PropertyListingsSearch from './components/property-listing-search';
import PropertyListingsFill from './components/proprtty-listing-fill';
import { vietnameseProvinces } from '@/constant/const-sell-detail';

function SellDetail() {
  const [selectedCity, setSelectedCity] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [searchCity, setSearchCity] = useState('');
  const [showAllCities, setShowAllCities] = useState(false);
  const [minArea, setMinArea] = useState('');
  const [maxArea, setMaxArea] = useState('');
  const [showAreaFilter, setShowAreaFilter] = useState(false);
  const [selectedAreaOption, setSelectedAreaOption] = useState<string>('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedPriceOption, setSelectedPriceOption] = useState<string>('all');
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchingFill, setIsSearchingFill] = useState(false);
  const [selectedProvinces, setSelectedProvinces] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20]);
  const [areaRange, setAreaRange] = useState<[number, number]>([0, 500]);
  const [bedrooms, setBedrooms] = useState<number>(0);
  const [bathrooms, setBathrooms] = useState<number>(0);
  const [floors, setFloors] = useState<number>(0);
  const [direction, setDirection] = useState<string>('');
  
  

  const getSumByCity = () => {
    let sum = 0;
    cityInfos.forEach((cityInfo) => {
      sum += cityInfo.count;
    });
    return sum;
  };
  
  const handleSearch = (provinces: string[]) => {
    setSelectedProvinces(provinces); // Cập nhật danh sách tỉnh/thành phố
    setIsSearching(true); // Chuyển sang chế độ tìm kiếm
    setIsSearchingFill(false); // Đảm bảo không hiển thị kết quả lọc
  };
  
  // Thêm hàm mới để xử lý việc tìm kiếm bằng bộ lọc
  const handleFilterSearch = (filters: any) => {
    // Cập nhật state từ filters
    setBedrooms(filters.bedrooms);
    setBathrooms(filters.bathrooms);
    setFloors(filters.floors);
    setDirection(filters.direction);
    setPriceRange([filters.minPrice / 1000000000, filters.maxPrice / 1000000000]); // Chuyển ngược lại tỷ VNĐ
    setAreaRange([filters.minArea, filters.maxArea]);
    setSelectedProvinces(filters.keyword); // Gán selectedProvinces từ keyword

    setIsSearchingFill(true);
    setIsSearching(false);
  };
  
  const filteredCities = allCities.filter((city) => city.toLowerCase().includes(searchCity.toLowerCase()));

  return (
    <div className='pt-[80px]'>
      <div className={cn('flex w-full', showMap ? 'h-[calc(100vh-80px)]' : '')}>
        <div className={cn('flex flex-col transition-all duration-300', showMap ? 'w-1/2' : 'w-full')}>
          <div className={cn('', showMap ? 'w-full' : 'max-w-7xl mx-auto w-full')}>
            <div className='search bg-white rounded-lg w-full'>
              <div className='px-4 py-6'>
                <SearchBar
                  allProvinces={vietnameseProvinces}
                  showMap={showMap}
                  setShowMap={setShowMap}
                  onSearch={handleSearch}
                />

                <FilterOptions
                  bedrooms={bedrooms}
                  setBedrooms={setBedrooms}
                  bathrooms={bathrooms}
                  setBathrooms={setBathrooms}
                  floors={floors}
                  setFloors={setFloors}
                  direction={direction}
                  setDirection={setDirection}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  areaRange={areaRange}
                  setAreaRange={setAreaRange}
                  selectedProvinces={selectedProvinces}
                  setSelectedProvinces={setSelectedProvinces}
                  onFilterSearch={handleFilterSearch} // Truyền hàm xử lý tìm kiếm
                />
              </div>
            </div>
          </div>

          <div
            className={cn(
              'flex flex-col lg:flex-row flex-1 overflow-hidden',
              showMap ? 'w-full' : 'max-w-7xl mx-auto w-full',
            )}
          >
            {isSearching ? (
              <PropertyListingsSearch selectedProvinces={selectedProvinces} />
            ) : isSearchingFill ? (
              <PropertyListingsFill 
                keyword={selectedProvinces}
                selectedProvinces={selectedProvinces}
                bedrooms={bedrooms}
                bathrooms={bathrooms}
                floors={floors}
                direction={direction}
                priceRange={priceRange}
                areaRange={areaRange}
              />
            ) : (
              <PropertyListings realEstateListings={realEstateListings} totalListings={getSumByCity()} />
            )}

            <FilterSidebar
              searchCity={searchCity}
              setSearchCity={setSearchCity}
              showAllCities={showAllCities}
              setShowAllCities={setShowAllCities}
              filteredCities={filteredCities}
              allCities={allCities}
            />
          </div>
        </div>

        {showMap && (
          <div className='w-full md:w-1/2 bg-white h-[calc(100vh-80px)]'>
            <Map />
          </div>
        )}
      </div>
    </div>
  );
}

export default SellDetail;