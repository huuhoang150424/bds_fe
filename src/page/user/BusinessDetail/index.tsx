import useScrollToTopOnMount from '@/hooks/use-scroll-top';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, Calendar, Heart, Home, Mail, MapPin, MessageSquare, Phone, User, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AppointmentDialog } from './components/appointment-dialog';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useProfileUsers } from './hooks/use-get-profile';
import { usePostTarget } from './hooks/use-get-post-target';
import { Loading } from '@/components/common';
import PropertyCard from './components/property-card';
import { useAppContext } from '@/context/chat';

function BusinessDetail() {
  useScrollToTopOnMount();
  const location = useLocation();
  const postId = location.state?.postId;
  const [activeTab, setActiveTab] = useState('listings');
  const navigate=useNavigate();
  const { id } = useParams();
  const { data: profileData, isLoading: isLoadingProfile } = useProfileUsers(id || '');
  const { data: postTargetData, isLoading: isLoadingPostTarget } = usePostTarget(id || '');
  const { setSelectedUser } = useAppContext();
  const allPosts = postTargetData?.data || [];
  const deliveredPosts = postTargetData?.data?.filter((post: any) => post.status === 'Đã bàn giao') || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative">
        <div className="h-[250px] w-full relative">
          <div className="absolute inset-0 p-[12px]">
            <img
              src={profileData?.data?.coverPhoto}
              alt="Real Estate Banner"
              className="object-cover w-full h-full rounded-[8px]"
            />
          </div>
          <motion.div
            className="absolute z-[50] -bottom-20 left-6 md:left-10 rounded-full border-4 border-white shadow-xl bg-white"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Avatar className="h-32 w-32 md:h-40 md:w-40">
              <AvatarImage className="object-cover" src={profileData?.data?.avatar} alt="Michael Chen" />
            </Avatar>
          </motion.div>
        </div>

        <div className="container relative">
          <div className="md:pl-56 md:pr-14 pt-4 pb-6 flex flex-col md:flex-row md:items-center justify-between">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-xl md:text-2xl font-bold">{profileData?.data?.fullname}</h1>
              <p className="text-gray-600 mt-[5px] text-xs">{profileData?.data?.selfIntroduction}</p>
              <div className="flex items-center mt-2 text-xs">
                <Badge className="bg-red-500 hover:bg-red-600 mr-2 text-[10px]">
                  {profileData?.data?.isProfessional ? 'Chuyên nghiệp' : 'Chưa chuyên nghiệp'}
                </Badge>
                <div className="flex items-center text-yellow-500">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  <Star className="h-3.5 w-3.5 fill-current" />
                  <Star className="h-3.5 w-3.5 fill-current" />
                  <Star className="h-3.5 w-3.5 fill-current" />
                  <Star className="h-3.5 w-3.5 fill-current" />
                  <span className="ml-1 text-gray-700">
                    {profileData?.data?.averageRating} ({profileData?.data?.totalRatings} Đánh giá)
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="flex gap-2 mt-4 md:mt-0"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button onClick={()=> {navigate('/agent/chat'); setSelectedUser(profileData?.data);}
                // navigate(`/business/${}`,{ state: { postId:data.postId} })
                } className="bg-red-500 hover:bg-red-600 text-xs">
                <MessageSquare className="mr-1 h-3.5 w-3.5" /> Nhắn tin
              </Button>
              <AppointmentDialog receiverId={id || ''} postId={postId} receiverName={profileData?.data?.fullname} />
            </motion.div>
          </div>
        </div>
      </section>
      {isLoadingProfile ? (
        <Loading className="mx-auto mt-[100px]" />
      ) : (
        <div className="px-[60px] py-2 mt-0">
          <div className="grid grid-cols-12 gap-6">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="col-span-3"
            >
              <Card className="border border-gray-200 rounded-[8px] p-4">
                <CardHeader className="p-0 mt-[5px]">
                  <CardTitle className="text-[15px] font-[600] text-gray-600">Thông tin chi tiết</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-0 mt-4">
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-red-500 mt-0.5" />
                    <div>
                      <p className="font-[500] text-sm">{profileData?.data?.fullname}</p>
                      <p className="text-xs text-gray-500">
                        {profileData?.data?.experienceYears
                          ? `${profileData?.data?.experienceYears} + Kinh nghiệm trong nghề`
                          : 'Chưa có kinh nghiệm'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Building className="h-4 w-4 text-red-500 mt-0.5" />
                    <div>
                      <p className="font-[500] text-sm">Kinh nghiệm chính</p>
                      <p className="text-xs text-gray-500">{profileData?.data?.expertise ? '' : 'chưa có'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-red-500 mt-0.5" />
                    <div>
                      <p className="font-[500] text-sm">Địa chỉ chính</p>
                      <p className="text-xs text-gray-500">{profileData?.data?.address}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-red-500 mt-0.5" />
                    <div>
                      <p className="font-[500] text-sm">{profileData?.data?.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-red-500 mt-0.5" />
                    <div>
                      <p className="font-[500] text-sm">{profileData?.data?.phone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6 border border-gray-200 rounded-[8px] p-4">
                <CardHeader className="p-0">
                  <CardTitle className="text-[15px] font-[600] text-gray-600">Chuyên môn</CardTitle>
                </CardHeader>
                <CardContent className="p-0 mt-4">
                  {profileData?.data?.expertise ? (
                    profileData?.data?.expertise?.map((item: string) => (
                      <Badge key={item} className="bg-red-100 text-red-500 hover:bg-red-200 text-[10px]">
                        {item}
                      </Badge>
                    ))
                  ) : (
                    <Badge className="bg-red-100 text-red-500 hover:bg-red-200 text-[10px]">Chưa có</Badge>
                  )}
                  <div className="flex flex-wrap gap-2"></div>
                </CardContent>
              </Card>

              <Card className="mt-6 mb-[50px] border border-gray-200 rounded-[8px] p-4">
                <CardHeader className="p-0">
                  <CardTitle className="text-[15px] font-[600] text-gray-600">Người dùng gần đây</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-0 mt-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            className="object-cover border border-gray-200"
                            src={`https://i.pinimg.com/736x/c9/96/bd/c996bd02bbc54717f17d0220c0385fd5.jpg`}
                          />
                          <AvatarFallback className="bg-red-100 text-red-500 text-[10px]">U{item}</AvatarFallback>
                        </Avatar>
                        <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                      </div>
                      <div>
                        <p className="font-[500] text-sm">Ngọc Lan</p>
                        <p className="text-[10px] text-gray-500">{item * 2} hours ago</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            <Tabs defaultValue="listings" className=" col-span-9" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3 border border-gray-200 bg-transparent">
                  <TabsTrigger
                    value="listings"
                    className="data-[state=active]:bg-red-500 data-[state=active]:text-white text-xs"
                  >
                    Tất cả dự án
                  </TabsTrigger>
                  <TabsTrigger
                    value="sold"
                    className="data-[state=active]:bg-red-500 data-[state=active]:text-white text-xs"
                  >
                    Dự án đã bàn giao
                  </TabsTrigger>
                  <TabsTrigger
                    value="reviews"
                    className="data-[state=active]:bg-red-500 data-[state=active]:text-white text-xs"
                  >
                    Đánh giá của khách hàng
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="listings" className="mt-6">
                  <div className="grid grid-cols-4 gap-4 mb-[100px]">
                    {allPosts.length > 0 ? (
                      allPosts.map((post: any) => <PropertyCard key={post.id} property={post} />)
                    ) : (
                      <p className="col-span-4 text-center text-gray-500 text-xs">Không có dự án nào</p>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="sold" className="mt-6">
                  <div className="grid grid-cols-4 gap-4 mb-[100px]">
                    {deliveredPosts.length > 0 ? (
                      deliveredPosts.map((post: any) => <PropertyCard key={post.id} property={post} />)
                    ) : (
                      <p className="col-span-4 text-center text-gray-500 text-xs">Không có dự án đã bàn giao</p>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="reviews" className="mt-6">
                  
                </TabsContent>
              </Tabs>
          </div>
        </div>
      )}
    </div>
  );
}

export default BusinessDetail;