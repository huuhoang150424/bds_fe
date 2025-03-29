import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FaDollarSign, FaUserPlus, FaShoppingCart, FaStar } from 'react-icons/fa';

const data = [
  { id: 1, title: 'Doanh thu', specific: '$12,000', Icon: FaDollarSign },
  { id: 2, title: 'Người dùng mới', specific: '1,200', Icon: FaUserPlus },
  { id: 3, title: 'Sản phẩm bán ra', specific: '320', Icon: FaShoppingCart },
  { id: 4, title: 'Đánh giá', specific: '4.8/5', Icon: FaStar },
];

const ListCards: React.FC = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {data.map((item) => {
        const IconComponent = item.Icon;
        return (
          <Card
            key={item.id}
            className="rounded-[6px] border border-gray-200 shadow-sm cursor-pointer dark:bg-colorDarkMode dark:border-borderDarkMode transition-all duration-500 ease-linear"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <IconComponent className="text-xl text-gray-500 dark:text-gray-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.specific}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ListCards;
