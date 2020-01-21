
// residents
export const SET_RESIDENTS = 'SET_RESIDENTS';
export const setResidents = residents => ({type: SET_RESIDENTS, payload: residents});

export const REQUEST_GET_RESIDENTS = 'REQUEST_GET_RESIDENTS';
export const getResidents = ()  => ({ type: "REQUEST_GET_RESIDENTS" });


// tasks
export const SET_TASKS = 'SET_TASKS';
export const setTasks = tasks => ({type: SET_TASKS, payload: tasks});

export const REQUEST_GET_TASKS = 'REQUEST_GET_TASKS';
export const getTasks = ()  => ({ type: "REQUEST_GET_TASKS" });

