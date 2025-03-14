import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const data = [
  { name: 'Jan', total: 12000000 },
  { name: 'Feb', total: 9000000 },
  { name: 'Mar', total: 15000000 },
  { name: 'Apr', total: 11000000 },
  { name: 'May', total: 17000000 },
  { name: 'Jun', total: 14000000 },
  { name: 'Jul', total: 18000000 },
  { name: 'Aug', total: 16000000 },
  { name: 'Sep', total: 13000000 },
  { name: 'Oct', total: 19000000 },
  { name: 'Nov', total: 20000000 },
  { name: 'Dec', total: 22000000 },
]

const Overview: React.FC = () => {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <BarChart data={data}>
        <CartesianGrid vertical={false} stroke="#ccc" strokeDasharray="5 5" />
        <XAxis
          dataKey='name'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke='#888888'
          fontSize={10}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value.toLocaleString()} `}
        />
        <Tooltip
          cursor={{ fill: 'transparent' }}
          formatter={(value) => [`Total: ${value.toLocaleString()} vnđ`, '']} 
        />
        <Bar
          dataKey='total'
          fill='currentColor'
          radius={[4, 4, 0, 0]}
          className='fill-primary'
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default Overview;
