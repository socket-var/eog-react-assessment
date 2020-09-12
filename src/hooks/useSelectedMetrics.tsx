import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'urql';
import { actions, MeasurementsState } from '../Features/Metrics/Chart/reducer';
import { IState } from '../store';

const getMeasurements = (state: IState): MeasurementsState => {
  return state.measurements;
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

  const [{ fetching, data, error }] = useQuery({
    query,
    variables: {
      input,
    },
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
