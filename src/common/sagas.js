import { takeLatest, put } from 'redux-saga/effects'
import {
  REQUEST_GET_RESIDENTS,
  REQUEST_SET_ASSIGNED_RESIDENT,
  REQUEST_SET_OCCURENCE,
  REQUEST_GET_TASKS,
  DELETE_RESIDENT,
  REQUEST_GET_TASK_DATA
} from './actions';
import { push } from 'connected-react-router';

function* fetchResidents() {
  // allow json
  let headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');
  const json = yield fetch('http://localhost:8080/api/residents', {
    method: 'GET',
    headers
  })
    .then(response => response.json());
  yield put({ type: "RESIDENTS_RECEIVED", json: json, });
}

function* fetchTasks() {
  // allow json
  let headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');

  const json = yield fetch('http://localhost:8080/api/tasks', {
    method: 'GET',
    headers})
    .then(response => response.json(), );
  yield put({ type: "TASKS_RECEIVED", json: json, });
}

function* getTaskData({ payload }) {
  // allow json
  let headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');

  const json = yield fetch(`http://localhost:8080/api/tasks/${payload}`, {
    method: 'GET',
    headers})
    .then(response => response.json(), );
  console.log('yes',json);
  yield put({ type: "TASK_DATA_RECEIVED", json: json, });
  yield put(push('/users'))
  //window.location.href='/tasks/update/'+payload;
}

function* setAssignedResident({ payload }) {
  yield put({ type: "SET_RESIDENT", residentName: payload, });
}

function* setOccurenceTask({ payload }) {
  yield put({ type: "SET_OCCURENCE_TASK", occurence: payload, });
}

function* deleteResident({ payload }) {
  yield fetch(`http://localhost:8080/api/residents/${payload}`,
    {
      method: 'DELETE'
    });
  yield put({ type: "RESIDENT_DELETED", id: payload });
}

export function* saga() {
  yield takeLatest(REQUEST_GET_RESIDENTS, fetchResidents);
  yield takeLatest(REQUEST_GET_TASKS, fetchTasks);
  yield takeLatest(REQUEST_SET_ASSIGNED_RESIDENT, setAssignedResident);
  yield takeLatest(REQUEST_SET_OCCURENCE, setOccurenceTask);
  yield takeLatest(REQUEST_GET_TASK_DATA, getTaskData);
  yield takeLatest(DELETE_RESIDENT, deleteResident);
}
