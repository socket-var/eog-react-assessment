import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'urql';
import { actions, MetricRecord } from '../Features/Chart/reducer';
import { IState } from '../store';

type ChartData = {
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

const query = `
  query ($input: [MeasurementQuery]) {
    getMultipleMeasurements(input: $input) {
      metric
      measurements {
        at
        value
        metric
        unit
      }
    }
  }
`;

/**
 * fetches the data for the selected metrics over the past 30 minutes
 */
export const useSelectedMetrics = (selectedMetrics: string[]) => {
  const dispatch = useDispatch();
  const measurements = useSelector(getMeasurements);

  const input = useMemo(
    () =>
      selectedMetrics.map(metricName => ({
        metricName,
        after: Date.now() - 30 * 60 * 1000,
      })),
    [selectedMetrics],
  );

  const [{ data, error }] = useQuery({
    query,
    variables: {
      input,
    },
    pause: selectedMetrics.length === 0,
  });

  useEffect(() => {
    if (error) {
      dispatch(actions.measurementsApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getMultipleMeasurements } = data;
    dispatch(actions.measurementsDataReceived(getMultipleMeasurements));
  }, [dispatch, data, error]);

  return measurements;
};

export default useSelectedMetrics;
