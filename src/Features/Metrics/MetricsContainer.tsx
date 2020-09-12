import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Paper } from '@material-ui/core';
import { useQuery } from 'urql';

import { IState } from '../../store';
import { actions } from './reducer';

import MultiSelect from '../../components/MultiSelect';

const query = `
query {
  getMetrics
}
`;

const useStyles = makeStyles({
  metricsContainer: {
    width: '80%',
    margin: '5% auto',
    padding: '2em',
    height: '70%',
  },
});

const getMetrics = (state: IState): string[] => {
  return state.metrics;
};

const MetricsContainer: React.FC = ({ children }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const metrics = useSelector(getMetrics);

  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);

  const [result] = useQuery({
    query,
  });

  const { data, error } = result;

  const handleMetricsChange = useCallback((values: string[]) => {
    setSelectedMetrics(values);
  }, []);

  useEffect(() => {
    if (error) {
      dispatch(actions.metricsApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getMetrics } = data;
    dispatch(actions.metricsDataReceived(getMetrics));
  }, [dispatch, data, error]);

  return (
    <Paper className={classes.metricsContainer}>
      <MultiSelect label="Choose Metric(s)" options={metrics} handleChange={handleMetricsChange} />
    </Paper>
  );
};

export default MetricsContainer;
