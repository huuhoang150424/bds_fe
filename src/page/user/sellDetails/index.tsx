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
  const [selectedProvinces, setSelectedProvinces] = useState<string[]>([]);
  const vietnameseProvinces = [

    'Hà Nội',
    'Hồ Chí Minh',
    'Đà Nẵng',
    'Hải Phòng',
    'Cần Thơ',
    'An Giang',
    'Bà Rịa - Vũng Tàu',
    'Bắc Giang',
    'Bắc Kạn',
    'Bạc Liêu',
    'Bắc Ninh',
    'Bến Tre',
    'Bình Định',
    'Bình Dương',
    'Bình Phước',
    'Bình Thuận',
    'Cà Mau',
    'Cao Bằng',
    'Đắk Lắk',
    'Đắk Nông',
    'Điện Biên',
    'Đồng Nai',
    'Đồng Tháp',
    'Gia Lai',
    'Hà Giang',
    'Hà Nam',
    'Hà Tĩnh',
    'Hải Dương',
    'Hậu Giang',
    'Hòa Bình',
    'Hưng Yên',
    'Khánh Hòa',
    'Kiên Giang',
    'Kon Tum',
    'Lai Châu',
    'Lâm Đồng',
    'Lạng Sơn',
    'Lào Cai',
    'Long An',
    'Nam Định',
    'Nghệ An',
    'Ninh Bình',
    'Ninh Thuận',
    'Phú Thọ',
    'Phú Yên',
    'Quảng Bình',
    'Quảng Nam',
    'Quảng Ngãi',
    'Quảng Ninh',
    'Quảng Trị',
    'Sóc Trăng',
    'Sơn La',
    'Tây Ninh',
    'Thái Bình',
    'Thái Nguyên',
    'Thanh Hóa',
    'Thừa Thiên Huế',
    'Tiền Giang',
    'Trà Vinh',
    'Tuyên Quang',
    'Vĩnh Long',
    'Vĩnh Phúc',
    'Yên Bái',
  ];
  const handlePriceOptionChange = (value: string) => {
    setSelectedPriceOption(value);
    switch (value) {
      case '0-500':
        setMinPrice('');
        setMaxPrice('500');
        break;
      case '500-800':
        setMinPrice('500');
        setMaxPrice('800');
        break;
      case '800-1000':
        setMinPrice('800');
        setMaxPrice('1000');
        break;
      case '1000-2000':
        setMinPrice('1000');
        setMaxPrice('2000');
        break;
      default:
        setMinPrice('');
        setMaxPrice('');
    }
  };

  const handleAreaOptionChange = (value: string) => {
    setSelectedAreaOption(value);
    switch (value) {
      case '0-30':
        setMinArea('');
        setMaxArea('30');
        break;
      case '30-50':
        setMinArea('30');
        setMaxArea('50');
        break;
      case '50-80':
        setMinArea('50');
        setMaxArea('80');
        break;
      case '80-100':
        setMinArea('80');
        setMaxArea('100');
        break;
      default:
        setMinArea('');
        setMaxArea('');
    }
  };

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
                  showAreaFilter={showAreaFilter}
                  setShowAreaFilter={setShowAreaFilter}
                  minArea={minArea}
                  setMinArea={setMinArea}
                  maxArea={maxArea}
                  setMaxArea={setMaxArea}
                  selectedAreaOption={selectedAreaOption}
                  handleAreaOptionChange={handleAreaOptionChange}
                  showPriceFilter={showPriceFilter}
                  setShowPriceFilter={setShowPriceFilter}
                  minPrice={minPrice}
                  setMinPrice={setMinPrice}
                  maxPrice={maxPrice}
                  setMaxPrice={setMaxPrice}
                  selectedPriceOption={selectedPriceOption}
                  handlePriceOptionChange={handlePriceOptionChange}
                />
                {/* <SearchInterface /> */}
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
