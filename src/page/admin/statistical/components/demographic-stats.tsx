
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useGetUserDemographicStats } from '../hook/use-get-user-demographic';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const DemographicStats: React.FC = () => {
  const { data, isLoading, error } = useGetUserDemographicStats();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const genderData = [
    { name: 'Nam', value: data?.data?.genderDistribution.malePercentage },
    { name: 'Nữ', value: data?.data?.genderDistribution.femalePercentage },
    { name: 'Khác', value: data?.data?.genderDistribution.otherPercentage },
  ];

  const ageData = data?.data?.ageDistribution.map((item: { ageGroup: string; count: number }) => ({
    name: item?.ageGroup,
    value: item?.count,
  }));

  return (
    <div className="grid gap-4 md:grid-cols-3 mt-4">
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle className="text-xs">Phân Bổ Theo Giới Tính</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => <span className="text-xs">{value}</span>}
                />
                <Tooltip formatter={(value) => [`${value}%`, '']} contentStyle={{ fontSize: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle className="text-xs">Phân Bổ Theo Độ Tuổi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f5f5f5" />
                <XAxis type="number" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <Tooltip formatter={(value) => [`${value}`, '']} contentStyle={{ fontSize: '10px' }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {ageData.map((entry:any, index:number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DemographicStats;