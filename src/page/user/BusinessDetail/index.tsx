import Banner from './components/Banner';
import CompanyInfo from './components/company-info';
import ContactInfo from './components/contact-info';
import ProjectList from './components/project-list';
import Relate from './components/relate';

function BusinessDetail() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white'>
      <div className='pt-[80px]'>
        <Banner />
      </div>

      <main className='max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <div className='lg:col-span-2 space-y-8'>
            <div className='bg-white rounded-xl border border-gray-200  p-6  transition-all duration-300'>
              <CompanyInfo />
            </div>
            
            <div className='bg-white rounded-xl border border-gray-200   p-6  transition-all duration-300'>
              <ProjectList />
            </div>
          </div>

          <div className='lg:col-span-1'>
            <div className='bg-white rounded-xl border border-gray-200  p-6  transition-all duration-300 sticky top-24'>
              <ContactInfo />
            </div>
          </div>
        </div>

        <div className='bg-white rounded-xl  p-8 mt-12 border border-gray-200 transition-all duration-300'>
          <h2 className='text-2xl font-bold mb-8 text-gray-800 border-b pb-4'>
            Các doanh nghiệp tương tự
          </h2>
          <Relate />
        </div>
      </main>
    </div>
  );
}

export default BusinessDetail;
