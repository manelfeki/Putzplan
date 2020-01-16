import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

import { SearchInput } from 'components';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const UsersToolbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();


  //example of function to add a resident (linked to the "add resident" button)
  const addResidentEvent = () => {

    // allow json 
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    // need to stringify the data before sending it
    let body = JSON.stringify({
      name: "luke",
      ArrivalDate: Date.now().toString()
    });
    // promise
    fetch('api/residents', {
      method: 'POST',
      body,
      headers
    }).then(async res => {
      if (res.status == 200) {
        console.log(await res.json());
        // here should be the code to show the resident ont the list.
      }
      else {
        throw new Error(await res.json())
      }
    }).catch(err => console.log(err))
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button className={classes.importButton}>Delete resident</Button>
        <Button
          color="primary"
          variant="contained"
          onClick={addResidentEvent}
        >
          Add resident
        </Button>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search resident"
        />
      </div>
    </div>
  );
};

UsersToolbar.propTypes = {
  className: PropTypes.string
};

export default UsersToolbar;
