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
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // Dữ liệu cố định
  const dataPie = [
    { region: "Hà Nội", viewCount: 1200 },
    { region: "TP. Hồ Chí Minh", viewCount: 900 },
    { region: "Đà Nẵng", viewCount: 500 },
    { region: "Cần Thơ", viewCount: 300 },
    { region: "Hải Phòng", viewCount: 200 },
  ];

  const dataPieChart = dataPie.map((item) => ({
    name: item.region,
    value: item.viewCount,
  }));

  return (
    <Card className="border rounded-[10px] border-gray-200">
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
              {dataPieChart.map((entry, index) => (
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