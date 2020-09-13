import React from 'react';
import { Typography } from '@material-ui/core';

import useHistoricalData from '../../hooks/useHistoricalData';
import { MetricsChart } from './MetricsChart';

interface ComponentProps {
  selectedMetrics: string[];
}

const HistoricalChart = ({ selectedMetrics }: ComponentProps) => {
  const { measurements, units } = useHistoricalData(selectedMetrics);

  return (
    <>
      <Typography variant="subtitle1" style={{ margin: 10 }}>
        * Chart updates every minute
      </Typography>
      <MetricsChart selectedMetrics={selectedMetrics} measurements={measurements} units={units} />
    </>
  );
};

export default HistoricalChart;
