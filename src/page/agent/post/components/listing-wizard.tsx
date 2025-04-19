import { useState } from 'react';
import { ChevronLeft, Tag, MapPin, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ListingTypeStep from './steps/listing-type-step';
import AddressStep from './steps/address-step';
import ListingDetailsStep from './steps/listing-details-step';
import { motion, AnimatePresence } from 'framer-motion';

export type ListingType = 'Bán' | 'Cho thuê' | null;
export type AddressData = {
  province: string;
  district: string;
  ward: string;
  street: string;
  project?: string;
  fullAddress: string;
};

export default function ListingWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [listingType, setListingType] = useState<ListingType>(null);
  const [listingTypeId, setListingTypeId] = useState<string>("");
  const [addressData, setAddressData] = useState<string>('');

  const steps = [
    { id: 1, name: 'Thông tin BDS', icon: <Tag className='h-4 w-4' /> },
    { id: 2, name: 'Địa chỉ', icon: <MapPin className='h-4 w-4' /> },
    { id: 3, name: 'Chi tiết', icon: <FileText className='h-4 w-4' /> },
  ];
  const handleTypeSelect = (type: ListingType,id:string) => {
    setListingType(type);
    setListingTypeId(id);
    setDirection(1);
    setCurrentStep(2);
  };

  const handleAddressSubmit = (data:string) => {
    setAddressData(data);
    setDirection(1);
    setCurrentStep(3);
  };

  const handleBack = () => {
    window.scrollTo(0, 0);
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };


  const contentVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  };

  return (
    <div className='mx-auto px-[30px] mb-[30px] mt-[15px] '>
      <div className='flex items-center mb-4 '>
        {currentStep > 1 && (
          <Button variant='ghost' size='icon' onClick={handleBack} className='mr-2'>
            <ChevronLeft className='h-5 w-5' />
          </Button>
        )}
        <h1 className='text-xl text-gray-700 font-[600] '>Tạo tin đăng</h1>
      </div>
      <div className='mb-8'>
        <div className='flex items-center justify-between'>
          {steps.map((step, index) => (
            <div key={step.id} className='flex flex-1 items-center'>
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: step.id === currentStep ? '#dc2626' : step.id < currentStep ? '#16a34a' : '#ffffff',
                  borderColor: step.id < currentStep ? '#16a34a' : '#e5e7eb',
                  color: step.id <= currentStep ? '#ffffff' : '#6b7280',
                }}
                transition={{ duration: 0.3 }}
                className='flex h-8 w-8 items-center justify-center rounded-full border'
              >
                {step.icon}
              </motion.div>
              <div
                className={`ml-2 mr-[10px] text-sm ${
                  step.id === currentStep ? 'font-medium text-gray-900' : 'text-gray-500'
                }`}
              >
                Bước {step.id}. {step.name}
              </div>
              {index < steps.length - 1 && (
                <motion.div
                  className='h-0.5 flex-1'
                  initial={false}
                  animate={{
                    backgroundColor: step.id < currentStep ? '#dc2626' : '#e5e7eb',
                  }}
                  transition={{ duration: 0.5 }}
                ></motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className='relative overflow-hidden rounded-lg border bg-white p-6 shadow-sm'>
        <AnimatePresence initial={false} custom={direction} mode='wait'>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={contentVariants}
            initial='enter'
            animate='center'
            exit='exit'
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            {currentStep === 1 && <ListingTypeStep onSelect={handleTypeSelect} />}
            {currentStep === 2 && <AddressStep onSubmit={handleAddressSubmit} onBack={handleBack} />}
            {currentStep === 3 && (
              <ListingDetailsStep 
                listingType={listingType} 
                addressData={addressData} 
                onBack={handleBack} 
                selectListingTypeId={listingTypeId} 
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
