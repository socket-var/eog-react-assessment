import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import moment from 'moment';
import { makeStyles } from '@material-ui/core';

import useSelectedMetrics from '../../hooks/useSelectedMetrics';
import CustomTooltip from './CustomTooltip';
import CustomTick from './CustomTick';
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
  const measurements = useSelectedMetrics(selectedMetrics);

  const data = useMemo(() => Object.values(measurements), [measurements]);
  return data.length > 0 ? (
    <LineChart width={900} height={500} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <XAxis dataKey="at" tick={CustomTick} />
      <YAxis />
      <CartesianGrid strokeDasharray="2 2" />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      {selectedMetrics.map((metric, idx) => (
        <Line type="monotone" dataKey={metric} key={idx} stroke={COLOR_MAP[metric]} activeDot={{ r: 4 }} dot={false} />
      ))}
    </LineChart>
  ) : null;
};

export default ChartContainer;
