import { makeStyles, Select } from '@material-ui/core';
import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
    width: 200
  },
}));

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>
  }
};
const RenderSelectField = props => {
  const classes = useStyles();
  const { input, label, meta: { touched, error }, children, options , ...custom } = props;
  const [choosedResident, setChoosedResident] = React.useState(input.value);
  const occurences=input.value;

  const handleChange = event => {
    setChoosedResident(event.target.value);
  };
  return (
    <FormControl error={touched && error}>
      <TextField
        select
        label={label}
        helperText={touched && error}
        className={classes.root}
        {...input}
        onBlur={handleChange}
        onChange={handleChange}
        value={choosedResident}
        {...custom}
      >
        <MenuItem value="" disabled={true} selected={true} >Choose a resident</MenuItem>

        {occurences.map(option => (
          <MenuItem key={option.label} value={option.value}>
            {option.value}
          </MenuItem>
        ))}
      </TextField>
      {renderFromHelper({ touched, error })}
    </FormControl>
  );
};

export default RenderSelectField
