import { useDispatch, useSelector } from 'react-redux';
import { useSubscription } from 'urql';
import { actions, MetricRecord } from '../Features/Chart/reducer';
import { IState } from '../store';

export type ChartData = {
  at: number;
  [metric: string]: number;
};

export type ChartDataByTimestamp = {
  [at: number]: ChartData;
};

const getMeasurements = (state: IState): ChartData[] => {
  const measurements = Object.values(state.measurements.dataByMetric);
  let flattenedMeasurements: MetricRecord[] = [];
  measurements.forEach((item: MetricRecord[]) => {
    flattenedMeasurements = flattenedMeasurements.concat(item);
  });

  const dataGroupedByTimestamp: ChartDataByTimestamp = {};
  flattenedMeasurements.forEach(({ at, metric, value }) => {
    if (at in dataGroupedByTimestamp) {
      dataGroupedByTimestamp[at][metric] = value;
    } else {
      dataGroupedByTimestamp[at] = { at, [metric]: value };
    }
  });
  return Object.values(dataGroupedByTimestamp);
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

  const handleNewMeasurement = (_: unknown, { newMeasurement }: { newMeasurement: MetricRecord }) => {
    dispatch(actions.newMeasurementReceived(newMeasurement));
  };

  useSubscription({ query: subscription }, handleNewMeasurement);

  return measurements;
};

export default useLiveData;
