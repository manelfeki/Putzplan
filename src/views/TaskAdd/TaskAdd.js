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

const TaskAdd = () => {
  const addTaskEvent = values => {
    console.log(values);
    console.log(store.getState());
    // allow json
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    // need to stringify the data before sending it
    let body = JSON.stringify({
      description: values.description,
      assignedResident: store.getState().rootReducer.assignedResidentName,
      startDate: new Date(values.dateStart),
      endDate: new Date(values.dateEnd),
      isRepeating: values.repetitive,
      index: values.occurence
    });
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
  };
  const classes = useStyles();
  return (<div className={classes.root}>
    <TasksToolbar/>
    <div style={{ padding: 15 }}>
      <TaskAddForm onSubmit={addTaskEvent}/>
    </div>
  </div>);
};

export default TaskAdd;

