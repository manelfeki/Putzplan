import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import validate from '../TaskAdd/components/TaskAddForm/validate';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { getTasks } from '../../common/actions';
import { TasksToolbar, TaskCard } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));


// async function getResidentById(residentId)
// {
//   let headers = new Headers();
//   headers.append('Accept', 'application/json');
//   headers.append('Content-Type', 'application/json');
//   let response = await fetch(`http://localhost:8080/api/residents/${residentId}`, {
//     method: 'GET',
//     headers});
//   let residentName = await response.text();
//   console.log(residentName);
//   return residentName;
// }

const mapStateToProps = (state, ownProps) => {
  let initial = [];
  console.log(state.rootReducer.tasks);
  if (state.rootReducer.tasks) {
    initial = state.rootReducer.tasks.map(
      task => {
        return {
          title: task.description,
          name: task.resident.name,
          updatedAt: task.endDate,
          isDone : task.isDone,
        };
      }
    )
  }
  ownProps.options=initial;
  return {
   initialValues:{
   }
  };
};
const mapDispatchToProps = dispatch =>{
  dispatch(getTasks())
};

const TaskList = props => {
  const classes = useStyles();
  const tasks = props.options;
  console.log(tasks);

  return (
    <div className={classes.root}>
      <TasksToolbar />
      <div className={classes.content}>
        <Grid
          container
          spacing={3}
        >
          {tasks.map(task => (
            <Grid
              item
              key={task.id}
              lg={4}
              md={6}
              xs={12}
            >
              <TaskCard task={task} />
            </Grid>
          ))}
        </Grid>
      </div>
      <div className={classes.pagination}>
        <Typography variant="caption">1-6 of 20</Typography>
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton>
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>
  );
};

const ReduxTaskList = reduxForm({
  form: 'TaskList', // a unique identifier for this form
  validate,
  enableReinitialize: true
})(TaskList);

export default connect(mapStateToProps,mapDispatchToProps)(ReduxTaskList);
