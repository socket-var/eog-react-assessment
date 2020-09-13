import React from 'react';
import useChartData from '../../hooks/useHistoricalData';
import { MetricsChart } from './MetricsChart';

interface ComponentProps {
  selectedMetrics: string[];
}

const HistoricalChart = ({ selectedMetrics }: ComponentProps) => {
  const measurements = useChartData(selectedMetrics);

  return <MetricsChart selectedMetrics={selectedMetrics} measurements={measurements} />;
};

export default HistoricalChart;
