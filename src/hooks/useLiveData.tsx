import { useDispatch, useSelector } from 'react-redux';
import { useSubscription } from 'urql';
import { actions, MetricRecord } from '../Features/Chart/reducer';
import { getMeasurements, getUnits } from './useHistoricalData';

export type ChartData = {
  at: number;
  [metric: string]: number;
};

export type ChartDataByTimestamp = {
  [at: number]: ChartData;
};

const subscription = `
  subscription {
  newMeasurement {
    metric
    at
    value
    unit
  }
}
`;

/**
 * fetches live data using graphql subscriptions
 */
export const useLiveData = () => {
  const dispatch = useDispatch();
  const measurements = useSelector(getMeasurements);
  const units = useSelector(getUnits);

  const handleNewMeasurement = (_: unknown, { newMeasurement }: { newMeasurement: MetricRecord }) => {
    dispatch(actions.newMeasurementReceived(newMeasurement));
  };

  useSubscription({ query: subscription }, handleNewMeasurement);

  return { measurements, units };
};

export default useLiveData;
