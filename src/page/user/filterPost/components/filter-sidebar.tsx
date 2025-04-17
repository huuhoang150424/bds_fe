import { useEffect, useState } from 'react';
import { ChevronDown, Star } from 'lucide-react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

export default function FilterSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState([1000, 5000]);
  const [squareMeters, setSquareMeters] = useState([30, 200]);
  const [floor, setFloor] = useState<number[]>([]);
  const [bedrooms, setBedrooms] = useState<number[]>([]);
  const [bathrooms, setBathrooms] = useState<number[]>([]);
  const [isFurnished, setIsFurnished] = useState<boolean | null>(null);
  const [directions, setDirections] = useState<string[]>([]);
  const [status, setStatus] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isProfessional, setIsProfessional] = useState(false);
  const [reviewScores, setReviewScores] = useState<number[]>([]);
  const floorOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '10+'];
  const bedroomOptions = [1, 2, 3, 4, '5+'];
  const bathroomOptions = [1, 2, 3, '4+'];
  const directionOptions = ['Đông', 'Tây', 'Nam ', 'Bắc', 'Đông Bắc', 'Đông Nam', 'Tây Bắc', 'Tây Nam'];
  const statusOptions = ['Còn trống', 'Đã bàn giao', 'Đang đàm phán'];


  
  useEffect(() => {
    const paramKeys = [...searchParams.keys()];
    console.log("params", paramKeys);
    const hasOnlyPageAndLimit =
      paramKeys.length <= 2 && paramKeys.every((key) => key === 'page' || key === 'limit');
    const hasNoParams = paramKeys.length === 0;
    if (hasNoParams || hasOnlyPageAndLimit) {
      resetFilters();
    }
  }, [searchParams]);

  const toggleSelection = (value: any, currentSelections: any[], setSelections: (value: any) => void) => {
    if (currentSelections.includes(value)) {
      setSelections(currentSelections.filter((item) => item !== value));
    } else {
      setSelections([...currentSelections, value]);
    }
  };

  const toggleReviewScore = (score: number) => {
    if (reviewScores.includes(score)) {
      setReviewScores(reviewScores.filter((s:number) => s !== score));
    } else {
      setReviewScores([...reviewScores, score]);
    }
  };
  const resetFilters = () => {
    setPriceRange([1000, 5000]);
    setSquareMeters([30, 200]);
    setFloor([]);
    setBedrooms([]);
    setBathrooms([]);
    setIsFurnished(null);
    setDirections([]);
    setStatus([]);
    setSelectedTags([]);
    setIsProfessional(false);
    setReviewScores([]);
    const params = new URLSearchParams();
    params.append('page', '1');
    params.append('limit', '10');
    navigate(`${location.pathname}?${params.toString()}`);
    window.scrollTo(0, 0);
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (bedrooms.length > 0) {
      params.append('bedrooms', bedrooms[0].toString());
    }
    if (bathrooms.length > 0) {
      params.append('bathrooms', bathrooms[0].toString());
    }
    if (floor.length > 0) {
      params.append('floor', floor[0].toString());
    }

    if (directions.length > 0) {
      const directionValues = directions.map((dir) => {
        const match = dir.match(/\(([^)]+)\)/);
        return match ? match[1] : dir;
      });
      params.append('directions', directionValues[0]);
    }
    if (priceRange[0] !== 1000) {
      params.append('minPrice', (priceRange[0] * 1000).toString());
    }

    if (priceRange[1] !== 5000) {
      params.append('maxPrice', (priceRange[1] * 1000).toString());
    }
    if (squareMeters[0] !== 30) {
      params.append('minSquareMeters', squareMeters[0].toString());
    }

    if (squareMeters[1] !== 200) {
      params.append('maxSquareMeters', squareMeters[1].toString());
    }
    params.append('page', '1');
    params.append('limit', '10');
    if (selectedTags.length > 0) {
      selectedTags.forEach((tag) => {
        params.append('propertyTypeIds', tag);
      });
    }
    if (status.length > 0) {
      status.forEach((st) => {
        params.append('status', st);
      });
    }
    if (isProfessional) {
      params.append('isProfessional', 'true');
    }
    if (reviewScores.length > 0) {
      reviewScores.forEach((score) => {
        params.append('ratings', score.toString());
      });
    }
    if (isFurnished !== null) {
      params.append('isFurniture', isFurnished.toString());
    }
    navigate(`${location.pathname}?${params.toString()}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className='space-y-5 border border-gray-200 rounded-[8px] px-4 py-6'>
      <div className='space-y-2'>
        <h3 className='font-bold text-sm uppercase text-gray-600'>Khoảng giá</h3>
        <div className='relative pt-5 pb-8'>
          <div className='absolute -top-1 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full'>
            {priceRange[0]} k
          </div>
          <Slider
            defaultValue={priceRange}
            min={1000}
            max={5000}
            step={100}
            onValueChange={setPriceRange}
            className='my-4'
          />
          <div className='flex items-center justify-between text-sm text-gray-800 font-normal mt-2'>
            <span>{1000} k</span>
            <span>{5000} k</span>
          </div>
        </div>
      </div>

      <div className='space-y-2'>
        <h3 className='font-bold text-sm uppercase text-gray-600'>Chuyên nghiêp</h3>
        <div className='flex items-center justify-between'>
          <Label htmlFor='isProfessional '>Chỉ môi giới chuyên nghiệp</Label>
          <Switch id='isProfessional ' checked={isProfessional} onCheckedChange={setIsProfessional} />
        </div>
      </div>

      {/* Review Score */}
      <div className='space-y-2'>
        <h3 className='font-bold text-sm uppercase text-gray-600'>Đánh giá sao</h3>
        <div className='space-y-2'>
          <div className='flex items-center space-x-2'>
            <Checkbox id='review-5' checked={reviewScores.includes(5)} onCheckedChange={() => toggleReviewScore(5)} />
            <Label htmlFor='review-5' className='flex items-center gap-[2px] cursor-pointer text-gray-800 font-normal'>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className='text-yellow-400' size={16} />
              ))}
            </Label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox id='review-4' checked={reviewScores.includes(4)} onCheckedChange={() => toggleReviewScore(4)} />
            <Label htmlFor='review-4' className='flex items-center gap-[2px] cursor-pointer text-gray-800 font-normal'>
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className='text-yellow-400' size={16} />
              ))}
              <Star className='text-gray-300' size={16} />
            </Label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox id='review-3' checked={reviewScores.includes(3)} onCheckedChange={() => toggleReviewScore(3)} />
            <Label htmlFor='review-3' className='flex items-center gap-[2px] cursor-pointer text-gray-800 font-normal'>
              {[1, 2, 3].map((star) => (
                <Star key={star} className='text-yellow-400' size={16} />
              ))}
              {[1, 2].map((star) => (
                <Star key={star} className='text-gray-300' size={16} />
              ))}
            </Label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox id='review-2' checked={reviewScores.includes(2)} onCheckedChange={() => toggleReviewScore(2)} />
            <Label htmlFor='review-2' className='flex items-center gap-[2px] cursor-pointer text-gray-800 font-normal'>
              {[1, 2].map((star) => (
                <Star key={star} className='text-yellow-400' size={16} />
              ))}
              {[1, 2, 3].map((star) => (
                <Star key={star} className='text-gray-300' size={16} />
              ))}
            </Label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox id='review-1' checked={reviewScores.includes(1)} onCheckedChange={() => toggleReviewScore(1)} />
            <Label htmlFor='review-1' className='flex items-center gap-[2px] cursor-pointer text-gray-800 font-normal'>
              <Star className='text-yellow-400' size={16} />
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className='text-gray-300' size={16} />
              ))}
            </Label>
          </div>
        </div>
      </div>

      {/* Square Meters */}
      <div className='space-y-2'>
        <h3 className='font-bold text-sm uppercase text-gray-600'>Diện tích (m²)</h3>
        <div className='pt-2 pb-4'>
          <Slider
            defaultValue={squareMeters}
            min={30}
            max={200}
            step={5}
            onValueChange={setSquareMeters}
            className='my-4'
          />
          <div className='flex items-center justify-between text-sm text-gray-800 font-normal'>
            <span>{squareMeters[0]} m²</span>
            <span>{squareMeters[1]} m²</span>
          </div>
        </div>
      </div>

      {/* Floor */}
      <div className='space-y-2'>
        <h3 className='font-bold text-sm uppercase text-gray-600'>Tầng</h3>
        <div className='flex flex-wrap gap-2'>
          {floorOptions.map((option: any) => (
            <Button
              key={`floor-${option}`}
              variant={floor.includes(option) ? 'secondary' : 'outline'}
              size='sm'
              onClick={() => toggleSelection(option, floor, setFloor)}
              className='h-8 rounded-full text-gray-600 font-normal'
            >
              {option}
            </Button>
          ))}
        </div>
      </div>

      {/* Bedrooms */}
      <div className='space-y-2'>
        <h3 className='font-bold text-sm uppercase text-gray-600'>Phòng ngủ</h3>
        <div className='flex flex-wrap gap-2'>
          {bedroomOptions.map((option: any) => (
            <Button
              key={`bedroom-${option}`}
              variant={bedrooms.includes(option) ? 'secondary' : 'outline'}
              size='sm'
              onClick={() => toggleSelection(option, bedrooms, setBedrooms)}
              className='h-8 rounded-full text-gray-600 font-normal'
            >
              {option}
            </Button>
          ))}
        </div>
      </div>

      {/* Bathrooms */}
      <div className='space-y-2'>
        <h3 className='font-bold text-sm uppercase text-gray-600'>Phòng tắm</h3>
        <div className='flex flex-wrap gap-2'>
          {bathroomOptions.map((option: any) => (
            <Button
              key={`bathroom-${option}`}
              variant={bathrooms.includes(option) ? 'secondary' : 'outline'}
              size='sm'
              onClick={() => toggleSelection(option, bathrooms, setBathrooms)}
              className='h-8 rounded-full text-gray-800 font-normal'
            >
              {option}
            </Button>
          ))}
        </div>
      </div>

      {/* Furniture */}
      <div className='space-y-2'>
        <h3 className='font-bold text-sm uppercase text-gray-600'>Nội thất</h3>
        <div className='flex gap-2'>
          <Button
            variant={isFurnished === true ? 'secondary' : 'outline'}
            size='sm'
            onClick={() => setIsFurnished(isFurnished === true ? null : true)}
            className='rounded-full text-gray-600 font-normal'
          >
            Có nội thất
          </Button>
          <Button
            variant={isFurnished === false ? 'secondary' : 'outline'}
            size='sm'
            onClick={() => setIsFurnished(isFurnished === false ? null : false)}
            className='rounded-full text-gray-600 font-normal'
          >
            Không nội thất
          </Button>
        </div>
      </div>

      {/* Direction */}
      <div className='space-y-2'>
        <h3 className='font-bold text-sm uppercase text-gray-600'>Hướng</h3>
        <div className='grid grid-cols-2 gap-2'>
          {directionOptions.map((option) => (
            <Button
              key={option}
              variant={directions.includes(option) ? 'secondary' : 'outline'}
              size='sm'
              onClick={() => toggleSelection(option, directions, setDirections)}
              className='rounded-full text-gray-600 font-normal'
            >
              {option}
            </Button>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className='space-y-2'>
        <h3 className='font-bold text-sm uppercase text-gray-600'>Trạng thái</h3>
        <div className='space-y-2'>
          {statusOptions.map((option) => (
            <div key={option} className='flex items-center space-x-2'>
              <Checkbox
                id={`status-${option}`}
                checked={status.includes(option)}
                onCheckedChange={() => toggleSelection(option, status, setStatus)}
              />
              <Label htmlFor={`status-${option}`} className='text-gray-600 font-normal'>
                {option}
              </Label>
            </div>
          ))}
        </div>
      </div>
      <div className='flex flex-col gap-[10px] mt-[5px] '>
        <Button className='w-full bg-red-600 hover:bg-red-700 text-white font-medium' onClick={applyFilters}>
          Áp dụng lọc
        </Button>
        <Button className='w-full text-gray-800 font-normal  ' variant='outline' onClick={resetFilters}>
          Reset filter
        </Button>
      </div>
    </div>
  );
}
