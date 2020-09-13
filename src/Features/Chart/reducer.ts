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
  dataByMetric: {
    [metric: string]: MetricRecord[];
  };
};

const initialState: MeasurementsState = { dataByMetric: {} };

const slice = createSlice({
  name: 'measurements',
  initialState,
  reducers: {
    measurementsDataReceived: (state, action: PayloadAction<MeasurementResponse[]>) => {
      for (let row of action.payload) {
        const { metric, measurements } = row;
        state.dataByMetric[metric] = (state.dataByMetric[metric] || []).concat(measurements);
      }
    },
    measurementsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
