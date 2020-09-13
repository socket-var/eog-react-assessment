import React from 'react';
import moment from 'moment';

interface ComponentProps {
  x: number;
  y: number;
  payload: {
    value: string;
  };
}

const CustomTick = ({ x, y, payload }: ComponentProps): React.ReactElement => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="middle">
        {moment(Number(payload.value)).format('hh:mm:ss A')}
      </text>
    </g>
  );
};

export default CustomTick;
