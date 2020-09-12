import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import useSelectedMetrics from '../../../hooks/useSelectedMetrics';

interface ComponentProps {
  selectedMetrics: string[];
}

const ChartContainer: React.FC<ComponentProps> = ({ selectedMetrics }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const measurements = useSelectedMetrics(selectedMetrics);
  return (
    <LineChart
      width={900}
      height={500}
      data={Object.values(measurements) as any}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis dataKey="at" />
      <YAxis />
      <CartesianGrid strokeDasharray="5 5" />
      <Tooltip />
      <Legend />
      {selectedMetrics.map((metric, idx) => (
        <Line type="monotone" dataKey={metric} key={idx} stroke={COLORS[idx]} activeDot={{ r: 8 }} />
      ))}
    </LineChart>
  );
};

export default ChartContainer;
