import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export function RegionsChart() {
  const data = [
    { name: 'Quận 1', value: 25 },
    { name: 'Quận 2', value: 20 },
    { name: 'Quận 7', value: 15 },
    { name: 'Bình Thạnh', value: 18 },
    { name: 'Khác', value: 22 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <Card className="border rounded-[10px]  border-gray-200 ">
      <CardHeader>
        <CardTitle>Phân bố truy cập theo khu vực</CardTitle>
      </CardHeader>
      <CardContent className="p-[15px]">
        <ResponsiveContainer width="100%" height={285}>
          <PieChart>
            <Pie
              data={data}
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