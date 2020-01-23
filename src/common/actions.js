
// residents
export const SET_RESIDENTS = 'SET_RESIDENTS';
export const setResidents = residents => ({ type: SET_RESIDENTS, payload: residents });

export const REQUEST_GET_RESIDENTS = 'REQUEST_GET_RESIDENTS';
export const getResidents = () => ({ type: "REQUEST_GET_RESIDENTS" });

export const REQUEST_SET_ASSIGNED_RESIDENT = 'REQUEST_SET_ASSIGNED_RESIDENT';
export const setAssignedResident = resident => ({ type: "REQUEST_SET_ASSIGNED_RESIDENT", payload: resident });

export const REQUEST_SET_OCCURENCE = 'REQUEST_SET_OCCURENCE';
export const setOccurenceTask = occurence => ({ type: "REQUEST_SET_OCCURENCE", payload: occurence });

export const DELETE_RESIDENT = 'DELETE_RESIDENT';
export const deleteResident = _id => ({ type: "DELETE_RESIDENT", payload: _id });

// tasks
export const SET_TASKS = 'SET_TASKS';
export const setTasks = tasks => ({ type: SET_TASKS, payload: tasks });

export const MARK_TASK_DONE = 'MARK_TASK_DONE';
export const markTaskDone = task => ({ type: MARK_TASK_DONE, payload: task });

export const REQUEST_GET_TASKS = 'REQUEST_GET_TASKS';
export const getTasks = () => ({ type: "REQUEST_GET_TASKS" });

export const REQUEST_GET_TASK_DATA = 'REQUEST_GET_TASK_DATA';
export const getTaskData = TASK => ({ type: "REQUEST_GET_TASK_DATA", payload: TASK });

export const DELETE_TASK = 'DELETE_TASK';
export const deleteTask = _id => ({ type: "DELETE_TASK", payload: _id });
