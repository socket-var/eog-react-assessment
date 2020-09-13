import { createSlice, PayloadAction } from 'redux-starter-kit';

export interface MetricRecord {
  value: number;
  at: number;
  metric: string;
  unit: string;
}

interface MeasurementResponse {
  metric: string;
  measurements: MetricRecord[];
}

export type ApiErrorAction = {
  error: string;
};

export type MeasurementsState = {
  /** measurements data indexed by metric name
   */
  dataByMetric: {
    [metric: string]: { unit: string; data: MetricRecord[] };
  };
  /**
   * used by the LastUpdatedCards to efficiently get the last updated value
   * corresponding to a metric
   */
  lastValueByMetric: {
    [metric: string]: { value: number; at: number; unit: string };
  };
  /** specifies whether the data is live or historical. WOuld use a union for different retrieval types if this is in production
   * but keeping it simple here
   */
  isLive: boolean;
};

const initialState: MeasurementsState = { isLive: false, dataByMetric: {}, lastValueByMetric: {} };

const slice = createSlice({
  name: 'measurements',
  initialState,
  reducers: {
    measurementsDataReceived: (state, action: PayloadAction<MeasurementResponse[]>) => {
      for (let row of action.payload) {
        const { metric, measurements } = row;
        if (!state.dataByMetric[metric]) {
          state.dataByMetric[metric] = { unit: '', data: [] };
        }
        state.dataByMetric[metric].data = (state.dataByMetric[metric].data || []).concat(measurements);
        const { at, value, unit } = measurements[measurements.length - 1];
        state.dataByMetric[metric].unit = unit;
        state.lastValueByMetric[metric] = { at, value, unit };
      }
    },
    newMeasurementReceived: (state, action: PayloadAction<MetricRecord>) => {
      const { metric, at, value, unit } = action.payload;
      if (!state.dataByMetric[metric]) {
        state.dataByMetric[metric] = { unit, data: [] };
      }
      state.dataByMetric[metric].data.push(action.payload);
      state.dataByMetric[metric].unit = unit;
      state.lastValueByMetric[metric] = { at, value, unit };
    },
    toggleLiveStatus: state => {
      state.isLive = !state.isLive;
      state.dataByMetric = {};
    },
    measurementsQueryErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
    measurementsSubscriptionErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
