import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'urql';
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
 *
 * keeping this simple here given the amount of time I spent on this
 * I'm re-fetching everytime options changes but if this was production we can maintain a fetchedMetrics
 * lookup in redux and make sure that we are only fetching the metric that hasn't been fetched and so on
 *
 */
export const useHistoricalData = (selectedMetrics: string[]) => {
  const dispatch = useDispatch();
  const measurements = useSelector(getMeasurements);

  const intervalId = useRef<number | undefined>(undefined);
  const [after, setAfter] = useState(Date.now() - 30 * 60 * 1000);

  const input = useMemo(
    () =>
      selectedMetrics.map(metricName => ({
        metricName,
        after,
      })),
    [selectedMetrics, after],
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

  useEffect(() => {
    intervalId.current = window.setInterval(() => {
      setAfter(Date.now() - 30 * 60 * 1000);
    }, 60 * 1000);

    return () => {
      window.clearInterval(intervalId.current);
    };
  }, []);

  return measurements;
};

export default useHistoricalData;
