import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { TaskAddForm, TasksToolbar } from './components';
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const TaskAdd = () => {
//example of function to add a resident (linked to the "add resident" button)
  const addTaskEvent = values => {
    console.log(values);
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

