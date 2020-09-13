import { createSlice, PayloadAction } from 'redux-starter-kit';

interface MetricRecord {
  value: number;
  at: number;
  metric: string;
}

interface MeasurementResponse {
  metric: string;
  measurements: MetricRecord[];
}

export type ApiErrorAction = {
  error: string;
};

export type MeasurementsState = {
  [at: number]: {
    at: number;
    [metric: string]: number;
  };
};

const initialState: MeasurementsState = {};

const slice = createSlice({
  name: 'measurements',
  initialState,
  reducers: {
    measurementsDataReceived: (state, action: PayloadAction<MeasurementResponse[]>) => {
      for (let row of action.payload) {
        const { metric, measurements } = row;

        for (let { at, value } of measurements) {
          if (at in state) {
            state[at][metric] = value;
          } else {
            state[at] = { at, [metric]: value };
          }
        }
      }
    },
    measurementsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
