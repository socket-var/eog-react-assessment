import React from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core';
import { TooltipProps, TooltipPayload } from 'recharts';

const useStyles = makeStyles({
  tooltip: {
    backgroundColor: '#fff',
    borderRadius: '5px',
    padding: '10px',
    boxShadow: '0 0 2px 0 rgba(0,0,0,0.5)',
  },
});

const CustomTooltip = ({ payload, label }: TooltipProps) => {
  const classes = useStyles();
  return (
    <div className={classes.tooltip}>
      <p>{moment(label as number).format('MMM DD YYYY HH:mm:ss A')}</p>
      {payload &&
        payload.map((item: TooltipPayload) => (
          <p key={item.name} style={{ color: item.color }}>
            {`${item.name}: ${item.value}`}
          </p>
        ))}
    </div>
  );
};

export default CustomTooltip;
