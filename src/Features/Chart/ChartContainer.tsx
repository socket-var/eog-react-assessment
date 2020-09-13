import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import CustomTooltip from './CustomTooltip';
import CustomTick from './CustomTick';
import useChartData from '../../hooks/useChartData';

interface ComponentProps {
  selectedMetrics: string[];
}

const COLOR_MAP: { [key: string]: string } = {
  flareTemp: '#23C9FF',
  waterTemp: '#C884A6',
  casingPressure: '#DE6E4B',
  oilTemp: '#7A6563',
  tubingPressure: '#BBB193',
  injValveOpen: '#140152',
};

const ChartContainer: React.FC<ComponentProps> = ({ selectedMetrics }) => {
  const measurements = useChartData(selectedMetrics);

  return measurements.length > 0 ? (
    <LineChart width={900} height={500} data={measurements} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <XAxis dataKey="at" tick={CustomTick} />
      <YAxis />
      <CartesianGrid strokeDasharray="2 2" />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      {selectedMetrics.map((metric, idx) => (
        <Line type="monotone" dataKey={metric} key={idx} stroke={COLOR_MAP[metric]} activeDot={{ r: 7 }} dot={false} />
      ))}
    </LineChart>
  ) : null;
};

export default ChartContainer;
