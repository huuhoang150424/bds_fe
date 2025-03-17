import Banner from './components/Banner';
import CompanyInfo from './components/company-info';
import ContactInfo from './components/contact-info';
import ProjectList from './components/project-list';
import Relate from './components/relate';

function BusinessDetail() {
  return (
    <div className='min-h-screen bg-gray-50 pt-[80px]'>
      <Banner />

      <main className='max-w-6xl mx-auto py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <div className='lg:col-span-2 space-y-8'>
            <CompanyInfo />
            <ProjectList />
          </div>

          <div className='lg:col-span-1'>
            <ContactInfo />
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-sm p-8 mt-8 hover:shadow-md transition-shadow'>
          <h2 className='text-2xl font-bold mb-6 text-gray-800'>Các doanh nghiệp tương tự</h2>
          <Relate />
        </div>
      </main>
    </div>
  );
}

export default BusinessDetail;
