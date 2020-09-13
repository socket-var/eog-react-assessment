import React from 'react';
import useLiveData from '../../hooks/useLiveData';
import { MetricsChart } from './MetricsChart';

interface ComponentProps {
  selectedMetrics: string[];
}

const LiveChart = ({ selectedMetrics }: ComponentProps) => {
  const measurements = useLiveData();

  return <MetricsChart selectedMetrics={selectedMetrics} measurements={measurements} />;
};

export default LiveChart;
