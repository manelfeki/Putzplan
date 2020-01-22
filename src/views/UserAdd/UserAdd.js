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
  //example of function to add a resident (linked to the "add resident" button)
  const addResidentEvent = values => {
    console.log(values.residentName);
    // allow json
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    // need to stringify the data before sending it
    let body = JSON.stringify({
      name: values.residentName,
      phoneNumber: values.phoneNumber
    });
    // promise
    fetch('http://localhost:8080/api/residents', {
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
    window.location.href='/users'
  };
  const classes = useStyles();
  return (<div className={classes.root}>
    <UsersToolbar />
    <div style={{ padding: 15 }}>
      <UserAddForm onSubmit={addResidentEvent} />
    </div>
  </div>);
};

export default UserAdd;

