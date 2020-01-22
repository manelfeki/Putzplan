import {takeLatest, put} from 'redux-saga/effects'
import {
  REQUEST_GET_RESIDENTS, REQUEST_SET_ASSIGNED_RESIDENT, REQUEST_SET_OCCURENCE
} from './actions';

function* fetchResidents() {
  // allow json
  let headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');
  const json = yield fetch('http://localhost:8080/api/residents', {
    method: 'GET',
    headers})
    .then(response => response.json(), );
  yield put({ type: "RESIDENTS_RECEIVED", json: json, });
}

function* setAssignedResident({payload}) {
  yield put({ type: "SET_RESIDENT", residentName: payload, });
}

function* setOccurenceTask({payload}) {
  yield put({ type: "SET_OCCURENCE_TASK", occurence: payload, });
}

export  function* saga() {
  yield takeLatest(REQUEST_GET_RESIDENTS, fetchResidents);
  yield takeLatest(REQUEST_SET_ASSIGNED_RESIDENT, setAssignedResident);
  yield takeLatest(REQUEST_SET_OCCURENCE, setOccurenceTask);
}
