import { Card, CardContent, CardHeader } from '@/components/ui/card';
import React from 'react';

// Định nghĩa interface cho infor
interface Statistics {
  category: String;
  lastMonth: number;
  currentMonth: number;
}

// Props cho component (nếu cần truyền infor từ ngoài vào)
interface CardContentProps {
  infor: Statistics;
}

const StatCard: React.FC<CardContentProps> = ({ infor }: CardContentProps) => {
  return (
    <div>
      <Card className='border border-gray-200  rounded-[10px] '>
        <CardHeader className='text-sm font-medium pb-2'>{infor.category} tháng này</CardHeader>
        <CardContent className='m-[0] pt-[10px]'>
          <div className='text-2xl font-bold mb-[10px]'>{infor.currentMonth}</div>
          {(() => {
            const difference = infor.currentMonth - infor.lastMonth;
            const percentageChange = infor.lastMonth === 0 ? 0 : ((difference / infor.lastMonth) * 100).toFixed(2);

            if (difference < 0) {
              return <p className='text-red-500 text-xs'>Giảm {Math.abs(Number(percentageChange))}% so với tháng trước</p>;
            } else if (difference > 0) {
              return <p className='text-green-500 text-xs'>Tăng {percentageChange}% so với tháng trước</p>;
            } else {
              return <p className='text-gray-500 text-xs'>Không thay đổi so với tháng trước</p>;
            }
          })()}
        </CardContent>
      </Card>
    </div>
  );
};

export default StatCard;
