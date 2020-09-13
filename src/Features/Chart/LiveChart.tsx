import React from 'react';
import useLiveData from '../../hooks/useLiveData';
import { MetricsChart } from './MetricsChart';

interface ComponentProps {
  selectedMetrics: string[];
}

const LiveChart = ({ selectedMetrics }: ComponentProps) => {
  const { measurements, units } = useLiveData();

  return (
    <>
      <MetricsChart selectedMetrics={selectedMetrics} measurements={measurements} units={units} />
    </>
  );
};

export default LiveChart;
