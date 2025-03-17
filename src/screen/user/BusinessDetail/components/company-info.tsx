import { realEstateCompanies } from '@/constant/constBusinessDetail';

const CompanyInfo = () => {
  return (
    <div className='bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow'>
      <h2 className='text-2xl font-bold mb-6 text-gray-800'>Giới thiệu</h2>
      <div className='space-y-4'>
        <div className='grid grid-cols-3 gap-4 border-b border-gray-100 pb-4 hover:bg-gray-50 rounded-lg p-2'>
          <div className='text-gray-500 font-medium'>Địa chỉ</div>
          <div className='col-span-2'>{realEstateCompanies.address}</div>
        </div>
        <div className='grid grid-cols-3 gap-4 border-b border-gray-100 pb-4 hover:bg-gray-50 rounded-lg p-2'>
          <div className='text-gray-500 font-medium'>Thành lập</div>
          <div className='col-span-2'>{realEstateCompanies.establishedYear}</div>
        </div>
        <div className='grid grid-cols-3 gap-4 border-b border-gray-100 pb-4 hover:bg-gray-50 rounded-lg p-2'>
          <div className='text-gray-500 font-medium'>Lĩnh vực chính</div>
          <div className='col-span-2'>{realEstateCompanies.specialization[0]}</div>
        </div>
        <div className='grid grid-cols-3 gap-4 border-b border-gray-100 pb-4 hover:bg-gray-50 rounded-lg p-2'>
          <div className='text-gray-500 font-medium'>Lĩnh vực phụ</div>
          <div className='col-span-2'>{realEstateCompanies.specialization[1]}</div>
        </div>
        <div className='grid grid-cols-3 gap-4 pb-4 hover:bg-gray-50 rounded-lg p-2'>
          <div className='text-gray-500 font-medium'>Email</div>
          <div className='col-span-2'>{realEstateCompanies.email}</div>
        </div>
        <div className='mt-6'>
          <p className='text-gray-600 leading-relaxed'>{realEstateCompanies.description}</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo; 