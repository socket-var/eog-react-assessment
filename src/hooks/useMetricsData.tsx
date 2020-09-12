import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'urql';
import { actions } from '../Features/Metrics/reducer';
import { IState } from '../store';

const query = `
query {
  getMetrics
}
`;

const getMetrics = (state: IState): string[] => {
  return state.metrics;
};

/**
 * fetches all the available metric names from the API
 */
const useMetricsData = () => {
  const dispatch = useDispatch();
  const metrics = useSelector(getMetrics);

  const [{ fetching, data, error }] = useQuery({
    query,
  });

  useEffect(() => {
    if (error) {
      dispatch(actions.metricsApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getMetrics } = data;
    dispatch(actions.metricsDataReceived(getMetrics));
  }, [dispatch, data, error]);

  return metrics;
};

export default useMetricsData;
