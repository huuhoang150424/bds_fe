import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import SearchBar from './components/search-bar';
import PropertyListings from './components/property-listing';
import { useGetPostByFilter } from './hooks/use-fill-post';
import useScrollToTopOnMount from '@/hooks/use-scroll-top';
import { useSearchPost } from './hooks/use-seach-post';
import { Button } from '@/components/ui/button';
import Map from './components/Map';
import { useGetPostsByMapBounds } from './hooks/use-get-posts-map';

function SellDetail() {
  useScrollToTopOnMount();
  const [page, setPage] = useState(1);
  const limit = 10;
  const [searchParams] = useSearchParams();
  const [selectedProvinces, setSelectedProvinces] = useState<string[]>([]);
  const [isUsingSearch, setIsUsingSearch] = useState(false);
  const [searchAddress, setSearchAddress] = useState<string[]>([]);
  const [showMap, setShowMap] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [minArea, setMinArea] = useState('');
  const [maxArea, setMaxArea] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
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
  const [currentLocation, setCurrentLocation] = useState<string>('');
  const [isLocation, setIsLocation] = useState(false);

  const extractAddress = (locationString: string): string => {
    try {
      const addressPart = locationString.split('(')[0];
      return addressPart.trim();
    } catch (error) {
      console.error('Error extracting address:', error);
      return locationString;
    }
  };

  const { data: searchResults, isLoading: isSearchLoading } = useSearchPost(isUsingSearch ? searchAddress : []);

  const filterParams = {
    keyword: !isUsingSearch && selectedProvinces.length > 0 ? selectedProvinces : undefined,
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
    limit: limit,
  };

  const { data: posts, isLoading: isFilterLoading } = useGetPostByFilter(filterParams, { enabled: !isUsingSearch });

  const { data: mapPosts, isLoading: isMapLoading } = useGetPostsByMapBounds(
    page,
    limit,
    currentLocation,
    { enabled: showMap && !isUsingSearch } 
  );

  const resetAllFilters = () => {
    setSelectedProvinces([]);
    setMinPrice('');
    setMaxPrice('');
    setMinArea('');
    setMaxArea('');
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

    if (minSquareMeters) {
      setMinArea(minSquareMeters);
    }

    if (maxSquareMeters) {
      setMaxArea(maxSquareMeters);
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
    setIsSearching(false);
    setIsUsingSearch(false);
  }, [searchParams]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSearch = (provinces: string[]) => {
    setIsUsingSearch(true);
    setSearchAddress(provinces);
    setIsSearching(true);
    setPage(1);
  };

  const handleLocationChange = (location: string) => {
    setCurrentLocation(location);
    setIsLocation(true);
  };

  useEffect(() => {
    if (searchResults && isSearching) {
      setIsSearching(false);
    }
  }, [searchResults, isSearching]);

  let currentData;
  let isLoading;
  if (showMap && !isUsingSearch) {
    currentData = mapPosts;
    isLoading = isMapLoading;
  } else if (isUsingSearch) {
    currentData = searchResults; 
    isLoading = isSearchLoading;
  } else {
    currentData = posts; 
    isLoading = isFilterLoading;
  }
  return (
    <div className=''>
      <div className={cn('flex w-full', showMap ? 'h-[calc(100vh-80px)]' : '')}>
        <div className={cn('flex flex-col transition-all duration-300', showMap ? 'w-1/2' : 'w-full')}>
          <div className={`${showMap ? 'pl-4' : 'max-w-7xl mx-auto bg-white rounded-lg'} w-full pt-10 pb-2 py-6 `}>
            <SearchBar showMap={showMap} setShowMap={setShowMap} onSearch={handleSearch} />
            {isUsingSearch && (
              <div className='mt-2 flex items-center'>
                <span className='text-sm text-gray-500 mr-2'>Đang sử dụng tìm kiếm theo địa điểm</span>
                <Button
                  variant='ghost'
                  size='sm'
                  className='text-blue-500 hover:text-blue-700'
                  onClick={() => {
                    setIsUsingSearch(false);
                    setSearchAddress([]);
                  }}
                >
                  Quay lại bộ lọc
                </Button>
              </div>
            )}

            {/* Display current map location if available */}
            {showMap && currentLocation && (
              <div className='mt-2 flex items-center'>
                <span className='text-sm text-gray-600 mr-2'>Địa điểm trên bản đồ:</span>
                <span className='text-sm font-medium text-blue-600'>{extractAddress(currentLocation)}</span>

                <Button
                  variant='outline'
                  size='sm'
                  className='ml-2 h-7 text-xs'
                  onClick={() => {
                    const address = extractAddress(currentLocation);
                    handleSearch([address]);
                  }}
                >
                  Tìm theo địa điểm này
                </Button>
              </div>
            )}
          </div>
          <div
            className={cn(
              'flex flex-col lg:flex-row flex-1 overflow-hidden',
              showMap ? 'w-full overflow-y-auto' : 'max-w-7xl mx-auto w-full',
            )}
          >
            <PropertyListings
              showMap={showMap}
              data={currentData}
              isLoading={isLoading}
              onPageChange={handlePageChange}
              currentPage={page}
            />
          </div>
        </div>
        {/* {showMap && (
          <div className='w-1/2 h-full sticky top-0'>
            <div className='h-full p-[20px] '>
              <Map onLocationChange={handleLocationChange} />
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default SellDetail;