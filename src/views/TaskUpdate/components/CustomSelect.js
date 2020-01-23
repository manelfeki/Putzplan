import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const occurences = [
  {
    value: '1',
    label: 'Every week',
  },
  {
    value: '2',
    label: 'Every 2 weeks',
  },
  {
    value: '3',
    label: 'Every 3 weeks',
  },
  {
    value: '4',
    label: 'Every 4 weeks',
  },
];


const useStyles = makeStyles(theme => ({
  root: {
      margin: theme.spacing(1),
      width: 200
  },
}));

 const CustomSelect = props => {
   const classes = useStyles();
  const { input, label, meta: { touched, error }, children, disabled, options, ...custom } = props;
  //useState is a hook
  const [occurence, setOccurence] = React.useState('Every week');
  const handleChange = event => {
    setOccurence(event.target.value);
  };
  return (
    <TextField
      id="filled-select-currency"
      select
      className={classes.root}
      label="Task repeats"
      disabled={disabled}
      value={occurence}
      onChange={handleChange}
      onBlur={input.onBlur}
    >
      {occurences.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};
export default CustomSelect
