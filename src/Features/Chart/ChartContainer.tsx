import React from 'react';
import { FormControl, FormControlLabel, Switch } from '@material-ui/core';
import HistoricalChart from './HistoricalChart';
import LiveChart from './LiveChart';

interface ComponentProps {
  selectedMetrics: string[];
}

const ChartContainer: React.FC<ComponentProps> = ({ selectedMetrics }) => {
  const [isLive, setIsLive] = React.useState<boolean>(false);
  const handleChartTypeChange = () => {
    setIsLive(isLive => !isLive);
  };

  return (
    <>
      {isLive ? <LiveChart selectedMetrics={selectedMetrics} /> : <HistoricalChart selectedMetrics={selectedMetrics} />}
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
    </>
  );
};

export default ChartContainer;
