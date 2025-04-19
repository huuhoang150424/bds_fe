import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import SearchBar from './components/search-bar';
import Map from '@/page/user/filterPost/components/Map';
import PropertyListings from './components/property-listing';
import { useGetPostByFilter } from './hooks/use-fill-post';
import useScrollToTopOnMount from '@/hooks/use-scroll-top';

function SellDetail() {
  useScrollToTopOnMount();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchParams] = useSearchParams();
  const [selectedProvinces, setSelectedProvinces] = useState<string[]>([]);
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
  const [propertyTypeIds, setPropertyTypeIds] = useState<string[]>([]);
  const [listingTypeIds, setListingTypeIds] = useState<string[]>([]);
  const [status, setStatus] = useState<string[]>([]);
  const [isProfessional, setIsProfessional] = useState(false);
  const [ratings, setRatings] = useState<number[]>([]);
  const [isFurnished, setIsFurnished] = useState<boolean | null>(null);
  const [tags, setTags] = useState<string[]>([]);

  const filterParams = {
    keyword: selectedProvinces.length > 0 ? selectedProvinces : undefined,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    minSquareMeters: minArea ? Number(minArea) : undefined,
    maxSquareMeters: maxArea ? Number(maxArea) : undefined,
    bedrooms: bedrooms > 0 ? bedrooms : undefined,
    bathrooms: bathrooms > 0 ? bathrooms : undefined,
    floor: floors > 0 ? floors : undefined,
    directions: direction || undefined,
    propertyTypeIds: propertyTypeIds.length > 0 ? propertyTypeIds : undefined,
    listingTypeIds: listingTypeIds.length > 0 ? listingTypeIds : undefined,
    status: status.length > 0 ? status : undefined,
    isProfessional: isProfessional || undefined,
    ratings: ratings.length > 0 ? ratings : undefined,
    isFurniture: isFurnished !== null ? isFurnished : undefined,
    tags: tags.length > 0 ? tags : undefined,
    page: page,
    limit: limit
  };

  const { data: posts, isLoading, error } = useGetPostByFilter(filterParams);


  const resetAllFilters = () => {
    setSelectedProvinces([]);
    setMinPrice('');
    setMaxPrice('');
    setPriceRange([0, 20]);
    setMinArea('');
    setMaxArea('');
    setAreaRange([0, 500]);
    setBedrooms(0);
    setBathrooms(0);
    setFloors(0);
    setDirection('');
    setPropertyTypeIds([]);
    setListingTypeIds([]);
    setStatus([]);
    setIsProfessional(false);
    setRatings([]);
    setIsFurnished(null);
    setTags([]);
  };

  useEffect(() => {
    resetAllFilters();

    const keyword = searchParams.get('keyword');
    const minPriceParam = searchParams.get('minPrice');
    const maxPriceParam = searchParams.get('maxPrice');
    const minSquareMeters = searchParams.get('minSquareMeters');
    const maxSquareMeters = searchParams.get('maxSquareMeters');
    const propertyTypeIdsParam = searchParams.get('propertyTypeIds');
    const bedroomsParam = searchParams.get('bedrooms');
    const bathroomsParam = searchParams.get('bathrooms');
    const floorParam = searchParams.get('floor');
    const directionParam = searchParams.get('directions');
    const listingTypeIdsParam = searchParams.get('listingTypeIds');
    const statusParam = searchParams.getAll('status');
    const isProfessionalParam = searchParams.get('isProfessional');
    const ratingsParam = searchParams.getAll('ratings');
    const tagsParam = searchParams.getAll('tags');
    const isFurnitureParam = searchParams.get('isFurniture');

    if (keyword) {
      setSelectedProvinces([keyword]);
    }
    
    if (minPriceParam) {
      setMinPrice(minPriceParam);
    }
    
    if (maxPriceParam) {
      setMaxPrice(maxPriceParam);
    }
    
    if (minPriceParam || maxPriceParam) {
      setPriceRange([
        minPriceParam ? Number(minPriceParam) / 1000000 : 0,
        maxPriceParam ? Number(maxPriceParam) / 1000000 : 20,
      ]);
    }
    
    if (minSquareMeters) {
      setMinArea(minSquareMeters);
    }
    
    if (maxSquareMeters) {
      setMaxArea(maxSquareMeters);
    }
    
    if (minSquareMeters || maxSquareMeters) {
      setAreaRange([
        minSquareMeters ? Number(minSquareMeters) : 0, 
        maxSquareMeters ? Number(maxSquareMeters) : 500
      ]);
    }
    
    if (bedroomsParam) {
      setBedrooms(Number(bedroomsParam));
    }
    
    if (bathroomsParam) {
      setBathrooms(Number(bathroomsParam));
    }
    
    if (floorParam) {
      setFloors(Number(floorParam));
    }
    
    if (directionParam) {
      setDirection(directionParam);
    }
    
    if (propertyTypeIdsParam) {
      setPropertyTypeIds(propertyTypeIdsParam.split(','));
    }
    
    if (listingTypeIdsParam) {
      setListingTypeIds(listingTypeIdsParam.split(','));
    }
    
    if (statusParam.length > 0) {
      setStatus(statusParam);
    }
    
    if (isProfessionalParam) {
      setIsProfessional(isProfessionalParam === 'true');
    }
    
    if (ratingsParam.length > 0) {
      setRatings(ratingsParam.map(Number).filter((n) => !isNaN(n)));
    }
    
    if (tagsParam.length > 0) {
      setTags(tagsParam);
    }
    
    if (isFurnitureParam) {
      setIsFurnished(isFurnitureParam === 'true');
    }

    setIsSearchingFill(true);
    setIsSearching(false);
  }, [searchParams]);


  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSearch = (provinces: string[]) => {
    setSelectedProvinces(provinces);
    setIsSearching(true);
    setIsSearchingFill(false);
  };
  return (
    <div className=''>
      <div className={cn('flex w-full', showMap ? 'h-[calc(100vh-80px)]' : '')}>
        <div className={cn('flex flex-col transition-all duration-300', showMap ? 'w-1/2' : 'w-full')}>
          <div className={`${showMap ? 'pl-4' : 'max-w-7xl mx-auto bg-white rounded-lg'} w-full pt-10 pb-2 py-6 `}>
            <SearchBar
              showMap={showMap}
              setShowMap={setShowMap}
              //onSearch={handleSearch} 
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
              data={posts}
              isLoading={isLoading}
              onPageChange={handlePageChange}
              currentPage={page}
            />
          </div>
        </div>
        {showMap && (
          <div className='w-full md:w-1/2 bg-white h-[calc(100vh-80px)] px-4 py-6'>
            <Map />
          </div>
        )}
      </div>
    </div>
  );
}

export default SellDetail;