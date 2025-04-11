import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import SearchBar from './components/search-bar';
import FilterOptions from './components/filter-options';
import FilterSidebar from './components/filter-sidebar';
import Map from '@/page/user/sellDetails/components/Map';
import { allCities, cityInfos, featuredCities, realEstateListings } from '@/constant/const-sell-detail';
import PropertyListings from './components/property-listing';
import PropertyListingsSearch from './components/property-listing-search';
import { vietnameseProvinces } from '@/constant/const-sell-detail';
import PropertyListingsFill from './components/proprtty-listing-fill';

function SellDetail() {
  const [searchParams] = useSearchParams();
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

  // Đọc query string khi component mount
  useEffect(() => {
    const city = searchParams.get('city');
    const keyword = searchParams.get('keyword');
    const minPriceParam = searchParams.get('minPrice');
    const maxPriceParam = searchParams.get('maxPrice');
    const minSquareMeters = searchParams.get('minSquareMeters');
    const maxSquareMeters = searchParams.get('maxSquareMeters');
    const propertyTypeIds = searchParams.get('propertyTypeIds')?.split(',') || [];

    if (city || keyword || minPriceParam || maxPriceParam || minSquareMeters || maxSquareMeters || propertyTypeIds.length > 0) {
      setSelectedCity(city || '');
      setSelectedProvinces(city ? [city] : keyword ? [keyword] : []);
      setMinPrice(minPriceParam || '');
      setMaxPrice(maxPriceParam || '');
      setMinArea(minSquareMeters || '');
      setMaxArea(maxSquareMeters || '');

      setPriceRange([
        minPriceParam ? Number(minPriceParam) / 1000 : 0,
        maxPriceParam ? Number(maxPriceParam) / 1000 : 20,
      ]);
      setAreaRange([
        minSquareMeters ? Number(minSquareMeters) : 0,
        maxSquareMeters ? Number(maxSquareMeters) : 500,
      ]);
      setIsSearchingFill(true);
      setIsSearching(false);
    }
  }, [searchParams]);

  const getSumByCity = () => {
    let sum = 0;
    cityInfos.forEach((cityInfo) => {
      sum += cityInfo.count;
    });
    return sum;
  };

  const handleSearch = (provinces: string[]) => {
    setSelectedProvinces(provinces);
    setIsSearching(true);
    setIsSearchingFill(false);
  };

  const handleFilterSearch = (filters: any) => {
    setBedrooms(filters.bedrooms);
    setBathrooms(filters.bathrooms);
    setFloors(filters.floors);
    setDirection(filters.direction);
    setPriceRange([filters.minPrice / 1000, filters.maxPrice / 1000]);
    setAreaRange([filters.minArea, filters.maxArea]);
    setSelectedProvinces(filters.keyword || []);

    setIsSearchingFill(true);
    setIsSearching(false);

    // Cập nhật URL với các tham số mới
    const params = new URLSearchParams();
    if (filters.keyword?.length > 0) params.append('keyword', filters.keyword.join(','));
    if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    if (filters.minArea) params.append('minSquareMeters', filters.minArea.toString());
    if (filters.maxArea) params.append('maxSquareMeters', filters.maxArea.toString());
    if (filters.bedrooms) params.append('bedrooms', filters.bedrooms.toString());
    if (filters.bathrooms) params.append('bathrooms', filters.bathrooms.toString());
    if (filters.floors) params.append('floors', filters.floors.toString());
    if (filters.direction) params.append('directions', filters.direction);

    window.history.replaceState(null, '', `/filter?${params.toString()}`);
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
                  onFilterSearch={handleFilterSearch}
                />
              </div>
            </div>
          </div>
          {/* <div
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
          </div> */}
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