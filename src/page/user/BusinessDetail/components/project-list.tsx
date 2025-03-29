import { CustomImage } from '@/components/common';
import { Card, CardContent } from '@/components/ui/card';
import { realEstateCompanies } from '@/constant/constBusinessDetail';

const ProjectList = () => {
  return (
    <div className='bg-white rounded-xl  p-8  transition-shadow'>
      <h2 className='text-2xl font-bold mb-6 text-gray-800'>Dự án thuộc {realEstateCompanies.name}</h2>
      <div className='space-y-6'>
        {realEstateCompanies.notableProjects.map((project, index) => (
          <Card key={index} className='overflow-hidden border border-gray-200 rounded-[10px] transition-shadow shadow-sm'>
            <CardContent className='p-0'>
              <div className='flex flex-col md:flex-row'>
                <div className='relative w-full md:w-[300px]'>
                  <CustomImage
                    src={project.image}
                    alt={project.name}
                    width={300}
                    height='auto'
                    className='h-[250px] w-full object-cover'
                  />
                  <div className='absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 text-sm rounded-full font-medium'>
                    {project.status}
                  </div>
                </div>
                <div className='p-6 flex-1'>
                  <h3 className='text-xl font-bold text-gray-800 mb-4 hover:text-blue-600 transition-colors'>
                    {project.name}
                  </h3>
                  <div className='flex flex-wrap gap-6 mb-4'>
                    <div className='flex items-center'>
                      <span className='text-gray-500'>Diện tích:</span>
                      <span className='ml-2 font-semibold'>{project.area}</span>
                    </div>
                    <div className='flex items-center'>
                      <span className='text-gray-500'>Số căn hộ:</span>
                      <span className='ml-2 font-semibold'>{project.apartment}</span>
                    </div>
                  </div>
                  <p className='text-gray-600 mb-4'>
                    <span className='font-medium'>Địa chỉ:</span> {project.location}
                  </p>
                  <p className='text-gray-600 line-clamp-2'>{project.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectList; 