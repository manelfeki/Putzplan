import React from 'react';
import { Field, formValueSelector, reduxForm } from 'redux-form';
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
import { setAssignedResident, setOccurenceTask } from '../../../../common/actions';
import { options } from '../../../Dashboard/components/LatestSales/chart';
import RenderSelectField from '../RenderSelectField';
import DatePicker, { formatDates, normalizeDates } from '../DatePicker/DatePicker';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import CustomSelect from '../CustomSelect';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '50%',
  },
  margin: {
    margin: theme.spacing(1),
    width: '200%'
  },
  card: {
    width: '50%',
    margin: 'auto',
    padding: '10px'
  },
  rows: {
    display: 'flex'
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


const renderCheckbox = ({ input, label }) => (
  <Switch label={label}
    onChange={input.onChange}
  />
);

const formatResidentForSelect = resident => ({
  label: resident.phoneNumber,
  value: resident.name
});

const selector = formValueSelector('TaskAddForm');

const mapStateToProps = (state, ownProps) => {

  let initial = [];
  console.log(state.rootReducer.residents);
  if (state.rootReducer.residents) {
    state.rootReducer.residents.map(function (item, i) { initial.push(formatResidentForSelect(item)); })
  }
  ownProps.options = initial;
  console.log('mmm', ownProps.options);
  const isChecked = !selector(state, 'repetitive');
  return {
    initialValues: {
      description: '',
      occurence: '',
      assignedResident: initial,
      dateStart: '',
      dateEnd: '',
      repetitive: 'true',
      isChecked: '',
      choosedResident: ''
    }, isChecked
  };
};
const mapDispatchToProps = (dispatch) => ({
  setAssignedResident: (resident) => dispatch(setAssignedResident(resident)),
  setOccurenceTask: (occurence) => dispatch(setOccurenceTask(occurence))
});


const TaskAddForm = props => {
  const classes = useStyles();
  // useState is a hook
  const [occurence, setOccurence] = React.useState('Every week');
  const [choosedResident, setChoosedResident] = React.useState('');
  const { handleSubmit, pristine, reset, submitting, isChecked, setAssignedResident, setOccurenceTask } = props;
  const handle = event => {
    setOccurence(event.target.value);
    setOccurenceTask(event.target.value);
  };
  const handleClickResident = event => {
    setAssignedResident(event.target.value);
  };
  return (
    <Card className={classes.card}>
      <CardHeader
        title="Add a new task"
      />
      <CardContent>
        <form className={classes.root} onSubmit={handleSubmit}>
          <div className={classes.rows}>
            <div>
              <ThemeProvider theme={theme}>
                <Field
                  className={classes.margin}
                  name='dateStart'
                  component={DatePicker}
                  placeholder="Start Date"
                  parse={normalizeDates}
                  format={formatDates}
                />
              </ThemeProvider>
            </div>
            <div>
              <ThemeProvider theme={theme}>
                <Field
                  className={classes.margin}
                  name='dateEnd'
                  component={DatePicker}
                  placeholder="End Date"
                  parse={normalizeDates}
                  format={formatDates}
                />
              </ThemeProvider>
            </div>
          </div>
          <div>
            <FormControlLabel
              control={
                <Field name="repetitive" component={renderCheckbox} color="primary" defaultChecked
                />
              }
              label='Repetitive Task'
            />
            <div>
              <Field
                name="occurence"
                className={classes.margin}
                label="Task repeats"
                value={occurence}
                disabled={isChecked}
                onChange={handle}
                options={options}
                onBlur={setAssignedResident}
                component={CustomSelect}
                disabled={isChecked}
              >
              </Field>

            </div>
          </div>
          <div>
            <ThemeProvider theme={theme}>
              <Field
                label="Resident"
                name="assignedResident"
                component={RenderSelectField}
                options={options}
                className={classes.margin}
                onClick={handleClickResident}
                value={choosedResident}
                disabled={!isChecked}
              >

              </Field>
            </ThemeProvider>
          </div>
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
            <CardActions disableSpacing>
              <ThemeProvider theme={theme}>
                <Button variant="contained" color="secondary" className={classes.margin}
                  disabled={pristine || submitting}
                  type="submit"
                >
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


export default connect(mapStateToProps, mapDispatchToProps)(ReduxTaskAddForm);


