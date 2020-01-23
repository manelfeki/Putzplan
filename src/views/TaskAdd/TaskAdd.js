import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { TaskAddForm, TasksToolbar } from './components';
import store from '../../store';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

function getResidentByName(name) {
  let headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');
  return fetch(`http://localhost:8080/api/residents/${name}`, {
    method: 'GET',
    headers
  }).then(response => response.json());
}

const TaskAdd = () => {
  const addTaskEvent = values => {
    console.log(values);
    getResidentByName(store.getState().rootReducer.assignedResidentName).then(data => {
      // need to stringify the data before sending it
      console.log(data);
      let body = JSON.stringify({
        description: values.description,
        assignedResident: data._id,
        startDate: values.dateStart,
        endDate: values.dateEnd,
        isRepeating: values.repetitive,
        occurence: parseInt(values.occurence) ? parseInt(values.occurence) : 0,
        taskStatus: ''
      });
      // allow json
      let headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json');
      // promise
      fetch('http://localhost:8080/api/tasks', {
        method: 'POST',
        body,
        headers
      }).then(async res => {
        if (res.status == 200) {
          console.log(await res.json());
          // here should be the code to show the resident ont the list.
        } else {
          throw new Error(await res.json());
        }
      }).catch(err => console.log(err));
    });
    window.location.href='/tasks'
  };
  const classes = useStyles();
  return (<div className={classes.root}>
    <TasksToolbar />
    <div style={{ padding: 15 }}>
      <TaskAddForm onSubmit={addTaskEvent} />
    </div>
  </div>);
};

export default TaskAdd;

