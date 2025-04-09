"use client"

import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

interface PieChartProps {
  data: Array<{
    name: string
    value: number
  }>
  title?: string
}

export function PieChart({ data, title }: PieChartProps) {
  return (
    <div className="w-full h-full">
      {title && <h3 className="text-sm font-medium mb-2 text-center">{title}</h3>}
      <ResponsiveContainer width="100%" height={300}>
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value}`, "Số lượng"]} />
          <Legend />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  )
}

