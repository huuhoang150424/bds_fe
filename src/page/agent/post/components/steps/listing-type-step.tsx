import { motion } from 'framer-motion';
import type { ListingType } from '../listing-wizard';
import { Tag, Home, Info, HelpCircle, Building, Landmark, MapPin } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useGetListType } from '../../hooks/use-get-list-type';
interface ListingTypeStepProps {
  onSelect: any;
}
const propertyCategories = [
  {
    id: "residential",
    name: "Nhà ở",
    icon: <Home className="h-5 w-5" />,
    description: "Căn hộ, nhà riêng, biệt thự",
  },
  {
    id: "commercial",
    name: "Thương mại",
    icon: <Building className="h-5 w-5" />,
    description: "Văn phòng, cửa hàng, khách sạn",
  },
  {
    id: "land",
    name: "Đất",
    icon: <MapPin className="h-5 w-5" />,
    description: "Đất nền, đất nông nghiệp",
  },
  {
    id: "industrial",
    name: "Công nghiệp",
    icon: <Landmark className="h-5 w-5" />,
    description: "Nhà xưởng, kho bãi",
  },
]
export default function ListingTypeStep({ onSelect }: ListingTypeStepProps) {
  const {data}=useGetListType();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <div>
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className='mb-6 text-xl font-[500] text-gray-800'
      >
        Nhu cầu
      </motion.h2>
      <motion.div variants={containerVariants} initial='hidden' animate='visible' className='grid gap-4 md:grid-cols-2'>
        {
          data?.map((listingType:any)=>{
            return (
              <motion.button
              key={listingType?.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(listingType?.listingType, listingType?.id)}
              className='flex items-center gap-3 rounded-md border border-gray-200 p-4 text-left transition-colors hover:border-red-500 hover:bg-red-50'
            >
              <Tag className='h-5 w-5 text-red-600' />
              <span className='text-[16px] font-[500] text-gray-800'>{listingType?.listingType}</span>
            </motion.button>
            )
          })
        }
      </motion.div>
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mt-8 border-t pt-6">
        <motion.h3 variants={itemVariants} className="mb-4 flex items-center gap-2 text-lg font-medium">
          <Info className="h-5 w-5 text-blue-500" />
          Loại bất động sản phổ biến
        </motion.h3>

        <Tabs defaultValue="residential" className="w-full">
          <TabsList className="mb-4 grid w-full grid-cols-4">
            {propertyCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-1.5">
                {category.icon}
                <span className="hidden sm:inline">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {propertyCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="grid gap-4 md:grid-cols-3"
              >
                {category.id === "residential" && (
                  <>
                    <PropertyTypeCard
                      title="Căn hộ chung cư"
                      description="Căn hộ trong các tòa nhà chung cư cao tầng"
                      icon={<Building className="h-10 w-10 text-red-500" />}
                    />
                    <PropertyTypeCard
                      title="Nhà riêng"
                      description="Nhà phố, nhà mặt tiền, nhà trong hẻm"
                      icon={<Home className="h-10 w-10 text-red-500" />}
                    />
                    <PropertyTypeCard
                      title="Biệt thự"
                      description="Biệt thự đơn lập, song lập, liền kề"
                      icon={<Landmark className="h-10 w-10 text-red-500" />}
                    />
                  </>
                )}

                {category.id === "commercial" && (
                  <>
                    <PropertyTypeCard
                      title="Văn phòng"
                      description="Văn phòng cho thuê, tòa nhà văn phòng"
                      icon={<Building className="h-10 w-10 text-red-500" />}
                    />
                    <PropertyTypeCard
                      title="Cửa hàng, ki-ốt"
                      description="Mặt bằng kinh doanh, cửa hàng"
                      icon={<Tag className="h-10 w-10 text-red-500" />}
                    />
                    <PropertyTypeCard
                      title="Khách sạn"
                      description="Khách sạn, nhà nghỉ, homestay"
                      icon={<Landmark className="h-10 w-10 text-red-500" />}
                    />
                  </>
                )}

                {category.id === "land" && (
                  <>
                    <PropertyTypeCard
                      title="Đất nền dự án"
                      description="Đất trong các dự án phân lô"
                      icon={<MapPin className="h-10 w-10 text-red-500" />}
                    />
                    <PropertyTypeCard
                      title="Đất thổ cư"
                      description="Đất có sổ đỏ, sổ hồng"
                      icon={<MapPin className="h-10 w-10 text-red-500" />}
                    />
                    <PropertyTypeCard
                      title="Đất nông nghiệp"
                      description="Đất trồng cây, đất vườn"
                      icon={<MapPin className="h-10 w-10 text-red-500" />}
                    />
                  </>
                )}

                {category.id === "industrial" && (
                  <>
                    <PropertyTypeCard
                      title="Nhà xưởng"
                      description="Nhà xưởng sản xuất, nhà máy"
                      icon={<Building className="h-10 w-10 text-red-500" />}
                    />
                    <PropertyTypeCard
                      title="Kho bãi"
                      description="Kho hàng, bãi đỗ xe"
                      icon={<Building className="h-10 w-10 text-red-500" />}
                    />
                    <PropertyTypeCard
                      title="Đất công nghiệp"
                      description="Đất trong khu công nghiệp"
                      icon={<MapPin className="h-10 w-10 text-red-500" />}
                    />
                  </>
                )}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>

        <motion.div variants={itemVariants} className="mt-8 rounded-lg bg-blue-50 p-4">
          <div className="flex items-start gap-3">
            <HelpCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500" />
            <div>
              <h4 className="font-medium text-blue-700">Lưu ý khi đăng tin</h4>
              <p className="mt-1 text-sm text-blue-700">
                Đăng tin với đầy đủ thông tin và hình ảnh chất lượng sẽ giúp tin đăng của bạn tiếp cận nhiều người hơn.
                Hãy cung cấp thông tin chính xác về giá, diện tích và vị trí để tăng hiệu quả.
              </p>
              <div className="mt-3 flex gap-2">
                <Button variant="outline" size="sm" className="bg-white">
                  Xem hướng dẫn
                </Button>
                <Button variant="outline" size="sm" className="bg-white">
                  Quy định đăng tin
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
function PropertyTypeCard({ title, description, icon }:any) {
  return (
    <Card className="overflow-hidden transition-all hover:border-red-200 hover:shadow-md">
      <CardContent className="flex items-start gap-3 p-4">
        <div className="rounded-full bg-red-50 p-2">{icon}</div>
        <div>
          <h4 className="font-medium">{title}</h4>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardContent>
    </Card>
  )
}
