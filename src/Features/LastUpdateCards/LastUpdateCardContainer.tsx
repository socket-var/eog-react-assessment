import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { LastUpdateCard } from './LastUpdateCard';

interface Props {
  selectedMetrics: string[];
}

const useStyles = makeStyles({
  grid: {
    margin: '20px 0',
  },
});

export const LastUpdateCardContainer = ({ selectedMetrics }: Props) => {
  const classes = useStyles();
  return (
    <Grid container spacing={3} className={classes.grid}>
      {selectedMetrics.map(selectedMetric => (
        <Grid item key={selectedMetric}>
          <LastUpdateCard metricName={selectedMetric} />
        </Grid>
      ))}
    </Grid>
  );
};
