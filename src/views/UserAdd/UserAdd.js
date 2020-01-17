import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { UserAddForm, UsersToolbar } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserAdd = () => {
  const submit = values => {
    // print the form values to the console
    console.log(values);
  };
  const classes = useStyles();
  return (<div className={classes.root}>
    <UsersToolbar/>
    <div style={{ padding: 15 }}>
      <UserAddForm onSubmit={submit}/>
    </div>
  </div>);
};

export default UserAdd;

