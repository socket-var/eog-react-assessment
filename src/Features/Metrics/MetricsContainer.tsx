import React, { useState } from 'react';
import { makeStyles, Paper, FormControl, FormControlLabel, Switch } from '@material-ui/core';

import MultiSelect from '../../components/MultiSelect';
import useMetricsData from '../../hooks/useMetricsData';
import { LastUpdateCardContainer } from '../LastUpdateCards/LastUpdateCardContainer';
import LiveChart from '../Chart/LiveChart';
import HistoricalChart from '../Chart/HistoricalChart';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../Chart/reducer';
import { IState } from '../../store';

const useStyles = makeStyles({
  metricsContainer: {
    width: '80%',
    margin: '5% auto',
    padding: 30,
    height: '95%',
  },
});

const getLiveStatus = (state: IState) => {
  return state.measurements.isLive;
};

const MetricsContainer: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const isLive = useSelector(getLiveStatus);

  const metrics = useMetricsData();

  const handleMetricsChange = (values: string[]) => {
    setSelectedMetrics(values);
  };

  const handleChartTypeChange = () => {
    dispatch(actions.toggleLiveStatus());
  };

  return (
    <Paper className={classes.metricsContainer}>
      <MultiSelect label="Choose Metric(s)" options={metrics} handleChange={handleMetricsChange} />
      <FormControl>
        <FormControlLabel
          value="start"
          control={
            <Switch
              checked={isLive}
              onChange={handleChartTypeChange}
              color="primary"
              name="chartType"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          }
          label="Live"
          labelPlacement="start"
        />
      </FormControl>
      <LastUpdateCardContainer selectedMetrics={selectedMetrics} />
      {selectedMetrics.length > 0 ? (
        isLive ? (
          <LiveChart selectedMetrics={selectedMetrics} />
        ) : (
          <HistoricalChart selectedMetrics={selectedMetrics} />
        )
      ) : null}
    </Paper>
  );
};

export default MetricsContainer;
