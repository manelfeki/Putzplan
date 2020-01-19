import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import validate from './validate';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { Button, colors } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';
import CardActions from '@material-ui/core/CardActions';
import SelectField from '@material-ui/core/Select';
import { getResidents } from '../../../../common/actions';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '50%',
    margin: 'auto',
    padding: '10px'
  },
  margin: {
    margin: theme.spacing(1)
  },
  card: {
    width: '50%',
    margin: 'auto',
    padding: '10px'
  }
}));


const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: colors.blueGrey,
    link: colors.blue['A400']
  }
});

const renderTextField = (
  { input, label, meta: { touched, error }, ...custom }
) => (
  <TextField
    label={label}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);

const renderSelectField = (
  { input, label, meta: { touched, error }, children, options, ...custom }
) => (
  <SelectField
    label={label}
    helperText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    options={options}
    {...custom}
  />
);

const formatResidentForSelect = resident => ({
  label: resident.name,
  value: resident.id
});

/*const mapStateToProps = (state, ownProps) => {
  let initialValues = {};

  if (state.resident) {
    initialValues.assignedResident = formatResidentForSelect(state.resident);
  }

  return {
    initialValues
  };
};*/

const mapDispatchToProps = dispatch =>{
  dispatch(getResidents())
};
/*
const mapStateToProps = state => ({
  state
});
*/

const TaskAddForm = props => {
  const classes = useStyles();
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <Card className={classes.card}>
      <CardHeader
        title="Add a new task"
      />
      <CardContent>
        <form className={classes.root} onSubmit={handleSubmit}>
          <div>
            <ThemeProvider theme={theme}>
              <Field
                className={classes.margin}
                name="description"
                component={renderTextField}
                label="Task Description"
                variant="outlined"
                multiline={true}
                rows={2}
              />
            </ThemeProvider>
          </div>
          <div>
            <ThemeProvider theme={theme}>
              <Field
                name="assignedResident"
                component={renderSelectField}
                label="Resident"
              >
              </Field>
            </ThemeProvider>
          </div>
          <div>
            <ThemeProvider theme={theme}>
              <Field
                className={classes.margin}
                name="residentName"
                component={renderTextField}
                label="Resident Name"
                variant="outlined"
              />
            </ThemeProvider>
          </div>
          <div>
            <CardActions disableSpacing>
              <ThemeProvider theme={theme}>
                <Button variant="contained" color="secondary" className={classes.margin}
                        disabled={pristine || submitting}
                        type="submit">
                  Submit
                </Button>
              </ThemeProvider>
              <ThemeProvider theme={theme}>
                <Button variant="contained" color="link" className={classes.margin} disabled={pristine || submitting}
                        type="button" onClick={reset}>
                  Clear
                </Button>
              </ThemeProvider>
            </CardActions>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

const ReduxTaskAddForm = reduxForm({
  form: 'TaskAddForm', // a unique identifier for this form
  validate,
  enableReinitialize: true
})(TaskAddForm);

export default connect(null,mapDispatchToProps)(ReduxTaskAddForm);


