import React from 'react';
import useChartData from '../../hooks/useChartData';
import { MetricsChart } from './MetricsChart';

interface ComponentProps {
  selectedMetrics: string[];
}

const LiveChart = ({ selectedMetrics }: ComponentProps) => {
  const measurements = useChartData(selectedMetrics);

  return <MetricsChart selectedMetrics={selectedMetrics} measurements={measurements} />;
};

export default LiveChart;
