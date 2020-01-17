import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import validate from './validate';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { Button, colors, FormControl } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';

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


const UserAddForm = props => {
  const classes = useStyles();
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <Card className={classes.card}>
      <CardHeader
        title="Add a new resident"
      />
      <CardContent>
        <form className={classes.root} onSubmit={handleSubmit}>
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
            <ThemeProvider theme={theme}>
              <Field
                className={classes.margin}
                name="phoneNumber"
                component={renderTextField}
                label="Phone Number"
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

export default reduxForm({
  form: 'UserAddForm', // a unique identifier for this form
  validate
})(UserAddForm);


