import { CustomImage } from '@/components/common';
import { Card, CardContent } from '@/components/ui/card';

interface Company {
  name: string;
  logo: string;
  color: string;
}

interface CompanySectionProps {
  title: string;
  companies: Company[];
}

export default function CompanySection({ title, companies }: CompanySectionProps) {
  return (
    <div className='mb-8'>
      <h2 className='text-xl font-medium mb-4'>{title}</h2>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        {companies.map((company, index) => (
          <Card className='border rounded-[10px] shadow-sm hover:shadow-lg '>
            <CardContent className='p-[8px] '>
              <a
                href='#'
                key={index}
                className='flex flex-col items-center justify-between gap-4'
              >
                <div className=''>
                  <CustomImage
                    src={company.logo || '/placeholder.svg'}
                    alt={company.name}
                    width={180}
                    height={120}
                    className=' w-auto object-cover rounded-[10px]'
                  />
                </div>
                <div><p className='text-xs text-center font-medium'>{company.name}</p></div>
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
