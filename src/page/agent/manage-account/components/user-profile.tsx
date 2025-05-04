import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileHeader from './profile-header';
import PersonalInfo from './personal-info';
import AccountInfo from './account-info';
import ProfessionalInfo from './professional-info';
import StatsOverview from './stats-overview';
import { selectUser } from '@/redux/authReducer';
import { useSelector } from 'react-redux';
import { useProfileUsers } from '@/page/user/BusinessDetail/hooks/use-get-profile';
import { Skeleton } from '@/components/ui/skeleton';

export default function Profile() {
  const user = useSelector(selectUser);
  const { data: profileData, isLoading: isLoadingProfile } = useProfileUsers(user?.id || '');

  if (isLoadingProfile || !profileData?.data) {
    return (
      <div className="container mx-auto py-4 px-3 md:px-4">
        <div className="relative">
          <Skeleton className="h-48 md:h-64 w-full rounded-lg" />
          <div className="absolute z-[50] top-[200px] left-[2%]">
            <Skeleton className="h-28 w-28 rounded-full" />
          </div>
        </div>
        <div className="relative pr-6 pl-[150px] mt-3 pb-3">
          <div className="flex w-full justify-between items-center mt-1">
            <div className="space-y-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-60" />
              <Skeleton className="h-4 w-80" />
            </div>
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
        <div className="mt-4 px-3">
          <Skeleton className="h-32 w-full rounded-lg" />
        </div>
        <div className="mt-4 px-3">
          <Skeleton className="h-8 w-80 mx-auto rounded-lg" />
          <Skeleton className="h-64 w-full mt-4 rounded-lg" />
        </div>
      </div>
    );
  }

  const userData = {
    ...profileData.data,
    expertise: profileData.data.expertise
      ? Array.isArray(profileData.data.expertise)
        ? profileData.data.expertise
        : [profileData.data.expertise]
      : [],
    stats: profileData.data.stats || {
      followers: 0,
      following: 0,
      posts: 0,
      ratings: parseFloat(profileData.data.averageRating || '0.0'),
      transactions: 0,
    },
    roles: profileData.data.roles || 'Agent',
    emailVerified: profileData.data.emailVerified || false,
    balance: profileData.data.balance || 0,
    score: profileData.data.score || 0,
    lastActive: profileData.data.lastActive || new Date(),
    isLock: profileData.data.isLock || false,
    gender: profileData.data.gender || 'Other',
    dateOfBirth: profileData.data.dateOfBirth || null,
  };

  return (
    <div className="container mx-auto py-4 px-3 md:px-4">
      <ProfileHeader user={userData} />
      <div className="mt-4 px-3">
        <StatsOverview user={userData} />
      </div>
      <div className="mt-4 px-3">
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:w-auto max-w-md mx-auto rounded-lg p-1 border border-gray-200">
            <TabsTrigger
              value="personal"
              className="text-xs sm:text-sm rounded-md data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
            >
              Thông tin cá nhân
            </TabsTrigger>
            <TabsTrigger
              value="account"
              className="text-xs sm:text-sm rounded-md data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
            >
              Tài khoản
            </TabsTrigger>
            <TabsTrigger
              value="professional"
              className="text-xs sm:text-sm rounded-md data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
            >
              Chuyên môn
            </TabsTrigger>
          </TabsList>
          <TabsContent value="personal" className="mt-4">
            <PersonalInfo user={userData} />
          </TabsContent>
          <TabsContent value="account" className="mt-4">
            <AccountInfo user={userData} />
          </TabsContent>
          <TabsContent value="professional" className="mt-4">
            <ProfessionalInfo user={userData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}