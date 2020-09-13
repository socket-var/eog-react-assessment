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
  isLive: boolean;
  dataByMetric: {
    [metric: string]: MetricRecord[];
  };
  lastValueByMetric: {
    [metric: string]: { value: number; at: number };
  };
};

const initialState: MeasurementsState = { isLive: false, dataByMetric: {}, lastValueByMetric: {} };

const slice = createSlice({
  name: 'measurements',
  initialState,
  reducers: {
    measurementsDataReceived: (state, action: PayloadAction<MeasurementResponse[]>) => {
      for (let row of action.payload) {
        const { metric, measurements } = row;
        state.dataByMetric[metric] = (state.dataByMetric[metric] || []).concat(measurements);
        const { at, value } = measurements[measurements.length - 1];
        state.lastValueByMetric[metric] = { at, value };
      }
    },
    newMeasurementReceived: (state, action: PayloadAction<MetricRecord>) => {
      const { metric, at, value } = action.payload;
      if (!state.dataByMetric[metric]) {
        state.dataByMetric[metric] = [];
      }
      state.dataByMetric[metric].push(action.payload);
      state.lastValueByMetric[metric] = { at, value };
    },
    toggleLiveStatus: state => {
      state.isLive = !state.isLive;
      state.dataByMetric = {};
    },
    measurementsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
