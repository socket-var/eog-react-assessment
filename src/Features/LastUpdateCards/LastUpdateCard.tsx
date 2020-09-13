import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, makeStyles, Typography } from '@material-ui/core';
import { IState } from '../../store';
import moment from 'moment';

interface ComponentProps {
  metricName: string;
}

const useStyles = makeStyles({
  card: {
    width: 400,
    padding: 10,
    display: 'inline-block',
  },
});

const getMeasurements = (state: IState, metricName: string) => {
  return state.measurements.lastValueByMetric[metricName];
};

export const LastUpdateCard = ({ metricName }: ComponentProps) => {
  const classes = useStyles();

  const selectedMeasurement = useSelector((state: IState) => getMeasurements(state, metricName));

  return selectedMeasurement ? (
    <Card className={classes.card}>
      <CardHeader title={metricName} />
      <CardContent>
        <Typography variant="h3" component="span">
          {selectedMeasurement.value} {selectedMeasurement.unit}
        </Typography>
        <Typography variant="body2" component="p">
          At: {moment(Number(selectedMeasurement.at)).format('hh:mm:ss A')}
        </Typography>
      </CardContent>
    </Card>
  ) : null;
};
