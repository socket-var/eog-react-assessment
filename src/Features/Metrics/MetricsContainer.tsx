import React, { useState, useCallback } from 'react';
import { makeStyles, Paper } from '@material-ui/core';

import MultiSelect from '../../components/MultiSelect';
import useMetricsData from '../../hooks/useMetricsData';
import ChartContainer from './Chart/ChartContainer';

const useStyles = makeStyles({
  metricsContainer: {
    width: '80%',
    margin: '5% auto',
    padding: '2em',
    height: '90%',
  },
});

const MetricsContainer: React.FC = ({ children }) => {
  const classes = useStyles();

  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);

  const metrics = useMetricsData();

  const handleMetricsChange = useCallback((values: string[]) => {
    setSelectedMetrics(values);
  }, []);

  return (
    <Paper className={classes.metricsContainer}>
      <MultiSelect label="Choose Metric(s)" options={metrics} handleChange={handleMetricsChange} />
      <ChartContainer selectedMetrics={selectedMetrics} />
    </Paper>
  );
};

export default MetricsContainer;
