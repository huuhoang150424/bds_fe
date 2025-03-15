import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
 
    amt: 2400,
  },
  {
    name: 'Tháng 1',
    uv: 3000,

    amt: 2210,
  },
  {
    name: 'Tháng 2',
    uv: 2000,
  
    amt: 2290,
  },
  {
    name: 'Tháng 3',
    uv: 2780,
  
    amt: 2000,
  },
  {
    name: 'Tháng 4',
    uv: 1890,
 
    amt: 2181,
  },
  {
    name: 'Tháng 5',
    uv: 2390,

    amt: 2500,
  },
  {
    name: 'Tháng 6',
    uv: 3490,
 
    amt: 2100,
  },
  {
    name: 'Tháng 7',
    uv: 3890,

    amt: 2100,
  },
  {
    name: 'Tháng 8',
    uv: 3090,

    amt: 2100,
  },
  {
    name: 'Tháng 9',
    uv: 6490,
 
    amt: 2100,
  },
  {
    name: 'Tháng 10',
    uv: 3590,
   
    amt: 2100,
  },
  {
    name: 'Tháng 11',
    uv: 5490,
   
    amt: 2100,
  },
  {
    name: 'Tháng 2',
    uv: 4490,
   
    amt: 2100,
  },
];

export default class Chart extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/line-chart-width-xaxis-padding-8v7952';

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          
          <Line type="monotone" dataKey="uv" stroke="#E03C31" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
