import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { getResidents } from '../../common/actions';
import { Field, reduxForm } from 'redux-form';
import validate from '../TaskAdd/components/TaskAddForm/validate';
import { connect } from 'react-redux';

import { UsersToolbar, UsersTable } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const mapStateToProps = (state, ownProps) => {
  let initial = [];
  if (state.rootReducer.residents) {
    initial = state.rootReducer.residents.map(
      resident => {
        return {
          id: resident._id,
          name: resident.name,
          phone: resident.phoneNumber,
        };
      }
    )
  }
  ownProps.options=initial;
  return {
   initialValues:{
     description:'hi',
     assignedResident:initial
   }
  };
};
const mapDispatchToProps = dispatch =>{
  dispatch(getResidents())
};



const UserList = props => {
  const classes = useStyles();

  const users = props.options;
  return (
    <div className={classes.root}>
      <UsersToolbar />
      <div className={classes.content}>
        <UsersTable users={users} />
      </div>
    </div>
  );
};

const ReduxUserList = reduxForm({
  form: 'UserList', // a unique identifier for this form
  validate,
  enableReinitialize: true
})(UserList);

export default connect(mapStateToProps,mapDispatchToProps)(ReduxUserList);
