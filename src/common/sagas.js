import { put, takeLatest } from 'redux-saga/effects';
import {
  DELETE_RESIDENT,
  DELETE_TASK,
  MARK_TASK_DONE,
  REQUEST_GET_RESIDENTS,
  REQUEST_GET_TASK_DATA,
  REQUEST_GET_TASKS,
  REQUEST_SET_ASSIGNED_RESIDENT,
  REQUEST_SET_OCCURENCE
} from './actions';
import { push } from 'connected-react-router';

function* fetchResidents() {
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
  let headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');

  const tasks = yield fetch('http://localhost:8080/api/tasks', {
    method: 'GET',
    headers})
    .then(response => response.json() );
    const residents = yield fetch('http://localhost:8080/api/residents', {
    method: 'GET',
    headers})
    .then(response => response.json() );
    const mergedTasks = tasks.map(task => {
      const id = task.assignedResident;
      const resident = residents.find(resident => id === resident._id);
      const formattedTask={};
      formattedTask.resident = resident;
      formattedTask.title=task.description;
      const date = task.endDate.split('T');
      formattedTask.before = date[0];
      formattedTask.isDone=task.taskStatus;
      formattedTask.id=task._id;
      formattedTask.occurence=task.occurence;
      return formattedTask;
    });
    console.log(mergedTasks);
  yield put({ type: "TASKS_RECEIVED", json: mergedTasks, });
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

function* deleteTask({ payload }) {
  yield fetch(`http://localhost:8080/api/tasks/${payload}`,
    {
      method: 'DELETE'
    });
  yield put({ type: "TASK_DELETED", id: payload });
}

function* markTaskDone({ payload }) {
  // allow json
  let headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');
  let body = JSON.stringify({
    id: payload,
    taskStatus: 'Done'
  });
  console.log('here in saga', payload);
  const json = yield fetch(`http://localhost:8080/api/tasks/done/${payload}`, {
    method: 'PUT',
    body,
    headers})
    .then(response => response.json(), );
  yield put({ type: "REQUEST_GET_TASKS", json: json, });
}

export function* saga() {
  yield takeLatest(REQUEST_GET_RESIDENTS, fetchResidents);
  yield takeLatest(REQUEST_GET_TASKS, fetchTasks);
  yield takeLatest(REQUEST_SET_ASSIGNED_RESIDENT, setAssignedResident);
  yield takeLatest(REQUEST_SET_OCCURENCE, setOccurenceTask);
  yield takeLatest(REQUEST_GET_TASK_DATA, getTaskData);
  yield takeLatest(DELETE_RESIDENT, deleteResident);
  yield takeLatest(DELETE_TASK, deleteTask);
  yield takeLatest(MARK_TASK_DONE, markTaskDone);
}
