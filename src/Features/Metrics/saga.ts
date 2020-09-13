import { takeEvery, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { actions } from './reducer';

function* apiErrorReceived() {
  yield call(toast.error, 'Cannot retrieve metrics, try again later');
}

export default function* watchApiError() {
  yield takeEvery(actions.metricsApiErrorReceived.type, apiErrorReceived);
}
