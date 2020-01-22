
// residents
export const SET_RESIDENTS = 'SET_RESIDENTS';
export const setResidents = residents => ({type: SET_RESIDENTS, payload: residents});

export const REQUEST_GET_RESIDENTS = 'REQUEST_GET_RESIDENTS';
export const getResidents = ()  => ({ type: "REQUEST_GET_RESIDENTS" });

export const REQUEST_SET_ASSIGNED_RESIDENT = 'REQUEST_SET_ASSIGNED_RESIDENT';
export const setAssignedResident = resident  => ({ type: "REQUEST_SET_ASSIGNED_RESIDENT", payload: resident });

export const REQUEST_SET_OCCURENCE = 'REQUEST_SET_OCCURENCE';
export const setOccurenceTask = occurence  => ({ type: "REQUEST_SET_OCCURENCE", payload: occurence });

// tasks
export const SET_TASKS = 'SET_TASKS';
export const setTasks = tasks => ({type: SET_TASKS, payload: tasks});

export const REQUEST_GET_TASKS = 'REQUEST_GET_TASKS';
export const getTasks = ()  => ({ type: "REQUEST_GET_TASKS" });

