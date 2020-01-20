import {takeLatest, put} from 'redux-saga/effects'
import {
  REQUEST_GET_RESIDENTS
} from './actions'

function* fetchResidents() {
  console.log('Hello Sagas!');
  // allow json
  let headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');

  const json = yield fetch('http://localhost:8080/api/residents', {
    method: 'GET',
    headers})
    .then(response => response.json(), );
  console.log('this is the json');
  console.log(json);
  yield put({ type: "RESIDENTS_RECEIVED", json: json, });
}

export  function* saga() {
  console.log('Hello Sagas!');
  yield takeLatest(REQUEST_GET_RESIDENTS, fetchResidents);
}
