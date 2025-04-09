import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartProps {
  chartData: Array<{ price: number; changed_at: string }>;
}

export default class Chart extends PureComponent<ChartProps> {
  static demoUrl = 'https://codesandbox.io/p/sandbox/line-chart-width-xaxis-padding-8v7952';

  // Hàm định dạng ngày với kiểm tra hợp lệ
  formatDate = (value: string): string => {
    const date = new Date(value);
    return isNaN(date.getTime()) ? value : date.toLocaleDateString('vi-VN');
  };

  // Hàm định dạng giá trị thành tỷ VND
  formatPriceToBillion = (value: number): string => {
    const billionValue = value / 1000000000; // Chia cho 1 tỷ
    return `${billionValue.toLocaleString('vi-VN')} tỷ VND`;
  };

  render() {
    const { chartData } = this.props;

    //console.log("chartData:", chartData);

    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 40, 
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="changed_at"
            tickFormatter={this.formatDate}
          />
          <YAxis
            tickFormatter={this.formatPriceToBillion} 
            label={{ value: 'Giá (tỷ VND)', angle: -90, position: 'insideLeft' }} 
          />
          <Tooltip
            formatter={this.formatPriceToBillion} 
          />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#E03C31" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}