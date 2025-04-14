import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import SearchBar from './components/search-bar';
import FilterSidebar from './components/filter-sidebar';
import Map from '@/page/user/filterPost/components/Map';
import {  cityInfos, realEstateListings } from '@/constant/const-sell-detail';
import PropertyListings from './components/property-listing';

function SellDetail() {
  const [searchParams] = useSearchParams();
  const [selectedProvinces, setSelectedProvinces] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [showAllCities, setShowAllCities] = useState(false);

  const [showMap, setShowMap] = useState(false);

  const [isSearching, setIsSearching] = useState(false);
  const [isSearchingFill, setIsSearchingFill] = useState(false);

  const [minArea, setMinArea] = useState('');
  const [maxArea, setMaxArea] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20]);
  const [areaRange, setAreaRange] = useState<[number, number]>([0, 500]);
  const [bedrooms, setBedrooms] = useState<number>(0);
  const [bathrooms, setBathrooms] = useState<number>(0);
  const [floors, setFloors] = useState<number>(0);
  const [direction, setDirection] = useState<string>('');

  useEffect(() => {
    const city = searchParams.get('city');
    const keyword = searchParams.get('keyword');
    const minPriceParam = searchParams.get('minPrice');
    const maxPriceParam = searchParams.get('maxPrice');
    const minSquareMeters = searchParams.get('minSquareMeters');
    const maxSquareMeters = searchParams.get('maxSquareMeters');
    const propertyTypeIds = searchParams.get('propertyTypeIds')?.split(',') || [];

    if (
      city ||
      keyword ||
      minPriceParam ||
      maxPriceParam ||
      minSquareMeters ||
      maxSquareMeters ||
      propertyTypeIds.length > 0
    ) {
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
      setAreaRange([minSquareMeters ? Number(minSquareMeters) : 0, maxSquareMeters ? Number(maxSquareMeters) : 500]);
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
    setPriceRange([filters.minPrice / 1000000000, filters.maxPrice / 1000000000]);
    setAreaRange([filters.minArea, filters.maxArea]);
    setSelectedProvinces(filters.keyword || []);

    setIsSearchingFill(true);
    setIsSearching(false);

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

  return (
    <div className=''>
      <div className={cn('flex w-full', showMap ? 'h-[calc(100vh-80px)]' : '')}>
        <div className={cn('flex flex-col transition-all duration-300', showMap ? 'w-1/2' : 'w-full')}>
          <div className={`${showMap ? 'pl-4' : 'max-w-7xl mx-auto bg-white rounded-lg'} w-full pt-10 pb-2 py-6 `}>
            <SearchBar
              showMap={showMap}
              setShowMap={setShowMap}
              onSearch={handleSearch}
              onFilterSearch={handleFilterSearch}
            />
          </div>
          <div
            className={cn(
              'flex flex-col lg:flex-row flex-1 overflow-hidden',
              showMap ? 'w-full' : 'max-w-7xl mx-auto w-full',
            )}
          >
            <PropertyListings
              showMap={showMap}
            />
          </div>
        </div>
        {showMap && (
          <div className='w-full md:w-1/2 bg-white h-[calc(100vh-80px)]  px-4 py-6'>
            <Map />
          </div>
        )}
      </div>
    </div>
  );
}

export default SellDetail;
