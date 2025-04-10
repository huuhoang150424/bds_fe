import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {useGetSatisticalByViewAddress } from '../hooks/use-get-statical-by-growth';

export function RegionsChart() {
  const data = [
    { name: 'Đống Đa', value: 25 },
    { name: 'Cầu Giấy', value: 20 },
    { name: 'Hà Đông', value: 15 },
    { name: 'Thanh Xuân', value: 18 },
    { name: 'Long Biên', value: 22 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  const {data : dataPie ,isLoading, isError} = useGetSatisticalByViewAddress();
  console.log("data pie", dataPie);
  const dataPieChart = dataPie?.map((item: any) => {
    console.log("item", item.addess);
    console.log("value", item.viewCount);
    return {
      name: item.region,
      value: item.viewCount,
    };
  }); 

  return (
    <Card className="border rounded-[10px]  border-gray-200 ">
      <CardHeader>
        <CardTitle>Phân bố truy cập theo khu vực</CardTitle>
      </CardHeader>
      <CardContent className="p-[15px]">
        <ResponsiveContainer width="100%" height={285}>
          <PieChart>
            <Pie
              data={dataPieChart}
              cx="50%"
              cy="50%"
              labelLine={true}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`${value} lượt`, name]}
              labelStyle={{ fontWeight: 'bold' }}
            />
            <Legend
              layout="horizontal"
              align="center"
              verticalAlign="bottom"
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default RegionsChart;