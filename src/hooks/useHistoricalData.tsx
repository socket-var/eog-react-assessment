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

/** takes the data indexed by metric name and flattens the data
 * into an an array of {at: number, [metricName: string]: string}
 * so that this can be consumed by the live chart
 */
export const getMeasurements = (state: IState): ChartData[] => {
  const measurements = Object.values(state.measurements.dataByMetric);
  let flattenedMeasurements: MetricRecord[] = [];
  measurements.forEach(({ data }) => {
    flattenedMeasurements = flattenedMeasurements.concat(data);
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

export const getUnits = (state: IState) => {
  return Object.fromEntries(
    Object.entries(state.measurements.dataByMetric).map(([key, { unit }]) => {
      return [key, unit];
    }),
  );
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
  const units = useSelector(getUnits);

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
      dispatch(actions.measurementsQueryErrorReceived({ error: error.message }));
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

  return { measurements, units };
};

export default useHistoricalData;
