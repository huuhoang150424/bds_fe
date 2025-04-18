import type React from 'react';
import { useEffect, useState } from 'react';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';

const propertyTags = [
  { value: 'apartment', label: 'Căn hộ' },
  { value: 'house', label: 'Nhà riêng' },
  { value: 'villa', label: 'Biệt thự' },
  { value: 'townhouse', label: 'Nhà phố' },
  { value: 'land', label: 'Đất nền' },
  { value: 'commercial', label: 'Bất động sản thương mại' },
  { value: 'office', label: 'Văn phòng' },
  { value: 'retail', label: 'Cửa hàng' },
];

const amenityTags = [
  { value: 'pool', label: 'Hồ bơi' },
  { value: 'garage', label: 'Gara ô tô' },
  { value: 'garden', label: 'Sân vườn' },
  { value: 'security', label: 'An ninh 24/7' },
  { value: 'elevator', label: 'Thang máy' },
  { value: 'gym', label: 'Phòng tập gym' },
  { value: 'balcony', label: 'Ban công' },
  { value: 'parking', label: 'Bãi đỗ xe' },
];

const locationTags = [
  { value: 'city-center', label: 'Trung tâm thành phố' },
  { value: 'near-school', label: 'Gần trường học' },
  { value: 'near-hospital', label: 'Gần bệnh viện' },
  { value: 'near-park', label: 'Gần công viên' },
  { value: 'near-market', label: 'Gần chợ' },
  { value: 'near-highway', label: 'Gần đường cao tốc' },
  { value: 'riverside', label: 'Ven sông' },
  { value: 'seaside', label: 'Ven biển' },
];

export default function TagInput({ onSelect,resetTags }: { onSelect: (tagSelect: string[]) => void ,resetTags?:number}) {
  const [open, setOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<{ value: string; label: string }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [tagSelect, setTagSelect] = useState<string[]>([]);


  const handleReset = () => {
    setSelectedTags([]);
    setTagSelect([]);
    setInputValue('');
    onSelect([]);
  };
  useEffect(() => {
    if (resetTags) {
      handleReset();
    }
  }, [resetTags]);


  const handleSelect = (tag: { value: string; label: string }) => {
    if (!selectedTags.some((t) => t.value === tag.value)) {
      const newSelected = [...selectedTags, tag];
      const newTags = [tag.label, ...tagSelect];
  
      setSelectedTags(newSelected);
      setTagSelect(newTags);
      onSelect(newTags); 
    }
    setInputValue('');
    setOpen(false);
  };

  const handleRemoveTag = (value: string, label: string) => {
    const newSelected = selectedTags.filter((tag) => tag.value !== value);
    const newTags = tagSelect.filter((labelTag) => labelTag !== label);
    setSelectedTags(newSelected);
    setTagSelect(newTags);
    onSelect(newTags);
  };

  const handleAddCustomTag = () => {
    if (inputValue.trim() && !selectedTags.some((t) => t.label.toLowerCase() === inputValue.toLowerCase())) {
      const newTag = {
        value: inputValue.toLowerCase().replace(/\s+/g, '-'),
        label: inputValue.trim(),
      };
      const newSelected = [...selectedTags, newTag];
      const newTags = [newTag.label, ...tagSelect];
      setSelectedTags(newSelected);
      setTagSelect(newTags);
      onSelect(newTags);
      setInputValue('');
    }
  };

  const handleDirectInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue) {
      e.preventDefault();
      handleAddCustomTag();
    }
  };

  const handleResetTags = () => {
    setSelectedTags([]);
    setTagSelect([]);
    setInputValue('');
    onSelect([]);
  };

  return (
    <div className='w-full mx-auto space-y-4 mt-[100px]'>
      <div className='flex gap-2 items-center'>
        <div className='relative w-full'>
          <Input
            placeholder='Nhập tag và nhấn Enter'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleDirectInputKeyDown}
            className='w-full pr-10 outline-none px-[14px] py-[8px] rounded-[6px]'
          />
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant='ghost' size='icon' className='absolute right-0 top-0 h-full rounded-l-none'>
                <ChevronsUpDown className='h-4 w-4' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[300px] p-0' align='end'>
              <Command>
                <CommandInput placeholder='Tìm kiếm tags...' value={inputValue} onValueChange={setInputValue} />
                <CommandList>
                  <CommandEmpty>
                    <div className='px-2 py-1.5'>
                      <p>Không tìm thấy tag</p>
                      <Button variant='secondary' size='sm' className='mt-2 w-full' onClick={handleAddCustomTag}>
                        Thêm "{inputValue}" như một tag mới
                      </Button>
                    </div>
                  </CommandEmpty>
                  <CommandGroup heading='Loại bất động sản'>
                    {propertyTags
                      .filter((tag) => tag.label.toLowerCase().includes(inputValue.toLowerCase()))
                      .map((tag) => (
                        <CommandItem
                          key={tag.value}
                          value={tag.value}
                          onSelect={() => handleSelect(tag)}
                          className='cursor-pointer'
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              selectedTags.some((t) => t.value === tag.value) ? 'opacity-100' : 'opacity-0',
                            )}
                          />
                          {tag.label}
                        </CommandItem>
                      ))}
                  </CommandGroup>
                  <CommandGroup heading='Tiện ích'>
                    {amenityTags
                      .filter((tag) => tag.label.toLowerCase().includes(inputValue.toLowerCase()))
                      .map((tag) => (
                        <CommandItem
                          key={tag.value}
                          value={tag.value}
                          onSelect={() => handleSelect(tag)}
                          className='cursor-pointer'
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              selectedTags.some((t) => t.value === tag.value) ? 'opacity-100' : 'opacity-0',
                            )}
                          />
                          {tag.label}
                        </CommandItem>
                      ))}
                  </CommandGroup>
                  <CommandGroup heading='Vị trí'>
                    {locationTags
                      .filter((tag) => tag.label.toLowerCase().includes(inputValue.toLowerCase()))
                      .map((tag) => (
                        <CommandItem
                          key={tag.value}
                          value={tag.value}
                          onSelect={() => handleSelect(tag)}
                          className='cursor-pointer'
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              selectedTags.some((t) => t.value === tag.value) ? 'opacity-100' : 'opacity-0',
                            )}
                          />
                          {tag.label}
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <Button
          type='button'
          variant='outline'
          onClick={handleResetTags}
          className='text-red-500 hover:text-red-600 hover:bg-red-50'
        >
          Reset All
        </Button>
      </div>
      <div className='border rounded-md bg-muted/20'>
        <ScrollArea className='h-[150px] w-full p-4'>
          <div className='flex flex-wrap gap-2'>
            {selectedTags.length === 0 ? (
              <p className='text-muted-foreground text-sm'>Các tags sẽ hiển thị ở đây</p>
            ) : (
              selectedTags.map((tag) => (
                <Badge
                  key={tag.value}
                  variant='secondary'
                  className='animate-fadeIn flex items-center gap-1 px-3 py-1.5 transition-all hover:bg-muted border border-gray-200 text-gray-600'
                >
                  {tag.label}
                  <X
                    className='h-3 w-3 cursor-pointer hover:text-destructive'
                    onClick={() => handleRemoveTag(tag.value, tag.label)}
                  />
                </Badge>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}