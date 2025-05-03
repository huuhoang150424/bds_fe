import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileHeader from './profile-header';
import PersonalInfo from './personal-info';
import AccountInfo from './account-info';
import ProfessionalInfo from './professional-info';
import StatsOverview from './stats-overview';
import { selectUser } from '@/redux/authReducer';
import { useSelector } from 'react-redux';

const userData = {
  id: 'f2bb40dc-553b-48a0-ab6f-dc93d1c04eaa',
  fullname: 'Nguyễn Văn A',
  email: 'nguyenvana@gmail.com',
  emailVerified: true,
  isLock: false,
  phone: '0349938737',
  isProfessional: true,
  active: true,
  lastActive: new Date(),
  address: '123 Đường Lê Lợi, Quận 1, TP.HCM',
  gender: 'Male',
  dateOfBirth: new Date(1990, 0, 1),
  avatar:
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3',
  coverPhoto:
    'https://images.unsplash.com/photo-1504805572947-34fad45aed93?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
  balance: 5000000,
  roles: 'Professional',
  score: 120,
  selfIntroduction:
    'Tôi là một chuyên gia bất động sản với hơn 10 năm kinh nghiệm trong lĩnh vực này. Tôi đam mê giúp mọi người tìm kiếm ngôi nhà mơ ước của họ và đầu tư thông minh vào bất động sản.',
  certificates: 'Chứng chỉ Môi giới Bất động sản, Chứng chỉ Định giá Bất động sản',
  experienceYears: '10',
  expertise: ['Bất động sản nhà ở', 'Bất động sản thương mại', 'Đầu tư bất động sản'],
  stats: {
    posts: 48,
    transactions: 156,
    ratings: 4.8,
    followers: 320,
    following: 125,
  },
};

export default function Profile() {
  const user = useSelector(selectUser);



  return (
    <div className='container mx-auto py-4 px-3 md:px-4'>
      <ProfileHeader user={userData} />

      <div className='mt-4 px-3'>
        <StatsOverview user={userData} />
      </div>

      <div className='mt-4 px-3'>
        <Tabs defaultValue='personal' className='w-full '>
          <TabsList className='grid w-full grid-cols-3 md:w-auto max-w-md mx-auto  rounded-lg p-1 border border-gray-200 '>
            <TabsTrigger
              value='personal'
              className='text-xs sm:text-sm rounded-md data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm'
            >
              Thông tin cá nhân
            </TabsTrigger>
            <TabsTrigger
              value='account'
              className='text-xs sm:text-sm rounded-md data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm'
            >
              Tài khoản
            </TabsTrigger>
            <TabsTrigger
              value='professional'
              className='text-xs sm:text-sm rounded-md data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm'
            >
              Chuyên môn
            </TabsTrigger>
          </TabsList>

          <TabsContent value='personal' className='mt-4'>
            <PersonalInfo user={userData} />
          </TabsContent>

          <TabsContent value='account' className='mt-4'>
            <AccountInfo user={userData} />
          </TabsContent>

          <TabsContent value='professional' className='mt-4'>
            <ProfessionalInfo user={userData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
